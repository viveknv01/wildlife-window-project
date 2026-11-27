(() => {
  const canvas = document.getElementById('scene');
  const ctx = canvas.getContext('2d');
  const $ = id => document.getElementById(id);

  const animals = [
    { name: 'Spotted deer', kind: 'deer', sub: 'spotted', rarity: 'Common', weight: 24, scale: 0.96, color: '#b97e48', group: [2, 4] },
    { name: 'Wild boar', kind: 'boar', rarity: 'Common', weight: 20, scale: 0.92, color: '#4d4136', group: [1, 2] },
    { name: 'Indian Gaur', kind: 'gaur', rarity: 'Common', weight: 18, scale: 1.15, color: '#332822', group: [2, 4] },
    { name: 'Sambar deer', kind: 'deer', sub: 'sambar', rarity: 'Uncommon', weight: 11, scale: 1.12, color: '#6e4e37', group: [2, 3] },
    { name: 'Indian peacock', kind: 'peacock', rarity: 'Uncommon', weight: 10, scale: 0.96, color: '#1b6d72' },
    { name: 'Asian Elephant', kind: 'elephant', rarity: 'Rare', weight: 4, scale: 1.32, color: '#6b7068' },
    { name: 'Gaur bull', kind: 'gaur', bull: true, rarity: 'Rare', weight: 2.5, scale: 1.32, color: '#231b17' },
    { name: 'Great Indian hornbill', kind: 'hornbill', sub: 'great', fly: true, rarity: 'Rare', weight: 3, scale: 0.9, color: '#232624' },
    { name: 'Indian grey hornbill', kind: 'hornbill', sub: 'grey', fly: true, rarity: 'Rare', weight: 3.5, scale: 0.78, color: '#7e8078' },
    { name: 'Ibis', kind: 'ibis', fly: true, rarity: 'Rare', weight: 3.5, scale: 0.8, color: '#3b3735' },
    { name: 'Tiger', kind: 'tiger', predator: true, rarity: 'Very rare', weight: 1.1, scale: 1.22, color: '#d97b29' },
    { name: 'Leopard', kind: 'leopard', predator: true, rarity: 'Very rare', weight: 1.1, scale: 1.14, color: '#cfa04e' },
    { name: 'Asian Elephant Tusk', kind: 'elephant', tusks: true, rarity: 'Very rare', weight: 1.0, scale: 1.4, color: '#636860' },
    { name: 'Sloth Bear', kind: 'bear', rarity: 'Very rare', weight: 1.0, scale: 1.02, color: '#272322' },
    { name: 'Black Leopard', kind: 'leopard', black: true, predator: true, rarity: 'Ultra Rare', weight: 0.45, scale: 1.14, color: '#1b1d24' },
    { name: 'Wild Dog', kind: 'wildDog', predator: true, rarity: 'Rare', weight: 3, scale: 0.9, color: '#b5562b', group: [2, 4] },
    // Small wildlife: too small to make out with the naked eye, only drawn through the binoculars (binocularOnly)
    { name: 'Indian hare', kind: 'rabbit', binocularOnly: true, rarity: 'Common', weight: 10, scale: 0.8, color: '#9a7b58', group: [1, 2] },
    { name: 'Jungle babbler', kind: 'smallBird', sub: 'babbler', binocularOnly: true, rarity: 'Common', weight: 9, scale: 0.75, speedMul: 0.9, color: '#8a7d6c', group: [2, 4] },
    { name: 'Indian grey mongoose', kind: 'mongoose', binocularOnly: true, rarity: 'Uncommon', weight: 5, scale: 0.6, speedMul: 1.5, color: '#8b8475' },
    { name: 'Indian pitta', kind: 'smallBird', sub: 'pitta', binocularOnly: true, rarity: 'Rare', weight: 1.5, scale: 0.7, speedMul: 0.9, color: '#4f8a4a' }
  ];
  // Larger animals share the regular spawn table; small wildlife comes and goes on its own quiet schedule
  const mainAnimals = animals.filter(a => !a.binocularOnly);
  const smallAnimals = animals.filter(a => a.binocularOnly);

  const events = [
    {
      name: 'Indian peacock dancing',
      rarity: 'Rare',
      weight: 5,
      hint: 'A shimmering display in the clearing',
      title: 'A courtship dance',
      text: 'An Indian peacock has fanned its iridescent train in the forest clearing.',
      build: (w, h, sc) => {
        const dir = Math.random() < 0.5 ? -1 : 1;
        return [{
          name: 'Indian peacock dancing', kind: 'peacock', perform: 'dance', stay: rand(16, 24), rarity: 'Rare',
          x: rand(w * 0.3, w * 0.7), y: rand(h * 0.68, h * 0.77), dir,
          phase: rand(0, 7), scale: 1.06 * sc, speed: rand(18, 24),
          color: '#1b6d72', isEvent: true
        }];
      }
    },
    {
      name: 'Asian Elephant 10+ count',
      rarity: 'Rare',
      weight: 4,
      hint: 'Deep rumbles across the valley',
      title: 'An elephant herd on the move',
      text: 'A large family herd of Asian elephants is crossing quietly through the trees.',
      build: (w, h, sc) => {
        const count = Math.floor(rand(10, 13));
        const dir = Math.random() < 0.5 ? -1 : 1;
        const baseX = dir > 0 ? rand(w * 0.08, w * 0.28) : rand(w * 0.72, w * 0.92);
        const baseY = rand(h * 0.64, h * 0.75);
        const spd = rand(15, 20);
        const list = [];
        for (let i = 0; i < count; i++) {
          const isCalf = i % 4 === 2;
          list.push({
            name: 'Asian Elephant (Herd)', eventName: 'Asian Elephant 10+ count', kind: 'elephant', rarity: 'Rare',
            x: baseX - dir * (i * rand(32, 46)) + rand(-10, 10),
            y: Math.min(h * 0.81, Math.max(h * 0.6, baseY + rand(-24, 28))),
            dir, phase: rand(0, 7),
            scale: (isCalf ? rand(0.72, 0.86) : rand(1.12, 1.34)) * sc,
            alpha: 0, life: rand(22, 30), age: 0, speed: spd * rand(0.95, 1.05),
            color: i % 2 ? '#6b7068' : '#73786f', isEvent: true
          });
        }
        return list;
      }
    },
    {
      name: 'Asian Elephant with Tusker 10+ count',
      rarity: 'Ultra Rare',
      weight: 1.5,
      hint: 'A grand procession in the jungle',
      title: 'Great herd with tuskers',
      text: 'A matriarchal elephant herd accompanied by mighty tuskers passes your window.',
      build: (w, h, sc) => {
        const count = Math.floor(rand(10, 13));
        const dir = Math.random() < 0.5 ? -1 : 1;
        const baseX = dir > 0 ? rand(w * 0.08, w * 0.28) : rand(w * 0.72, w * 0.92);
        const baseY = rand(h * 0.64, h * 0.75);
        const spd = rand(15, 20);
        const list = [];
        for (let i = 0; i < count; i++) {
          const hasTusks = i === 0 || i === Math.floor(count / 2);
          const isCalf = !hasTusks && i % 4 === 3;
          list.push({
            name: hasTusks ? 'Asian Elephant Tusk (Herd)' : 'Asian Elephant (Herd)',
            eventName: 'Asian Elephant with Tusker 10+ count',
            kind: 'elephant', tusks: hasTusks, rarity: 'Ultra Rare',
            x: baseX - dir * (i * rand(34, 48)) + rand(-10, 10),
            y: Math.min(h * 0.81, Math.max(h * 0.6, baseY + rand(-24, 28))),
            dir, phase: rand(0, 7),
            scale: (hasTusks ? 1.42 : isCalf ? 0.76 : rand(1.14, 1.32)) * sc,
            alpha: 0, life: rand(22, 30), age: 0, speed: spd * rand(0.96, 1.04),
            color: hasTusks ? '#5f645c' : '#6e736b', isEvent: true
          });
        }
        return list;
      }
    },
    {
      name: 'Bear with baby',
      rarity: 'Ultra Rare',
      weight: 1.7,
      hint: 'Snuffling along the forest floor',
      title: 'Sloth bear and cub',
      text: 'A mother sloth bear wanders through the undergrowth with her young cub close behind.',
      build: (w, h, sc) => {
        const dir = Math.random() < 0.5 ? -1 : 1;
        const x = rand(w * 0.24, w * 0.74);
        const y = rand(h * 0.68, h * 0.77);
        const spd = rand(15, 20);
        const life = rand(16, 23);
        return [
          {
            name: 'Sloth Bear with baby', eventName: 'Bear with baby', kind: 'bear', withCub: true, rarity: 'Ultra Rare',
            x, y, dir, phase: rand(0, 7), scale: 1.06 * sc, alpha: 0, life, age: 0, speed: spd,
            color: '#272322', isEvent: true
          },
          {
            name: 'Sloth Bear cub', eventName: 'Bear with baby', kind: 'bear', isCub: true, rarity: 'Ultra Rare',
            x: x - dir * 34, y: y + 7, dir, phase: rand(0, 7), scale: 0.62 * sc, alpha: 0, life, age: 0, speed: spd,
            color: '#2e2928', isEvent: true
          }
        ];
      }
    },
    {
      name: 'Flying lot of Ibis',
      rarity: 'Ultra Rare',
      weight: 1.7,
      hint: 'Wings sweeping across the canopy',
      title: 'A flock of ibis in flight',
      text: 'A graceful flock of ibis glides together across the treetops.',
      build: (w, h, sc) => {
        const count = Math.floor(rand(10, 15));
        const dir = Math.random() < 0.5 ? -1 : 1;
        const baseX = dir > 0 ? rand(w * 0.08, w * 0.25) : rand(w * 0.75, w * 0.92);
        const baseY = rand(h * 0.22, h * 0.42);
        const spd = rand(34, 44);
        const list = [];
        for (let i = 0; i < count; i++) {
          const row = i % 2 === 0 ? 1 : -1;
          const step = Math.ceil(i / 2);
          list.push({
            name: 'Ibis (Flock)', eventName: 'Flying lot of Ibis', kind: 'ibis', fly: true, rarity: 'Ultra Rare',
            x: baseX - dir * (step * rand(24, 34)) + rand(-6, 6),
            y: baseY + row * step * rand(8, 13) + rand(-4, 4),
            dir, phase: i * 0.55, scale: rand(0.68, 0.85) * sc,
            alpha: 0, life: rand(14, 20), age: 0, speed: spd * rand(0.96, 1.04),
            color: '#3b3735', isEvent: true
          });
        }
        return list;
      }
    },
    {
      name: 'Tuskers fighting',
      rarity: 'Legendary',
      weight: 0.75,
      hint: 'Clash of ivory in the clearing!',
      title: 'Tuskers sparring',
      text: 'Two powerful bull elephants lock tusks in a rare test of strength.',
      build: (w, h, sc) => {
        // Meet near the middle so both bulls walk in from opposite sides and arrive together
        const cx = rand(w * 0.47, w * 0.53);
        const cy = rand(h * 0.68, h * 0.76);
        const stay = rand(16, 23);
        const gap = 58 * sc;
        return [
          {
            name: 'Tuskers fighting', eventName: 'Tuskers fighting', kind: 'elephant', tusks: true, perform: 'fight', stay,
            rarity: 'Legendary', x: cx - gap, y: cy, dir: 1, phase: 0,
            scale: 1.36 * sc, speed: 22, color: '#61665e', isEvent: true
          },
          {
            name: 'Tuskers fighting', eventName: 'Tuskers fighting', kind: 'elephant', tusks: true, perform: 'fight', stay,
            rarity: 'Legendary', x: cx + gap, y: cy + 3, dir: -1, phase: Math.PI,
            scale: 1.36 * sc, speed: 22, color: '#585d56', isEvent: true
          }
        ];
      }
    },
    {
      name: 'Leopard + Black Leopard',
      rarity: 'Legendary',
      weight: 0.75,
      hint: 'Golden rosettes and a shadow beside them',
      title: 'Two phantoms of the forest',
      text: 'An Indian leopard and a melanistic black leopard prowl side by side.',
      build: (w, h, sc) => {
        const dir = Math.random() < 0.5 ? -1 : 1;
        const x = rand(w * 0.25, w * 0.72);
        const y = rand(h * 0.68, h * 0.77);
        const spd = rand(14, 19);
        const life = rand(15, 22);
        return [
          {
            name: 'Leopard + Black Leopard', eventName: 'Leopard + Black Leopard', kind: 'leopard', black: false,
            rarity: 'Legendary', x, y, dir, phase: rand(0, 7),
            scale: 1.14 * sc, alpha: 0, life, age: 0, speed: spd, color: '#cfa04e', isEvent: true
          },
          {
            name: 'Leopard + Black Leopard', eventName: 'Leopard + Black Leopard', kind: 'leopard', black: true,
            rarity: 'Legendary', x: x - dir * 56, y: y - 11, dir, phase: rand(0, 7),
            scale: 1.12 * sc, alpha: 0, life, age: 0, speed: spd, color: '#1b1d24', isEvent: true
          }
        ];
      }
    },
    {
      name: 'Wild Dog Pack Hunting',
      rarity: 'Very rare',
      weight: 1,
      hint: 'A sudden rush through the undergrowth',
      title: 'Wild dogs on the hunt',
      text: 'A pack of wild dogs sweeps through the clearing, sending the deer bounding for cover.',
      build: (w, h, sc) => {
        // Deer burst in from one side at a run with the pack close behind; everything is pre-staged off-screen
        const dir = Math.random() < 0.5 ? -1 : 1;
        const startX = dir > 0 ? -110 : w + 110;
        const endX = dir > 0 ? w + 130 : -130;
        const groundY = y => Math.min(h * 0.8, Math.max(h * 0.62, y));
        const baseY = rand(h * 0.67, h * 0.75);
        const deerCount = Math.floor(rand(3, 5.99));
        const dogCount = Math.floor(rand(5, 8.99));
        const run = rand(100, 118) * Math.max(0.6, Math.min(1, sc));
        const list = [];
        for (let i = 0; i < deerCount; i++) {
          list.push({
            name: 'Spotted deer', eventName: 'Wild Dog Pack Hunting', kind: 'deer', sub: 'spotted', rarity: 'Very rare',
            x: startX - dir * i * rand(34, 48), y: groundY(baseY + rand(-20, 20)), dir, phase: rand(0, 7),
            scale: 0.96 * rand(0.84, 1.02) * sc, speed: run, runSpeed: run * rand(0.98, 1.06),
            state: 'flee', tx: endX, ty: groundY(baseY + rand(-26, 26)), fast: true,
            hasAntlers: i === 0, color: '#b97e48', isEvent: true
          });
        }
        const packLead = deerCount * 42 + 90;
        for (let j = 0; j < dogCount; j++) {
          list.push({
            name: 'Wild Dog (Pack)', eventName: 'Wild Dog Pack Hunting', kind: 'wildDog', predator: true, rarity: 'Very rare',
            x: startX - dir * (packLead + j * rand(26, 36)), y: groundY(baseY + rand(-22, 22)), dir, phase: rand(0, 7),
            scale: 0.9 * rand(0.9, 1.05) * sc, speed: run * rand(0.92, 0.99),
            state: 'cross', tx: endX, ty: groundY(baseY + rand(-24, 24)), fast: true,
            color: '#b5562b', isEvent: true
          });
        }
        return list;
      }
    }
  ];

  // Test gallery (not for regular play): ?test=1A animals · ?test=1E events · &i=N start index
  const urlParams = new URLSearchParams(location.search);
  const testParam = (urlParams.get('test') || '').toUpperCase();
  const testMode = testParam === '1A' || testParam === '1E' ? testParam : null;
  let testIndex = Math.max(0, parseInt(urlParams.get('i') || '0', 10) || 0);
  let galleryHoldUntil = 0;

  let w = 900, h = 520, dpr = 1, last = 0, creatures = [], nextSpawn = 2.2, nextSmall = 5, elapsed = 0, toastTimer = 0, wind = 0;
  let activeEvent = null;
  let eventCooldown = 0;
  let pointer = { x: 0, y: 0 };

  // ---- Binoculars: a round magnified lens that follows the mouse or finger ----
  const BINOC_ZOOM = 2.2;       // magnification inside the lens
  const SMALL_CAP = 4;          // most small (binocular-only) animals in the clearing at once
  let binoculars = false;
  let aim = { x: 450, y: 260 }; // point of the scene the lens is centred on (canvas coordinates)
  let lensFind = null;          // small animal currently noticed through the lens

  const rand = (a, b) => a + Math.random() * (b - a);
  const pickWeighted = list => {
    let total = list.reduce((s, item) => s + item.weight, 0);
    let r = Math.random() * total;
    for (const item of list) {
      r -= item.weight;
      if (r <= 0) return item;
    }
    return list[0];
  };

  // ---- Behaviour settings (easy to tune) ----
  const LINGER_CHANCE = 0.65;   // ground animals that stop to graze/sit/drink; the rest simply pass through
  const SOFT_CAP = 36;          // performance guard only; high enough that a 30+ Legendary gathering remains possible
  const EDGE = 100;             // off-screen staging distance for event groups
  const GROUND_TOP = 0.62, GROUND_BOT = 0.8;
  const RARITY_RANK = { 'Common': 0, 'Uncommon': 1, 'Rare': 2, 'Very rare': 3, 'Ultra Rare': 4, 'Legendary': 5 };
  const GATHER_LABEL = [null, 'Rare', 'Very rare', 'Legendary'];
  // Activities each kind can choose while lingering (repeats make an activity more likely)
  const ACTIVITIES = {
    deer: ['graze', 'graze', 'graze', 'sit', 'rest', 'wait', 'drink', 'walk'],
    gaur: ['graze', 'graze', 'sit', 'wait', 'drink', 'walk'],
    boar: ['graze', 'graze', 'wait', 'drink', 'walk', 'sit'],
    elephant: ['graze', 'wait', 'drink', 'walk'],
    peacock: ['graze', 'wait', 'walk'],
    bear: ['graze', 'wait', 'walk', 'sit'],
    tiger: ['walk', 'wait', 'sit', 'drink'],
    leopard: ['walk', 'wait', 'sit', 'drink'],
    wildDog: ['walk', 'wait', 'sit', 'drink'],
    rabbit: ['graze', 'graze', 'wait', 'walk', 'rest'],
    mongoose: ['walk', 'walk', 'wait', 'graze', 'drink'],
    smallBird: ['graze', 'graze', 'walk', 'walk', 'wait']
  };
  // Local Y of the feet for each kind (used for the lying-down pose)
  const FEET_Y = { deer: 24, boar: 21, gaur: 28, elephant: 35, peacock: 21, bear: 21, tiger: 24, leopard: 24, wildDog: 21, rabbit: 9, mongoose: 8, smallBird: 6.5 };

  let gaitAmp = 1;              // 1 while walking, 0 while standing still (scales leg swing)
  let wasEmpty = true, emptyFor = 0, gatherTier = 0;

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const groundY = y => clamp(y, h * GROUND_TOP, h * GROUND_BOT);
  const speedScale = () => clamp(w / 850, 0.6, 1.15);
  const edgeOf = a => 52 * a.scale + 10;
  const inView = a => a.x > 0 && a.x < w && a.y < h + 10;
  const pond = () => ({ x: w * 0.6, y: h * 0.735, rx: Math.max(30, w * 0.07), ry: Math.max(5, h * 0.015) });
  // Prey run from predators; birds (including peafowl) and tuskers hold their ground
  const isPrey = c => !c.fly && !c.predator && c.kind !== 'peacock' && c.kind !== 'smallBird' && !(c.kind === 'elephant' && c.tusks);

  // Binocular helpers
  const lensRadius = () => Math.min(w, h) * 0.3;
  const aimDist = a => Math.hypot(a.x - aim.x, a.y - aim.y);
  const inLens = a => aimDist(a) < lensRadius() / BINOC_ZOOM + 16 * a.scale;
  // Small wildlife is only drawn through the binoculars (always shown in the test gallery)
  const isShown = a => !a.binocularOnly || binoculars || !!testMode;
  // What the player can actually see right now: inside the lens, or anywhere in the window without it
  const isSeen = a => binoculars ? inLens(a) : inView(a) && isShown(a);
  const hasMainAnimals = () => creatures.some(c => !c.binocularOnly);
  // Gathering labels only — does not change predator flee, events, or spawn behaviour beyond soft crowd chance.
  // Species: 5+ Rare, 8+ Very rare. Animals: 9+ Rare, 16+ Very rare, 30+ Legendary. Take the higher tier.
  // Binoculars-only wildlife never counts.
  function gatheringOf(list) {
    const pool = list.filter(c => !c.binocularOnly);
    const animalCount = pool.length;
    const speciesCount = new Set(pool.map(c => c.name)).size;
    const bySpecies = speciesCount >= 8 ? 2 : speciesCount >= 5 ? 1 : 0;
    const byAnimals = animalCount >= 30 ? 3 : animalCount >= 16 ? 2 : animalCount >= 9 ? 1 : 0;
    const tier = Math.max(bySpecies, byAnimals);
    return { animalCount, speciesCount, tier, rarity: GATHER_LABEL[tier] };
  }
  // Keep the lens far enough from the edges that it never looks past the painted scene
  function setAim(x, y) {
    const m = lensRadius() / BINOC_ZOOM;
    aim.x = clamp(x, m, w - m);
    aim.y = clamp(y, m, h - m);
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = r.width;
    h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (binoculars) setAim(aim.x, aim.y);
    else setAim(w / 2, h / 2);
    rebuildBackdrop();
  }

  // ---- Scene painting helpers ----
  const TAU = Math.PI * 2;
  // Stable pseudo-random value in 0..1 so scenery stays put from frame to frame
  const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
  // Lighten (f > 0) or darken (f < 0) a #rrggbb colour
  const shadeCache = new Map();
  function shadeHex(hex, f) {
    const key = hex + f;
    let out = shadeCache.get(key);
    if (out) return out;
    const n = parseInt(hex.slice(1, 7), 16);
    const mix = c => Math.round(f >= 0 ? c + (255 - c) * f : c * (1 + f));
    out = 'rgb(' + mix(n >> 16 & 255) + ',' + mix(n >> 8 & 255) + ',' + mix(n & 255) + ')';
    shadeCache.set(key, out);
    return out;
  }
  // Top edge of the forest floor at a given x (matches the floor curve in paintBackdrop)
  const groundTop = x => {
    const u = clamp(x / Math.max(1, w), 0, 1);
    return h * ((1 - u) * (1 - u) * 0.63 + 2 * u * (1 - u) * 0.55 + u * u * 0.65);
  };
  function disc(g, x, y, r) {
    g.moveTo(x + r, y);
    g.arc(x, y, r, 0, TAU);
  }

  // A tree crown: shaded underside, mid-tone mass, and sunlit leaf clusters on the upper right
  function crown(g, x, y, r, col, seed) {
    g.fillStyle = shadeHex(col, -0.24);
    g.beginPath();
    for (let k = 0; k < 6; k++) {
      const ang = k / 6 * TAU + hash(seed + k);
      disc(g, x + Math.cos(ang) * r * 0.55, y + Math.sin(ang) * r * 0.36, r * (0.48 + hash(seed + k * 3) * 0.24));
    }
    disc(g, x, y, r * 0.7);
    g.fill();

    g.fillStyle = col;
    g.beginPath();
    for (let k = 0; k < 5; k++) {
      const ang = -2.7 + k * 0.58;
      disc(g, x + Math.cos(ang) * r * 0.5 + r * 0.08, y + Math.sin(ang) * r * 0.36 - r * 0.08, r * (0.3 + hash(seed + 20 + k) * 0.15));
    }
    g.fill();

    g.fillStyle = shadeHex(col, 0.1);
    g.beginPath();
    for (let k = 0; k < 7; k++) {
      disc(g, x + (hash(seed + 40 + k) - 0.35) * r * 1.1, y - r * 0.22 - hash(seed + 50 + k) * r * 0.5, r * (0.1 + hash(seed + 60 + k) * 0.1));
    }
    g.fill();
  }

  // A tree trunk with flared roots, light from the right, and bark furrows
  function trunk(g, x, baseY, topY, wd, col, seed) {
    const lean = (hash(seed) - 0.5) * wd * 1.4;
    const span = Math.max(1, baseY - topY);
    const grad = g.createLinearGradient(x - wd * 0.6, 0, x + wd * 0.6, 0);
    grad.addColorStop(0, shadeHex(col, -0.32));
    grad.addColorStop(0.55, col);
    grad.addColorStop(1, shadeHex(col, 0.2));
    g.fillStyle = grad;
    g.beginPath();
    g.moveTo(x - wd * 0.95, baseY);
    g.quadraticCurveTo(x - wd * 0.5, baseY - wd * 0.9, x - wd * 0.45, baseY - wd * 2.2);
    g.lineTo(x + lean - wd * 0.36, topY);
    g.lineTo(x + lean + wd * 0.36, topY);
    g.lineTo(x + wd * 0.45, baseY - wd * 2.2);
    g.quadraticCurveTo(x + wd * 0.5, baseY - wd * 0.9, x + wd, baseY);
    g.closePath();
    g.fill();

    g.strokeStyle = shadeHex(col, -0.45);
    g.globalAlpha = 0.5;
    g.lineWidth = Math.max(0.6, wd * 0.07);
    g.beginPath();
    for (let k = 0; k < 6; k++) {
      const y0 = topY + span * (0.12 + hash(seed + k + 9) * 0.7);
      const y1 = Math.min(baseY - 2, y0 + span * 0.14);
      const fx = (hash(seed + k + 1) - 0.5) * wd * 0.55;
      g.moveTo(x + fx + lean * (baseY - y0) / span, y0);
      g.lineTo(x + fx + lean * (baseY - y1) / span, y1);
    }
    g.stroke();
    g.globalAlpha = 1;
  }

  // Everything in the forest that does not move: sky, ridges, trees, floor, and the pool
  function paintBackdrop(g) {
    // Hazy morning sky
    const sky = g.createLinearGradient(0, 0, 0, h * 0.62);
    sky.addColorStop(0, '#a7c3b3');
    sky.addColorStop(0.55, '#cfd9b6');
    sky.addColorStop(1, '#9fb78f');
    g.fillStyle = sky;
    g.fillRect(0, 0, w, h);

    // Soft morning light
    const sunX = w * 0.76, sunY = h * 0.17;
    const glow = g.createRadialGradient(sunX, sunY, 4, sunX, sunY, h * 0.55);
    glow.addColorStop(0, 'rgba(252,240,196,0.75)');
    glow.addColorStop(0.35, 'rgba(248,234,184,0.28)');
    glow.addColorStop(1, 'rgba(246,233,184,0)');
    g.fillStyle = glow;
    g.fillRect(0, 0, w, h);

    // Distant Western Ghats ridges, paler with distance
    [[0.33, '#a9bfa6', 1.1, 0.045], [0.38, '#93ae90', 1.9, 0.035], [0.43, '#7d9c7a', 3.1, 0.028]].forEach(([base, col, f, amp], k) => {
      g.fillStyle = col;
      g.beginPath();
      g.moveTo(0, h);
      for (let i = 0; i <= 48; i++) {
        const u = i / 48;
        g.lineTo(u * w, h * (base + amp * Math.sin(u * 6.3 * f + k * 2.1) + 0.012 * Math.sin(u * 23 * f + k * 5)));
      }
      g.lineTo(w, h);
      g.fill();
    });

    // Far canopy
    const farCols = ['#6f8f6b', '#648662', '#5a7c5d'];
    for (let i = 0; i < 17; i++) {
      const x = (i / 16) * w + (hash(i) - 0.5) * w * 0.04;
      crown(g, x, h * (0.39 + hash(i + 30) * 0.06), h * (0.085 + hash(i + 60) * 0.04), farCols[i % 3], i * 13);
    }

    // Morning haze hanging between the far canopy and the nearer trees
    const haze = g.createLinearGradient(0, h * 0.36, 0, h * 0.62);
    haze.addColorStop(0, 'rgba(214,224,196,0)');
    haze.addColorStop(0.55, 'rgba(214,224,196,0.36)');
    haze.addColorStop(1, 'rgba(214,224,196,0)');
    g.fillStyle = haze;
    g.fillRect(0, h * 0.36, w, h * 0.26);

    // Forest floor, sunlit at the back and shaded toward the window
    const floor = g.createLinearGradient(0, h * 0.56, 0, h);
    floor.addColorStop(0, '#7c9860');
    floor.addColorStop(0.25, '#5f7f4f');
    floor.addColorStop(0.6, '#456643');
    floor.addColorStop(1, '#2f4d36');
    g.fillStyle = floor;
    g.beginPath();
    g.moveTo(0, h * 0.63);
    g.quadraticCurveTo(w * 0.5, h * 0.55, w, h * 0.65);
    g.lineTo(w, h);
    g.lineTo(0, h);
    g.fill();

    // Midground trees standing at the back of the clearing
    const trees = [];
    for (let i = 0; i < 6; i++) {
      trees.push({
        x: w * (0.07 + i * 0.172) + (hash(i + 90) - 0.5) * w * 0.06,
        wd: Math.max(6, h * (0.02 + hash(i + 100) * 0.016)),
        top: h * (0.2 + hash(i + 110) * 0.07)
      });
    }
    trunk(g, w * 0.012, h * 0.65, -10, Math.max(12, h * 0.05), '#343b2c', 51);
    trunk(g, w * 0.99, h * 0.665, -10, Math.max(12, h * 0.045), '#3a3a2b', 67);
    trees.forEach((tr, i) => trunk(g, tr.x, groundTop(tr.x) + h * 0.025, tr.top, tr.wd, i % 2 ? '#4f4636' : '#434c39', i * 7 + 200));

    // Low bushes along the treeline
    for (let i = 0; i < 18; i++) {
      const x = (i + 0.5) / 18 * w + (hash(i + 150) - 0.5) * w * 0.04;
      crown(g, x, groundTop(x) + h * 0.004, h * (0.028 + hash(i + 170) * 0.02), i % 2 ? '#476b48' : '#3f6143', i * 11 + 500);
    }

    // Crowns of the midground trees
    const midCols = ['#4c6b4d', '#446447', '#557552'];
    trees.forEach((tr, i) => {
      crown(g, tr.x + (hash(i + 140) - 0.5) * h * 0.18, tr.top + h * 0.075, h * 0.075, midCols[(i + 1) % 3], i * 19 + 350);
      crown(g, tr.x, tr.top + h * 0.02, h * (0.095 + hash(i + 130) * 0.03), midCols[i % 3], i * 17 + 300);
    });

    // Nearer rise of the floor
    const near = g.createLinearGradient(0, h * 0.7, 0, h);
    near.addColorStop(0, '#42633f');
    near.addColorStop(1, '#2a4631');
    g.fillStyle = near;
    g.beginPath();
    g.moveTo(0, h * 0.78);
    g.quadraticCurveTo(w * 0.5, h * 0.67, w, h * 0.77);
    g.lineTo(w, h);
    g.lineTo(0, h);
    g.fill();

    // Dappled sunlight on the ground
    g.fillStyle = 'rgba(232,226,150,0.1)';
    g.beginPath();
    for (let i = 0; i < 12; i++) {
      const dx = hash(i + 400) * w, dy = h * (0.63 + hash(i + 420) * 0.2);
      const drx = w * (0.03 + hash(i + 440) * 0.04);
      g.moveTo(dx + drx, dy);
      g.ellipse(dx, dy, drx, h * (0.008 + hash(i + 460) * 0.01), 0, 0, TAU);
    }
    g.fill();

    // Leaf litter
    g.globalAlpha = 0.45;
    const litter = ['#7a6a3f', '#8d7b4a', '#5d5233', '#9aa35e'];
    for (let i = 0; i < 90; i++) {
      g.fillStyle = litter[i % 4];
      g.fillRect(hash(i + 600) * w, h * (0.62 + hash(i + 700) * 0.24), 2.2, 1.1);
    }
    g.globalAlpha = 1;

    // Grass tufts across the clearing
    for (let pass = 0; pass < 2; pass++) {
      g.strokeStyle = pass ? '#86a162' : '#4f7447';
      g.lineWidth = 1;
      g.beginPath();
      for (let i = pass; i < 64; i += 2) {
        const tx = hash(i + 800) * w, ty = h * (0.615 + hash(i + 840) * 0.22);
        const len = h * (0.008 + hash(i + 880) * 0.012);
        for (let b = -1; b <= 1; b++) {
          g.moveTo(tx + b * 1.6, ty);
          g.lineTo(tx + b * 3.4, ty - len * (b ? 0.8 : 1));
        }
      }
      g.stroke();
    }

    // A few mossy stones
    [[0.3, 0.668, 1], [0.86, 0.705, 1.3], [0.11, 0.745, 0.9]].forEach(([u, v, s]) => {
      const rx = h * 0.022 * s, x = u * w, y = v * h;
      g.fillStyle = '#59604f';
      g.beginPath();
      g.ellipse(x, y, rx, rx * 0.55, 0, Math.PI, TAU);
      g.fill();
      g.fillStyle = '#7f8873';
      g.beginPath();
      g.ellipse(x + rx * 0.2, y - rx * 0.2, rx * 0.55, rx * 0.28, -0.2, Math.PI, TAU);
      g.fill();
      g.fillStyle = 'rgba(78,112,60,0.7)';
      g.beginPath();
      g.ellipse(x - rx * 0.35, y - rx * 0.1, rx * 0.4, rx * 0.2, 0.2, Math.PI, TAU);
      g.fill();
    });

    // Small forest pool where animals come to drink: muddy bank, shaded far side, bright near side
    const p = pond();
    g.fillStyle = '#4d4b36';
    g.beginPath();
    g.ellipse(p.x, p.y + 1.5, p.rx + 7, p.ry + 4, 0, 0, TAU);
    g.fill();
    g.fillStyle = '#2f4a37';
    g.beginPath();
    g.ellipse(p.x, p.y + 1, p.rx + 3, p.ry + 2, 0, 0, TAU);
    g.fill();
    const water = g.createLinearGradient(0, p.y - p.ry, 0, p.y + p.ry);
    water.addColorStop(0, '#5f8580');
    water.addColorStop(0.5, '#93b8b0');
    water.addColorStop(1, '#c4d9cc');
    g.fillStyle = water;
    g.beginPath();
    g.ellipse(p.x, p.y, p.rx, p.ry, 0, 0, TAU);
    g.fill();

    // Reeds on the bank
    g.strokeStyle = '#5c7a45';
    g.lineWidth = 1.2;
    g.beginPath();
    for (let k = 0; k < 9; k++) {
      const rx0 = p.x - p.rx - 3 + k * 2.2;
      g.moveTo(rx0, p.y + 3);
      g.quadraticCurveTo(rx0 - 1, p.y - 6 - hash(k) * 8, rx0 + (hash(k + 5) - 0.5) * 6, p.y - 10 - hash(k) * 10);
    }
    g.stroke();
  }

  let bgCache = null;
  function rebuildBackdrop() {
    if (!bgCache) bgCache = document.createElement('canvas');
    bgCache.width = canvas.width;
    bgCache.height = canvas.height;
    if (!bgCache.width || !bgCache.height) return;
    const g = bgCache.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    paintBackdrop(g);
  }

  function drawBackground(t, throughLens) {
    // The still parts of the forest are painted once per resize.
    // Through the binoculars they are redrawn live so they stay sharp when magnified.
    if (!throughLens && bgCache && bgCache.width > 0 && bgCache.height > 0) ctx.drawImage(bgCache, 0, 0, w, h);
    else paintBackdrop(ctx);

    // Light moving on the pool
    const p = pond();
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, p.rx, p.ry, 0, 0, TAU);
    ctx.clip();
    ctx.fillStyle = 'rgba(236,244,232,0.5)';
    for (let k = 0; k < 3; k++) {
      ctx.beginPath();
      ctx.ellipse(p.x + Math.sin(t * 0.5 + k * 2.1) * p.rx * 0.5, p.y + (k - 1) * p.ry * 0.45, p.rx * (0.28 - k * 0.05), p.ry * 0.12, 0, 0, TAU);
      ctx.fill();
    }
    ctx.restore();

    // Sunlight shafts slanting down from the right, fading toward the ground
    for (let i = 0; i < 5; i++) {
      const x = w * (0.16 + i * 0.19);
      const strength = 0.11 + Math.sin(t * 0.25 + i * 1.7) * 0.035;
      const beam = ctx.createLinearGradient(0, h * 0.18, 0, h * 0.95);
      beam.addColorStop(0, 'rgba(240,230,170,' + strength.toFixed(3) + ')');
      beam.addColorStop(1, 'rgba(240,230,170,0)');
      ctx.fillStyle = beam;
      ctx.beginPath();
      ctx.moveTo(x, h * 0.18);
      ctx.lineTo(x + w * 0.045, h * 0.18);
      ctx.lineTo(x - w * 0.03, h);
      ctx.lineTo(x - w * 0.1, h);
      ctx.fill();
    }

    // Drifting motes caught in the light
    ctx.fillStyle = 'rgba(250,244,205,0.55)';
    ctx.beginPath();
    for (let i = 0; i < 9; i++) {
      const mx = (hash(i + 40) * w + Math.sin(t * 0.3 + i * 2.2) * 26 + w) % Math.max(1, w);
      const my = h * (0.3 + hash(i + 50) * 0.36) + Math.sin(t * 0.5 + i) * 9;
      disc(ctx, mx, my, 0.9 + hash(i + 60) * 0.7);
    }
    ctx.fill();
  }

  // A broad leaf from its base to its tip, with a pale midrib
  function drawLeaf(bx, by, ang, len, col) {
    const tx = bx + Math.sin(ang) * len, ty = by - Math.cos(ang) * len;
    const nx = Math.cos(ang) * len * 0.22, ny = Math.sin(ang) * len * 0.22;
    const mx = (bx + tx) / 2, my = (by + ty) / 2;
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.quadraticCurveTo(mx + nx, my + ny, tx, ty);
    ctx.quadraticCurveTo(mx - nx, my - ny, bx, by);
    ctx.fill();
    ctx.strokeStyle = 'rgba(160,190,130,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(tx, ty);
    ctx.stroke();
  }

  function drawForegroundFoliage(t) {
    // Shade pooling at the very front
    const shade = ctx.createLinearGradient(0, h * 0.8, 0, h);
    shade.addColorStop(0, 'rgba(22,42,30,0)');
    shade.addColorStop(1, 'rgba(18,36,26,0.7)');
    ctx.fillStyle = shade;
    ctx.fillRect(0, h * 0.8, w, h * 0.2);

    // Foreground shrubs, back rows first: shaded base, leafy mass, sunlit leaves
    for (let row = 0; row < 4; row++) {
      for (let i = row; i < 26; i += 4) {
        const x = (i / 25) * w + Math.sin(i * 12) * 14 + Math.sin(t * 0.7 + i * 1.3) * 1.2;
        const y = h * (0.83 + row * 0.035);
        const r = h * (0.045 + (i % 3) * 0.012);
        const col = ['#294d37', '#34583b', '#3b6541'][i % 3];
        ctx.fillStyle = shadeHex(col, -0.28);
        ctx.beginPath();
        disc(ctx, x, y + r * 0.15, r);
        disc(ctx, x - r * 0.6, y + r * 0.4, r * 0.78);
        disc(ctx, x + r * 0.65, y + r * 0.38, r * 0.74);
        ctx.fill();
        ctx.fillStyle = col;
        ctx.beginPath();
        disc(ctx, x + r * 0.08, y - r * 0.1, r * 0.8);
        disc(ctx, x - r * 0.55, y + r * 0.12, r * 0.56);
        disc(ctx, x + r * 0.62, y + r * 0.1, r * 0.53);
        ctx.fill();
        ctx.fillStyle = shadeHex(col, 0.2);
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          ell(x + (hash(i * 9 + k) - 0.4) * r * 1.5, y - r * 0.15 - hash(i * 9 + k + 3) * r * 0.6, r * 0.17, r * 0.08, -0.5 + hash(i + k) * 1.2);
        }
        ctx.fill();
      }
    }

    // Fern-like undergrowth between the shrubs
    for (let c = 0; c < 7; c++) {
      const bx = (c + 0.5) / 7 * w + (hash(c + 20) - 0.5) * w * 0.07;
      const by = h * (0.94 + hash(c + 25) * 0.05);
      for (let f = 0; f < 5; f++) {
        const ang = (f - 2) * 0.5 + Math.sin(t * 0.6 + c + f) * 0.04;
        drawLeaf(bx, by, ang, h * (0.07 + hash(c * 5 + f) * 0.04), f % 2 ? '#3d6b43' : '#2f5a3b');
      }
    }

    // Broad leaves framing the lower corners
    const lean = Math.sin(t * 0.5) * 0.03;
    drawLeaf(0, h * 1.01, 0.9 + lean, h * 0.2, '#213f2d');
    drawLeaf(w * 0.02, h * 1.02, 0.5 + lean, h * 0.26, '#1f3d2b');
    drawLeaf(w * 0.05, h * 1.02, 0.14 - lean, h * 0.2, '#28492f');
    drawLeaf(w, h * 1.01, -0.9 - lean, h * 0.2, '#213f2d');
    drawLeaf(w * 0.98, h * 1.02, -0.5 - lean, h * 0.26, '#1f3d2b');
    drawLeaf(w * 0.95, h * 1.02, -0.14 + lean, h * 0.2, '#28492f');

    // Grass blades bending in the breeze
    for (let pass = 0; pass < 2; pass++) {
      ctx.strokeStyle = pass ? '#8fa765' : '#5f8250';
      ctx.lineWidth = pass ? 1 : 1.4;
      ctx.beginPath();
      for (let i = pass; i < 90; i += 2) {
        const x = hash(i + 700) * w, y = h * (0.86 + hash(i + 800) * 0.13);
        const len = h * (0.025 + hash(i + 900) * 0.035);
        const bend = Math.sin(t * 1.1 + i) * 3 + (hash(i + 950) - 0.5) * 8;
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + bend * 0.3, y - len * 0.6, x + bend, y - len);
      }
      ctx.stroke();
    }

    // Overhanging canopy along the top of the view
    const over = ctx.createLinearGradient(0, 0, 0, h * 0.12);
    over.addColorStop(0, 'rgba(20,40,28,0.6)');
    over.addColorStop(1, 'rgba(20,40,28,0)');
    ctx.fillStyle = over;
    ctx.fillRect(0, 0, w, h * 0.12);
    ctx.fillStyle = '#24402e';
    ctx.beginPath();
    for (let i = 0; i < 15; i++) {
      disc(ctx, (i / 14) * w + (hash(i + 300) - 0.5) * w * 0.04, -h * 0.02, h * (0.045 + hash(i + 320) * 0.03));
    }
    ctx.fill();

    // Hanging vines and their leaves
    const leaves = [];
    ctx.strokeStyle = '#27432f';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    for (let i = 0; i < 13; i++) {
      const x = i * w / 12, s = Math.sin(t * 0.4 + i);
      const len = h * (0.12 + hash(i + 500) * 0.08);
      ctx.moveTo(x, 0);
      ctx.quadraticCurveTo(x + s * 18, len * 0.4, x + s * 27, len);
      for (let j = 0; j < 4; j++) {
        const u = (j + 1) / 4.4;
        leaves.push([x + s * (18 * u + 9 * u * u) + (j % 2 ? 7 : -5), len * u, (j % 2 ? 0.55 : -0.5) + s * 0.25, 8 + hash(i * 5 + j) * 4]);
      }
    }
    ctx.stroke();
    ctx.fillStyle = '#2f5539';
    ctx.beginPath();
    for (const [lx, ly, rot, sz] of leaves) ell(lx, ly, sz * 0.8, sz * 2, rot);
    ctx.fill();
    ctx.fillStyle = '#3b6843';
    ctx.beginPath();
    for (const [lx, ly, rot, sz] of leaves) ell(lx + 1.5, ly - 1.5, sz * 0.36, sz * 1.5, rot);
    ctx.fill();
  }

  // ---- Shared animal drawing helpers ----

  // Adds an ellipse as its own subpath so several can be filled together
  function ell(x, y, rx, ry, rot) {
    const r = rot || 0;
    ctx.moveTo(x + rx * Math.cos(r), y + rx * Math.sin(r));
    ctx.ellipse(x, y, rx, ry, r, 0, TAU);
  }

  // Coat colour with light on the back and shade under the belly
  function coat(color, y0, y1, hi, lo) {
    const g = ctx.createLinearGradient(0, y0, 0, y1);
    g.addColorStop(0, shadeHex(color, hi === undefined ? 0.16 : hi));
    g.addColorStop(0.5, color);
    g.addColorStop(1, shadeHex(color, -(lo === undefined ? 0.3 : lo)));
    return g;
  }

  // Small highlight that makes an eye look alive
  function glint(x, y, r) {
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.fill();
  }

  function drawShadow(rx, ry, yOff) {
    ctx.save();
    ctx.translate(0, yOff);
    ctx.scale(1, ry / rx);
    const g = ctx.createRadialGradient(0, 0, rx * 0.2, 0, 0, rx * 1.15);
    g.addColorStop(0, 'rgba(14,26,18,0.42)');
    g.addColorStop(1, 'rgba(14,26,18,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, rx * 1.15, 0, TAU);
    ctx.fill();
    ctx.restore();
  }

  // Jointed legs: far-side pair drawn darker first, thicker upper limb, slimmer shank, dark hoof or foot
  function drawLegs(positions, topY, bottomY, t, phase, color, width, extraFn) {
    const four = positions.length === 4;
    const far = shadeHex(color, -0.3), foot = shadeHex(color, -0.55);
    const order = four ? [1, 2, 0, 3] : positions.map((_, i) => i);
    const midY = (topY + bottomY) * 0.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const idx of order) {
      const lx = positions[idx];
      const swing = Math.sin(t * 6.5 + phase + idx * 1.6) * 4.5 * gaitAmp;
      ctx.strokeStyle = four && (idx === 1 || idx === 2) ? far : color;
      ctx.lineWidth = width * 1.3;
      ctx.beginPath();
      ctx.moveTo(lx, topY);
      ctx.lineTo(lx + swing * 0.4, midY);
      ctx.stroke();
      ctx.lineWidth = width * 0.85;
      ctx.beginPath();
      ctx.moveTo(lx + swing * 0.4, midY);
      ctx.lineTo(lx + swing, bottomY);
      ctx.stroke();
      if (extraFn) extraFn(lx, swing, topY, bottomY);
      ctx.strokeStyle = foot;
      ctx.lineWidth = width * 0.9;
      ctx.beginPath();
      ctx.moveTo(lx + swing, bottomY - 1.2);
      ctx.lineTo(lx + swing + 0.7, bottomY);
      ctx.stroke();
    }
  }

  function drawDeer(a, t) {
    const isSambar = a.sub === 'sambar' || a.name.includes('Sambar');
    const c = a.color;
    drawShadow(26, 5, 25);

    // Legs
    drawLegs([-18, -11, 11, 17], 7, 24, t, a.phase, '#523a28', 3.2);

    // Tail
    ctx.fillStyle = isSambar ? '#3d2a1d' : '#f3e3c3';
    ctx.beginPath();
    ctx.ellipse(-26, -3, 5, 3, -0.5, 0, Math.PI * 2);
    ctx.fill();

    // Body & torso contour: lit back, shaded underside, deep chest and rounded haunch
    ctx.fillStyle = coat(c, -13, 13);
    ctx.beginPath();
    ell(0, 0, 26, 12.5, -0.03);
    ell(15, 1.5, 10, 11.5, 0.1);
    ell(-17, -0.5, 10.5, 12, -0.1);
    ctx.fill();
    // Darker line along the spine
    ctx.strokeStyle = shadeHex(c, -0.32);
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(-24, -9);
    ctx.quadraticCurveTo(0, -13.5, 17, -9);
    ctx.stroke();

    // Pale belly on spotted deer
    if (!isSambar) {
      ctx.fillStyle = '#e7d1ae';
      ctx.beginPath();
      ctx.ellipse(0, 7, 20, 4, 0, 0, Math.PI);
      ctx.fill();
    }

    // Neck & head
    // headDrop lowers the head to the ground while grazing or drinking
    const graze = (a.headDrop || 0) + Math.sin(t * 1.8 + a.phase) * 2.5;
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.moveTo(15, -4);
    ctx.lineTo(24, -19 + graze);
    ctx.lineTo(29, -15 + graze);
    ctx.lineTo(21, 4);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(28, -19 + graze, 8.5, 5.2, -0.15, 0, Math.PI * 2);
    ctx.fill();

    // Ear with a pale inner side
    ctx.beginPath();
    ctx.ellipse(23, -25 + graze, 3, 6, -0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = isSambar ? '#a98c72' : '#f0d9bb';
    ctx.beginPath();
    ctx.ellipse(23.3, -24.6 + graze, 1.4, 3.8, -0.5, 0, Math.PI * 2);
    ctx.fill();

    // Paler muzzle and throat
    ctx.fillStyle = isSambar ? '#8a6a50' : '#ecd9b8';
    ctx.beginPath();
    ell(33, -17.5 + graze, 3.6, 2.4, 0);
    ell(24, -11 + graze * 0.6, 2.4, 4.6, 0.5);
    ctx.fill();

    // Eye & nose
    ctx.fillStyle = '#1f1916';
    ctx.beginPath();
    ell(30, -20 + graze, 1.5, 1.5, 0);
    ell(35.5, -19 + graze, 1.5, 1.5, 0);
    ctx.fill();
    glint(30.4, -20.5 + graze, 0.5);

    // Antlers (some individuals in herd have larger antlers)
    if (a.hasAntlers !== false) {
      ctx.strokeStyle = '#4c3d2e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(25, -23 + graze);
      ctx.quadraticCurveTo(19, -34 + graze, 13, -37 + graze);
      ctx.moveTo(19, -31 + graze);
      ctx.lineTo(24, -36 + graze);
      ctx.moveTo(16, -34 + graze);
      ctx.lineTo(18, -40 + graze);
      ctx.stroke();
    }

    // Chital white spots
    if (!isSambar) {
      ctx.fillStyle = '#f6e7c8';
      const spots = [[-16, -4], [-10, -6], [-4, -5], [2, -6], [8, -4], [-13, 0], [-7, -1], [-1, 0], [5, -1], [11, 0], [-9, 4], [-2, 4], [4, 4]];
      for (const [sx, sy] of spots) {
        ctx.beginPath();
        ctx.arc(sx, sy, 1.45, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function drawBoar(a, t) {
    drawShadow(24, 5, 22);
    drawLegs([-16, -9, 10, 16], 8, 21, t, a.phase, '#2f2721', 3.6);

    // Bristly dorsal ridge
    ctx.fillStyle = '#2a221c';
    ctx.beginPath();
    ctx.ellipse(-2, -12, 18, 4.5, 0.08, Math.PI, Math.PI * 2);
    ctx.fill();

    // Heavy body, lit along the back
    ctx.fillStyle = coat(a.color, -14, 14);
    ctx.beginPath();
    ctx.ellipse(0, 0, 25, 14, 0.05, 0, Math.PI * 2);
    ctx.fill();

    // Sloping snout / head
    ctx.beginPath();
    ctx.moveTo(16, -10);
    ctx.lineTo(34, 1);
    ctx.lineTo(32, 7);
    ctx.lineTo(14, 9);
    ctx.closePath();
    ctx.fill();

    // Ear & tail
    ctx.beginPath();
    ctx.ellipse(17, -11, 3.5, 5.5, -0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#2f2721';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-24, -3);
    ctx.quadraticCurveTo(-31, -8, -29, -14 + Math.sin(t * 7) * 2);
    ctx.stroke();

    // Tusk & eye
    ctx.fillStyle = '#e7dac2';
    ctx.beginPath();
    ctx.moveTo(28, 4);
    ctx.lineTo(32, -2);
    ctx.lineTo(26, 2);
    ctx.fill();

    ctx.fillStyle = '#1b1613';
    ctx.beginPath();
    ctx.arc(23, -3, 1.3, 0, Math.PI * 2);
    ctx.fill();
    glint(23.4, -3.4, 0.45);

    // Snout disc and coarse bristles standing along the back
    ctx.fillStyle = '#6b594b';
    ctx.beginPath();
    ctx.ellipse(33, 4, 1.8, 3, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1f1914';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < 9; i++) {
      const bx = -18 + i * 4, lift = Math.abs(i - 4) * 0.55;
      ctx.moveTo(bx, -13 + lift);
      ctx.lineTo(bx - 2, -17.5 + lift);
    }
    ctx.stroke();
  }

  function drawGaur(a, t) {
    const isBull = !!a.bull;
    drawShadow(34, 6.5, 29);

    // Legs with characteristic white stockings
    drawLegs([-21, -12, 12, 20], 10, 28, t, a.phase, '#2a211c', 4.6, (lx, swing, topY, bottomY) => {
      ctx.strokeStyle = '#dfd4bc';
      ctx.lineWidth = 4.2;
      ctx.beginPath();
      ctx.moveTo(lx + swing * 0.55, (topY + bottomY) * 0.58);
      ctx.lineTo(lx + swing, bottomY);
      ctx.stroke();
      ctx.strokeStyle = '#2a211c';
      ctx.lineWidth = 4.6;
    });

    // Massive body & muscular shoulder hump
    ctx.fillStyle = coat(a.color, -22, 17, 0.2);
    ctx.beginPath();
    ctx.ellipse(0, 0, 32, 17, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(7, -13, isBull ? 17 : 14, isBull ? 9 : 6.5, -0.15, 0, Math.PI * 2);
    ctx.fill();

    // Sheen over the shoulder muscle
    ctx.fillStyle = 'rgba(255,240,215,0.045)';
    ctx.beginPath();
    ctx.ellipse(5, -11, 14, 5, -0.12, 0, Math.PI * 2);
    ctx.fill();

    // Dewlap under throat (prominent on bull)
    if (isBull) {
      ctx.fillStyle = '#1b1512';
      ctx.beginPath();
      ctx.ellipse(21, 8, 9, 6, 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Head
    ctx.fillStyle = a.color;
    ctx.beginPath();
    ctx.ellipse(28, -5, 11, 8.5, 0.25, 0, Math.PI * 2);
    ctx.fill();

    // Pale forehead boss
    ctx.fillStyle = '#cfc2a6';
    ctx.beginPath();
    ctx.ellipse(29, -11, 5, 3.2, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Curved pale horns with black tips
    ctx.strokeStyle = '#dfd3b8';
    ctx.lineWidth = isBull ? 4 : 3;
    ctx.beginPath();
    ctx.moveTo(27, -12);
    ctx.quadraticCurveTo(20, -25, 29, -27);
    ctx.stroke();

    ctx.strokeStyle = '#181412';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(27, -25);
    ctx.lineTo(31, -28);
    ctx.stroke();

    // Ear, pale muzzle, and eye
    ctx.fillStyle = shadeHex(a.color, 0.14);
    ctx.beginPath();
    ctx.ellipse(20.5, -7.5, 5, 2.5, 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#8f8676';
    ctx.beginPath();
    ctx.ellipse(36.5, -1.5, 2.8, 3.3, 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#14100e';
    ctx.beginPath();
    ctx.arc(31, -6, 1.4, 0, Math.PI * 2);
    ctx.fill();
    glint(31.4, -6.4, 0.45);
  }

  function drawPeacock(a, t) {
    const dancing = a.pose === 'dance';
    drawShadow(dancing ? 28 : 20, 4.5, 22);

    // Fan train when dancing, or long trailing train when walking
    if (dancing) {
      const sway = Math.sin(t * 3 + a.phase) * 0.06;
      ctx.save();
      ctx.rotate(sway);
      ctx.fillStyle = '#236e53';
      ctx.beginPath();
      ctx.arc(-4, -4, 38, Math.PI * 0.92, Math.PI * 2.08);
      ctx.fill();

      // Feather rays & ocelli (eye-spots)
      for (let i = 0; i < 11; i++) {
        const ang = Math.PI * 1.02 + (i / 10) * Math.PI * 0.96;
        const r1 = 23, r2 = 34;
        for (const rad of [r1, r2]) {
          const ex = -4 + Math.cos(ang) * rad;
          const ey = -4 + Math.sin(ang) * rad;
          ctx.fillStyle = '#d9b45b';
          ctx.beginPath();
          ctx.arc(ex, ey, 2.7, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#174f78';
          ctx.beginPath();
          ctx.arc(ex, ey, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    } else {
      ctx.fillStyle = '#266b52';
      ctx.beginPath();
      ctx.moveTo(-10, -2);
      ctx.quadraticCurveTo(-34, 1, -52, 8 + Math.sin(t * 3 + a.phase) * 2);
      ctx.quadraticCurveTo(-32, 8, -8, 4);
      ctx.fill();

      ctx.fillStyle = '#d8b45c';
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(-22 - i * 7, 3 + i * 1.2, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Legs
    drawLegs([-4, 4], 7, 21, t, a.phase, '#8f7b5e', 2.2);

    // Body & folded wing
    ctx.fillStyle = coat(a.color, -8, 10, 0.2);
    ctx.beginPath();
    ctx.ellipse(0, 1, 15, 9, -0.1, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#2d8267';
    ctx.beginPath();
    ctx.ellipse(-2, 1, 10, 5.5, -0.05, 0, Math.PI * 2);
    ctx.fill();

    // Scalloped wing feathers
    ctx.strokeStyle = 'rgba(18,60,48,0.55)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    for (const [fx, fy] of [[-8, 0], [-4, -1], [0, 0], [4, 1], [-6, 3], [-2, 3.5], [2, 3.5]]) {
      ctx.moveTo(fx + 2, fy);
      ctx.arc(fx, fy, 2, 0, Math.PI);
    }
    ctx.stroke();

    // Iridescent neck & head
    ctx.fillStyle = '#155b75';
    ctx.beginPath();
    ctx.moveTo(9, 1);
    ctx.quadraticCurveTo(15, -10, 14, -18);
    ctx.lineTo(19, -17);
    ctx.quadraticCurveTo(19, -6, 13, 4);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(16, -18, 4.8, 0, Math.PI * 2);
    ctx.fill();

    // Crown crest
    ctx.strokeStyle = '#155b75';
    ctx.lineWidth = 1.2;
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.moveTo(15, -22);
      ctx.lineTo(13 + i * 2.5, -27);
      ctx.stroke();
      ctx.fillStyle = '#d8b45c';
      ctx.beginPath();
      ctx.arc(13 + i * 2.5, -27, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Beak & eye
    ctx.fillStyle = '#d8b673';
    ctx.beginPath();
    ctx.moveTo(20, -19);
    ctx.lineTo(26, -17);
    ctx.lineTo(20, -16);
    ctx.fill();

    // Sheen down the neck
    ctx.strokeStyle = 'rgba(120,205,225,0.4)';
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(15.5, -14);
    ctx.quadraticCurveTo(16.5, -6, 12, 1);
    ctx.stroke();

    // White face patch with a dark eye
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.ellipse(17, -18.5, 1.9, 1.3, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#16120f';
    ctx.beginPath();
    ctx.arc(17.2, -18.5, 0.8, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawElephant(a, t) {
    const fighting = a.pose === 'fight';
    const push = fighting ? Math.sin(t * 5) * 4 * a.dir : 0;
    ctx.save();
    ctx.translate(push * a.dir, 0);

    drawShadow(38, 7.5, 36);

    // Pillar legs
    const legSwing = fighting ? 1.5 : 3.5 * gaitAmp;
    ctx.lineWidth = 7.5;
    ctx.lineCap = 'round';
    const legNear = shadeHex(a.color, -0.16), legFar = shadeHex(a.color, -0.34);
    [-10, 11, -22, 20].forEach((lx, i) => {
      const sw = Math.sin(t * 4.5 + a.phase + lx * 0.13) * legSwing;
      ctx.strokeStyle = i < 2 ? legFar : legNear;
      ctx.beginPath();
      ctx.moveTo(lx, 12);
      ctx.lineTo(lx + sw, 35);
      ctx.stroke();
      // Pale toenails
      ctx.fillStyle = 'rgba(214,205,184,0.75)';
      ctx.beginPath();
      ctx.ellipse(lx + sw + 2.2, 36.2, 1.1, 1.3, 0, 0, Math.PI * 2);
      ctx.ellipse(lx + sw - 0.4, 36.6, 1.1, 1.3, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Domed back & body
    ctx.fillStyle = coat(a.color, -24, 23, 0.18);
    ctx.beginPath();
    ctx.ellipse(0, 0, 35, 23, -0.04, 0, Math.PI * 2);
    ctx.fill();

    // Loose skin folds
    ctx.strokeStyle = 'rgba(40,44,40,0.22)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (const [x0, y0, cx, cy, x1, y1] of [[-20, -14, -24, 0, -19, 14], [-6, -19, -9, 0, -5, 19], [9, -18, 7, -2, 10, 17], [-27, 2, -22, 6, -25, 13]]) {
      ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(cx, cy, x1, y1);
    }
    ctx.stroke();

    // Tail
    ctx.strokeStyle = '#4e524b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-34, -2);
    ctx.quadraticCurveTo(-41, 8, -38, 19);
    ctx.stroke();

    // Twin-domed Asian elephant head
    const headTilt = fighting ? -0.18 : 0;
    ctx.save();
    ctx.translate(27, -11);
    ctx.rotate(headTilt);

    ctx.fillStyle = coat(a.color, -20, 16, 0.18);
    ctx.beginPath();
    ctx.arc(0, 0, 15.5, 0, Math.PI * 2);
    ctx.arc(-3, -10, 9.5, 0, Math.PI * 2);
    ctx.fill();

    // Ear (the smaller Asian shape) with a fold and a paler, mottled lower edge
    ctx.fillStyle = shadeHex(a.color, -0.2);
    ctx.beginPath();
    ctx.ellipse(-10, 0, 9, 12.5, -0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(196,150,140,0.32)';
    ctx.beginPath();
    ctx.ellipse(-11, 8, 5.5, 4, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(30,33,30,0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-6, -10);
    ctx.quadraticCurveTo(-14, -2, -9, 10);
    ctx.stroke();

    // Trunk
    const trunkWave = fighting ? -12 + Math.sin(t * 7 + a.phase) * 5 : Math.sin(t * 2.2 + a.phase) * 4;
    ctx.strokeStyle = a.color;
    ctx.lineWidth = 8.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(11, 2);
    if (fighting) {
      ctx.quadraticCurveTo(24, -4, 20, 18 + trunkWave * 0.4);
    } else {
      ctx.quadraticCurveTo(21, 16, 13 + trunkWave, 31);
    }
    ctx.stroke();

    // Ivory tusks (for tusker / fighting tuskers)
    if (a.tusks) {
      ctx.strokeStyle = '#f5ecd4';
      ctx.lineWidth = 3.8;
      ctx.beginPath();
      ctx.moveTo(8, 7);
      if (fighting) {
        ctx.quadraticCurveTo(24, 9, 34, -2);
      } else {
        ctx.quadraticCurveTo(22, 13, 30, 4);
      }
      ctx.stroke();
    }

    // Eye
    ctx.fillStyle = '#1f1d1a';
    ctx.beginPath();
    ctx.arc(5, -3, 1.6, 0, Math.PI * 2);
    ctx.fill();
    glint(5.5, -3.5, 0.5);

    ctx.restore();
    ctx.restore();
  }

  function drawBigCatLeg(hipX, hipY, isHind, swing, mainColor, pawColor) {
    const kneeX = hipX + (isHind ? -3 + swing * 0.45 : 2 + swing * 0.5);
    const kneeY = hipY + 10;
    const ankleX = hipX + (isHind ? -5 + swing * 0.85 : swing * 0.95);
    const ankleY = hipY + 19;
    const pawX = ankleX + 2.8;

    ctx.fillStyle = mainColor;
    ctx.beginPath();
    ctx.moveTo(hipX - (isHind ? 6.5 : 5.2), hipY);
    ctx.quadraticCurveTo(kneeX - 4.5, kneeY, ankleX - 2.6, ankleY);
    ctx.lineTo(ankleX + 2.8, ankleY);
    ctx.quadraticCurveTo(kneeX + 4.8, kneeY, hipX + (isHind ? 6.5 : 5.2), hipY);
    ctx.closePath();
    ctx.fill();

    // Heavy feline paw
    ctx.fillStyle = pawColor || mainColor;
    ctx.beginPath();
    ctx.ellipse(pawX, ankleY + 0.5, 4.4, 2.3, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function traceBigCatBody(ctx, isTiger) {
    ctx.beginPath();
    // Start at base of neck / chest
    ctx.moveTo(27, -7);
    // Powerful shoulder hump
    ctx.bezierCurveTo(21, -15, 12, -16, 4, -13.5);
    // Muscular back dipping slightly then rising to croup/haunches
    ctx.bezierCurveTo(-6, -12, -17, -14.5, -26, -11);
    // Rounded hindquarters down to rear thigh
    ctx.bezierCurveTo(-32, -8, -33, 1, -27, 8);
    // Tucked inguinal flank & deep ribcage/chest
    ctx.bezierCurveTo(-18, 6.5, -10, 9.5, 4, 11);
    ctx.bezierCurveTo(15, 11.5, 24, 9.5, 28, 3);
    ctx.closePath();
  }

  function drawTiger(a, t) {
    const stride = Math.sin(t * 5.8 + a.phase) * gaitAmp;
    const strideOpp = Math.sin(t * 5.8 + a.phase + Math.PI) * gaitAmp;
    const sway = Math.sin(t * 2.6 + a.phase) * 2.2;

    drawShadow(38, 6, 26);

    // Far-side legs (darker shade for depth)
    drawBigCatLeg(-21, 5, true, strideOpp * 6, '#a95819', '#d8c5a8');
    drawBigCatLeg(16, 5, false, stride * 6, '#a95819', '#d8c5a8');

    // Long, low-slung S-curve tiger tail with black rings
    ctx.lineCap = 'round';
    ctx.strokeStyle = a.color;
    ctx.lineWidth = 5.2;
    ctx.beginPath();
    ctx.moveTo(-28, -7);
    ctx.bezierCurveTo(-40, -3, -46, 8, -56, 3 + sway);
    ctx.stroke();

    // Tail rings & black tip
    ctx.strokeStyle = '#1a1411';
    ctx.lineWidth = 3.2;
    for (const [tx, ty] of [[-35, -3.5], [-41, 0.5], [-47, 3.5], [-52, 3.5 + sway * 0.7]]) {
      ctx.beginPath();
      ctx.moveTo(tx, ty - 2.2);
      ctx.lineTo(tx - 1.5, ty + 2.4);
      ctx.stroke();
    }
    ctx.fillStyle = '#1a1411';
    ctx.beginPath();
    ctx.arc(-56, 3 + sway, 2.8, 0, Math.PI * 2);
    ctx.fill();

    // Anatomical big-cat torso (clipped for underbelly & organic stripes)
    ctx.save();
    traceBigCatBody(ctx, true);
    ctx.fillStyle = coat(a.color, -17, 12, 0.14, 0.22);
    ctx.fill();
    ctx.clip();

    // Subtle dorsal shading
    ctx.fillStyle = '#bd631c';
    ctx.fillRect(-35, -17, 70, 6);

    // Cream white underbelly, chest & inner flank
    ctx.fillStyle = '#f6ecda';
    ctx.beginPath();
    ctx.moveTo(-28, 7);
    ctx.quadraticCurveTo(-8, 3, 12, 4.5);
    ctx.quadraticCurveTo(24, 4, 30, 0);
    ctx.lineTo(30, 14);
    ctx.lineTo(-30, 14);
    ctx.closePath();
    ctx.fill();

    // Organic curved & forked tiger stripes across haunches, ribs, and shoulders
    ctx.strokeStyle = '#18120f';
    ctx.lineWidth = 2.3;
    ctx.lineCap = 'round';
    const stripes = [
      [-24, -12, -27, -2, -23, 6],
      [-19, -13, -21, -3, -18, 5],
      [-14, -13, -15, -1, -12, 7],
      [-8, -13, -10, -2, -7, 8],
      [-3, -13, -4, -1, -1, 8],
      [3, -14, 1, -2, 4, 8],
      [9, -15, 7, -3, 10, 7],
      [15, -15, 13, -4, 15, 6],
      [20, -13, 19, -4, 21, 4]
    ];
    for (const [x0, y0, cx, cy, x1, y1] of stripes) {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(cx, cy, x1, y1);
      ctx.stroke();
    }
    // Forked branches on select rib stripes
    for (const [fx, fy, tx, ty] of [[-15, -3, -11, 5], [-4, -2, 0, 5], [7, -4, 11, 4]]) {
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(tx, ty);
      ctx.stroke();
    }
    ctx.restore();

    // Near-side muscular legs with white paws
    drawBigCatLeg(-20, 5, true, stride * 6.5, a.color, '#f5ebd8');
    drawBigCatLeg(18, 5, false, strideOpp * 6.5, a.color, '#f5ebd8');

    // Leg stripes on upper thigh & foreleg
    ctx.strokeStyle = '#18120f';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(-23, 8); ctx.lineTo(-17, 10);
    ctx.moveTo(-22, 12); ctx.lineTo(-17, 13.5);
    ctx.moveTo(15, 9); ctx.lineTo(20, 10.5);
    ctx.stroke();

    // Powerful neck & sculpted feline head (not a round house-cat circle)
    const headBob = Math.sin(t * 5.8 + a.phase) * 0.9;
    ctx.save();
    ctx.translate(27, -8 + headBob);

    // Rounded black ears with white tiger ear-spots
    ctx.fillStyle = '#18120f';
    ctx.beginPath();
    ctx.arc(-4, -9.5, 3.6, 0, Math.PI * 2);
    ctx.arc(2.5, -9, 3.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f6ecda';
    ctx.beginPath();
    ctx.arc(-4, -9.5, 1.4, 0, Math.PI * 2);
    ctx.fill();

    // Skull, forward-jutting muzzle, and strong jaw
    ctx.fillStyle = a.color;
    ctx.beginPath();
    ctx.moveTo(-8, -5);
    ctx.bezierCurveTo(-5, -10.5, 4, -10, 8, -5.5);
    // Bridge of nose to snout tip
    ctx.lineTo(14.5, -2);
    // Upper lip & muzzle
    ctx.quadraticCurveTo(15, 2.5, 11, 3.5);
    // Chin & cheek ruff
    ctx.quadraticCurveTo(6, 5, 1, 5.5);
    ctx.quadraticCurveTo(-6, 6, -8, 2);
    ctx.closePath();
    ctx.fill();

    // White cheek ruff, muzzle pad & eyebrow patch
    ctx.fillStyle = '#f6ecda';
    ctx.beginPath();
    ctx.moveTo(-3, 0.5);
    ctx.quadraticCurveTo(4, -0.5, 12.5, 0);
    ctx.quadraticCurveTo(13, 3.5, 8, 4.5);
    ctx.quadraticCurveTo(0, 6.5, -5, 3.5);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(4.5, -5.5, 2.2, 1.1, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Cheek & forehead stripes
    ctx.strokeStyle = '#18120f';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(-2, -7.5); ctx.lineTo(1, -4.5);
    ctx.moveTo(-4, -1); ctx.quadraticCurveTo(-1, 1.5, 2, 3.5);
    ctx.moveTo(-1, -1.5); ctx.quadraticCurveTo(2, 1, 5, 2.8);
    ctx.stroke();

    // Fierce amber eye with dark feline liner
    ctx.fillStyle = '#18120f';
    ctx.beginPath();
    ctx.ellipse(5, -3.5, 2.1, 1.5, -0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f5ca48';
    ctx.beginPath();
    ctx.arc(5.1, -3.5, 1.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#18120f';
    ctx.beginPath();
    ctx.arc(5.3, -3.5, 0.55, 0, Math.PI * 2);
    ctx.fill();
    glint(5.6, -3.9, 0.32);

    // Whiskers
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(11.5, 1.6); ctx.lineTo(17.5, 1.2);
    ctx.moveTo(11.5, 2.2); ctx.lineTo(17.2, 3.6);
    ctx.moveTo(11, 2.8); ctx.lineTo(16, 5.6);
    ctx.stroke();

    // Pinkish-dark tiger nose leather
    ctx.fillStyle = '#2b1d19';
    ctx.beginPath();
    ctx.moveTo(14.5, -2);
    ctx.lineTo(12, -0.5);
    ctx.lineTo(13.5, 1);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  function drawLeopard(a, t) {
    const isBlack = !!a.black;
    const stride = Math.sin(t * 6.2 + a.phase) * gaitAmp;
    const strideOpp = Math.sin(t * 6.2 + a.phase + Math.PI) * gaitAmp;
    const sway = Math.sin(t * 2.4 + a.phase) * 2.5;

    drawShadow(35, 5.5, 25);

    const farLegColor = isBlack ? '#101217' : '#9e7432';
    const pawColor = isBlack ? '#232630' : '#dfc18b';

    // Far-side legs
    drawBigCatLeg(-20, 5, true, strideOpp * 6, farLegColor, pawColor);
    drawBigCatLeg(16, 5, false, stride * 6, farLegColor, pawColor);

    // Long, heavy, low-slung leopard balance tail (sweeps down then curls up at tip)
    ctx.lineCap = 'round';
    ctx.strokeStyle = a.color;
    ctx.lineWidth = 4.8;
    ctx.beginPath();
    ctx.moveTo(-27, -6);
    ctx.bezierCurveTo(-39, -1, -46, 9, -56, 1 + sway);
    ctx.stroke();

    // Pale underside near tail tip on golden leopard, dark tip on both
    ctx.fillStyle = isBlack ? '#0d0e12' : '#261b12';
    ctx.beginPath();
    ctx.arc(-56, 1 + sway, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Sleek, low-slung panthera body contour
    ctx.save();
    traceBigCatBody(ctx, false);
    ctx.fillStyle = coat(a.color, -17, 12, 0.14, 0.22);
    ctx.fill();
    ctx.clip();

    if (isBlack) {
      // Sleek slate-blue muscle sheen along back and shoulder of Black Leopard
      ctx.fillStyle = '#2b303c';
      ctx.beginPath();
      ctx.ellipse(-2, -10, 26, 4.5, -0.04, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Warm tawny dorsal tone & pale cream belly on Indian Leopard
      ctx.fillStyle = '#b98538';
      ctx.fillRect(-34, -16, 68, 5);
      ctx.fillStyle = '#f2e4c6';
      ctx.beginPath();
      ctx.ellipse(-2, 9.5, 25, 4.5, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Natural staggered leopard rosettes (broken dark rings around warm centers)
    const rosettes = [
      [-22, -6], [-16, -9], [-15, -2], [-9, -7], [-8, 0],
      [-2, -9], [-1, -2], [5, -8], [6, -1], [12, -9],
      [13, -2], [19, -7], [18, 0], [-19, 2], [-4, 4], [9, 4]
    ];
    for (const [rx, ry] of rosettes) {
      ctx.fillStyle = isBlack ? '#14161c' : '#8f5d22';
      ctx.beginPath();
      ctx.arc(rx, ry, 2.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = isBlack ? '#0b0c10' : '#24180e';
      ctx.lineWidth = 1.45;
      ctx.beginPath();
      ctx.arc(rx, ry, 2.2, 0.2, Math.PI * 1.45);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(rx, ry, 2.2, Math.PI * 1.65, Math.PI * 2.05);
      ctx.stroke();
    }
    ctx.restore();

    // Near-side muscular legs
    drawBigCatLeg(-19, 5, true, stride * 6.2, a.color, pawColor);
    drawBigCatLeg(17, 5, false, strideOpp * 6.2, a.color, pawColor);

    // Solid spots on upper legs
    ctx.fillStyle = isBlack ? '#0b0c10' : '#24180e';
    for (const [sx, sy] of [[-21, 9], [-18, 12], [-20, 15], [16, 9], [18, 12], [17, 15]]) {
      ctx.beginPath();
      ctx.arc(sx, sy, 1.3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Sculpted panthera head with forward muzzle & jaw
    const headBob = Math.sin(t * 6.2 + a.phase) * 0.8;
    ctx.save();
    ctx.translate(27, -7.5 + headBob);

    // Rounded ears
    ctx.fillStyle = isBlack ? '#0e1014' : '#261a10';
    ctx.beginPath();
    ctx.arc(-4, -8.8, 3.2, 0, Math.PI * 2);
    ctx.arc(2, -8.5, 3, 0, Math.PI * 2);
    ctx.fill();

    // Feline skull, elongated snout & jaw
    ctx.fillStyle = a.color;
    ctx.beginPath();
    ctx.moveTo(-8, -4.5);
    ctx.bezierCurveTo(-5, -9.8, 4, -9.2, 8, -5);
    ctx.lineTo(14, -1.5);
    ctx.quadraticCurveTo(14.5, 2.5, 10.5, 3.2);
    ctx.quadraticCurveTo(5, 4.2, -1, 3.8);
    ctx.quadraticCurveTo(-6, 3.8, -8, 1);
    ctx.closePath();
    ctx.fill();

    if (!isBlack) {
      ctx.fillStyle = '#f2e4c6';
      ctx.beginPath();
      ctx.ellipse(9, 1.8, 4.2, 1.8, -0.05, 0, Math.PI * 2);
      ctx.fill();
    }

    // Piercing golden-green panther eye
    ctx.fillStyle = '#0e0d0c';
    ctx.beginPath();
    ctx.ellipse(5, -3.2, 2.1, 1.45, -0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = isBlack ? '#dce85a' : '#e5c44e';
    ctx.beginPath();
    ctx.arc(5.1, -3.2, 1.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0e0d0c';
    ctx.beginPath();
    ctx.arc(5.3, -3.2, 0.55, 0, Math.PI * 2);
    ctx.fill();
    glint(5.6, -3.6, 0.32);

    // Whiskers
    ctx.strokeStyle = isBlack ? 'rgba(200,205,215,0.45)' : 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(11, 1.4); ctx.lineTo(17, 1);
    ctx.moveTo(11, 2); ctx.lineTo(16.6, 3.4);
    ctx.moveTo(10.5, 2.5); ctx.lineTo(15.4, 5.2);
    ctx.stroke();

    // Nose tip
    ctx.fillStyle = '#1c1513';
    ctx.beginPath();
    ctx.arc(13.2, -1, 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawBear(a, t) {
    drawShadow(26, 5.5, 22);
    drawLegs([-15, -7, 8, 15], 7, 21, t, a.phase, '#1a1716', 5);

    // Shaggy coat & rounded back
    ctx.fillStyle = coat(a.color, -19, 14, 0.2);
    ctx.beginPath();
    ctx.ellipse(0, -1, 25, 15, 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-4, -9, 16, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Long, untidy fur catching the light along the back and hanging under the belly
    ctx.lineCap = 'round';
    ctx.lineWidth = 1.1;
    ctx.strokeStyle = shadeHex(a.color, 0.24);
    ctx.beginPath();
    for (let i = 0; i < 14; i++) {
      const ang = Math.PI * (1.08 + i * 0.062);
      const fx = -3 + Math.cos(ang) * 21, fy = -6 + Math.sin(ang) * 12;
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx - 2.6, fy - 2.4);
    }
    ctx.stroke();
    ctx.strokeStyle = shadeHex(a.color, -0.4);
    ctx.beginPath();
    for (let i = 0; i < 9; i++) {
      const fx = -18 + i * 4.5, drop = Math.abs(i - 4) * 0.7;
      ctx.moveTo(fx, 11.5 - drop);
      ctx.lineTo(fx - 1.5, 15.5 - drop);
    }
    ctx.stroke();

    // Cream V-shaped chest mark (visible on front shoulder)
    ctx.strokeStyle = '#ead9b7';
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(14, 0);
    ctx.lineTo(18, 6);
    ctx.lineTo(21, 1);
    ctx.stroke();

    // Head & furry ears
    ctx.fillStyle = a.color;
    ctx.beginPath();
    ctx.arc(21, -4, 9.5, 0, Math.PI * 2);
    ctx.arc(17, -12, 4.2, 0, Math.PI * 2);
    ctx.arc(23, -12, 3.8, 0, Math.PI * 2);
    ctx.fill();

    // Long pale sloth bear snout
    ctx.fillStyle = '#cbb899';
    ctx.beginPath();
    ctx.ellipse(29, -2, 6.5, 4.5, 0.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#171413';
    ctx.beginPath();
    ell(34, -2.5, 1.8, 1.8, 0);
    ell(24, -6, 1.3, 1.3, 0);
    ctx.fill();
    glint(24.4, -6.4, 0.4);
  }

  function drawHornbill(a, t) {
    const isGreat = a.sub === 'great' || a.name.includes('Great');
    const flap = Math.sin(t * 10 + a.phase) * 11;

    // Long banded tail
    ctx.fillStyle = isGreat ? '#f2eee1' : '#656760';
    ctx.beginPath();
    ctx.moveTo(-12, 0);
    ctx.lineTo(-34, 4);
    ctx.lineTo(-32, 10);
    ctx.lineTo(-10, 4);
    ctx.closePath();
    ctx.fill();

    if (isGreat) {
      ctx.fillStyle = '#1c1e1c';
      ctx.fillRect(-27, 3, 5, 6);
    }

    // Far wing, seen behind the body
    ctx.fillStyle = isGreat ? '#121412' : '#585a53';
    ctx.beginPath();
    ctx.moveTo(-3, -2);
    ctx.quadraticCurveTo(7, -15 - flap * 0.85, 16, -6 - flap * 0.5);
    ctx.quadraticCurveTo(6, 0, -3, -2);
    ctx.fill();

    // Body & neck
    ctx.fillStyle = coat(a.color, -9, 9, 0.2);
    ctx.beginPath();
    ctx.ellipse(0, 0, 15, 8.5, -0.08, 0, Math.PI * 2);
    ctx.fill();

    if (isGreat) {
      ctx.fillStyle = '#f2ead3';
      ctx.beginPath();
      ctx.arc(11, -5, 6.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Broad wings with white band on Great Indian hornbill
    ctx.fillStyle = isGreat ? '#1d201e' : '#6d6f67';
    ctx.beginPath();
    ctx.moveTo(-6, -1);
    ctx.quadraticCurveTo(2, -18 - flap, 12, -4 - flap * 0.6);
    ctx.quadraticCurveTo(3, 2, -6, -1);
    ctx.fill();

    if (isGreat) {
      ctx.strokeStyle = '#f4efe2';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(-2, -6 - flap * 0.4);
      ctx.lineTo(9, -4 - flap * 0.5);
      ctx.stroke();
    }

    // Large curved bill & casque
    ctx.fillStyle = isGreat ? '#e8bd46' : '#c9be9c';
    ctx.beginPath();
    ctx.moveTo(15, -8);
    ctx.quadraticCurveTo(27, -7, 31, -1);
    ctx.quadraticCurveTo(23, -2, 15, -3);
    ctx.closePath();
    ctx.fill();

    // Casque on top of bill
    ctx.fillStyle = isGreat ? '#d99f2b' : '#595a53';
    ctx.beginPath();
    ctx.ellipse(20, -9.5, isGreat ? 6 : 4, isGreat ? 2.8 : 1.8, 0.1, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#1a1917';
    ctx.beginPath();
    ctx.arc(13, -6, 1.3, 0, Math.PI * 2);
    ctx.fill();
    glint(13.4, -6.4, 0.4);
  }

  function drawIbis(a, t) {
    const flap = Math.sin(t * 11 + a.phase) * 9;

    // Trailing legs in flight
    ctx.strokeStyle = '#5c4b43';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(-11, 3);
    ctx.lineTo(-22, 6);
    ctx.stroke();

    // Far wing, seen behind the body
    ctx.fillStyle = '#211e1d';
    ctx.beginPath();
    ctx.moveTo(-2, -1);
    ctx.quadraticCurveTo(5, -13 - flap * 0.85, 13, -4 - flap * 0.45);
    ctx.closePath();
    ctx.fill();

    // Glossy dark body & outstretched neck
    ctx.fillStyle = coat(a.color, -7, 7, 0.24);
    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 6.5, -0.05, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = a.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(10, -1);
    ctx.lineTo(20, -4);
    ctx.stroke();

    // Wing
    ctx.fillStyle = '#2d2927';
    ctx.beginPath();
    ctx.moveTo(-5, 0);
    ctx.quadraticCurveTo(1, -15 - flap, 10, -3 - flap * 0.5);
    ctx.closePath();
    ctx.fill();

    // Characteristic long down-curved ibis bill
    ctx.strokeStyle = '#9c7d65';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(21, -4);
    ctx.quadraticCurveTo(30, -3, 33, 4);
    ctx.stroke();
  }

  function drawWildDog(a, t) {
    // Indian wild dog (dhole): lean rufous body, pale chest, rounded ears, dark bushy tail
    drawShadow(22, 4, 22);
    drawLegs([-14, -8, 9, 14], 5, 21, t, a.phase, '#8f4220', 2.8);

    // Bushy black tail carried low
    const sway = Math.sin(t * 3 + a.phase) * 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#2a1c16';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-20, -2);
    ctx.quadraticCurveTo(-29, 2, -32, 10 + sway);
    ctx.stroke();
    ctx.strokeStyle = a.color;
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(-18, -4);
    ctx.lineTo(-23, -1);
    ctx.stroke();

    // Lean body with deep chest and tucked waist
    ctx.fillStyle = coat(a.color, -11, 8, 0.16, 0.26);
    ctx.beginPath();
    ctx.moveTo(18, -8);
    ctx.bezierCurveTo(10, -11, -6, -10, -19, -7);
    ctx.bezierCurveTo(-24, -4, -22, 3, -17, 5);
    ctx.bezierCurveTo(-8, 3, 2, 7, 12, 7);
    ctx.bezierCurveTo(18, 6, 21, 0, 18, -8);
    ctx.fill();

    // Pale chest and belly
    ctx.fillStyle = '#e6c9a0';
    ctx.beginPath();
    ctx.ellipse(8, 5, 9, 2.6, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // Neck and head
    ctx.fillStyle = a.color;
    ctx.beginPath();
    ctx.moveTo(12, -8);
    ctx.lineTo(19, -16);
    ctx.lineTo(26, -11);
    ctx.lineTo(19, 1);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(23, -13, 6.5, 5, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // Short dark muzzle and pale throat
    ctx.fillStyle = '#3b2419';
    ctx.beginPath();
    ctx.moveTo(27, -15.5);
    ctx.lineTo(34, -12);
    ctx.lineTo(33, -9);
    ctx.lineTo(26, -9.5);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#e6c9a0';
    ctx.beginPath();
    ctx.ellipse(24, -8.5, 3.5, 1.8, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Large rounded ears
    ctx.fillStyle = a.color;
    ctx.beginPath();
    ctx.ellipse(19, -19, 3.2, 4.8, -0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e9d3b0';
    ctx.beginPath();
    ctx.ellipse(19.3, -18.6, 1.6, 2.9, -0.25, 0, Math.PI * 2);
    ctx.fill();

    // Eye and nose
    ctx.fillStyle = '#17110e';
    ctx.beginPath();
    ell(25.5, -14, 1.1, 1.1, 0);
    ell(34, -11.2, 1.2, 1.2, 0);
    ctx.fill();
    glint(25.8, -14.3, 0.35);
  }

  // ---- Small wildlife, only drawn through the binoculars ----

  function drawRabbit(a, t) {
    // Indian hare: long black-tipped ears, pale belly, white scut, long hind feet
    const c = a.color;
    const hop = a.moving ? Math.abs(Math.sin(t * 7 + a.phase)) : 0;
    const reach = a.moving ? Math.sin(t * 7 + a.phase) * 2.5 : 0;
    drawShadow(11, 2.4, 9);
    ctx.translate(0, -hop * 3.5);

    // Hind leg with its long foot, and the slim foreleg
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = shadeHex(c, -0.25);
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(-6, 4);
    ctx.lineTo(-8 - reach, 8.2);
    ctx.lineTo(-3 - reach, 8.8);
    ctx.stroke();
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(6, 4);
    ctx.lineTo(7 + reach, 8.8);
    ctx.stroke();

    // White scut
    ctx.fillStyle = '#f4ead8';
    ctx.beginPath();
    ctx.ellipse(-11.5, -1, 2.4, 2.2, 0, 0, TAU);
    ctx.fill();

    // Rounded haunch and body
    ctx.fillStyle = coat(c, -8, 7);
    ctx.beginPath();
    ell(-4, 0.5, 7.5, 6.5, 0);
    ell(3, 0, 8, 5, -0.15);
    ctx.fill();
    ctx.fillStyle = '#e9dcc3';
    ctx.beginPath();
    ctx.ellipse(1, 4.2, 7, 1.8, 0, 0, Math.PI);
    ctx.fill();

    // Head, lowered a little while nibbling
    ctx.save();
    ctx.translate(10, -5 + (a.headDrop ? 4 : 0));
    const twitch = Math.sin(t * 2.3 + a.phase) * 0.08;
    const ear = (bx, ang, len, col, near) => {
      ctx.save();
      ctx.translate(bx, -2.5);
      ctx.rotate(ang);
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.ellipse(0, -len / 2, 1.7, len / 2, 0, 0, TAU);
      ctx.fill();
      if (near) {
        ctx.fillStyle = '#d9a99a';
        ctx.beginPath();
        ctx.ellipse(0.1, -len / 2 + 0.6, 0.8, len / 2 - 1.6, 0, 0, TAU);
        ctx.fill();
      }
      ctx.fillStyle = '#2a211b';
      ctx.beginPath();
      ctx.ellipse(0, -len + 1.3, 1.25, 1.5, 0, 0, TAU);
      ctx.fill();
      ctx.restore();
    };
    ear(-2.2, -0.42 + twitch, 11, shadeHex(c, -0.2), false);
    ear(-0.4, -0.16 + twitch, 12, c, true);

    ctx.fillStyle = coat(c, -5, 4);
    ctx.beginPath();
    ctx.ellipse(0, 0, 4.6, 3.8, 0.15, 0, TAU);
    ctx.fill();
    ctx.fillStyle = '#d9c7a6';
    ctx.beginPath();
    ctx.ellipse(2.2, 1.4, 2.2, 1.5, 0, 0, TAU);
    ctx.fill();
    ctx.fillStyle = '#1a1410';
    ctx.beginPath();
    ctx.arc(1.2, -0.9, 1, 0, TAU);
    ctx.fill();
    glint(1.5, -1.2, 0.35);
    ctx.fillStyle = '#5a3f35';
    ctx.beginPath();
    ctx.arc(4.5, 0.3, 0.6, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth = 0.35;
    ctx.beginPath();
    ctx.moveTo(4, 1); ctx.lineTo(7.5, 0.4);
    ctx.moveTo(4, 1.3); ctx.lineTo(7.3, 2.2);
    ctx.stroke();
    ctx.restore();
  }

  function drawMongoose(a, t) {
    // Indian grey mongoose: long low grizzled body, pointed snout, thick tapering tail
    const c = a.color;
    const sway = Math.sin(t * 3 + a.phase) * 1.5;
    drawShadow(16, 2.4, 8);

    // Tail carried low with a paler tip
    ctx.fillStyle = shadeHex(c, -0.12);
    ctx.beginPath();
    ctx.moveTo(-11, -2.5);
    ctx.quadraticCurveTo(-22, -3, -31, 3 + sway);
    ctx.quadraticCurveTo(-21, 2.5, -11, 3);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = shadeHex(c, 0.35);
    ctx.beginPath();
    ctx.ellipse(-29.5, 2.8 + sway * 0.95, 1.8, 0.8, -0.3, 0, TAU);
    ctx.fill();

    // Short quick legs
    ctx.lineCap = 'round';
    ctx.lineWidth = 2.1;
    [-6, 7, -9, 10].forEach((lx, i) => {
      const sw = Math.sin(t * 9 + a.phase + i * 1.6) * 2.6 * gaitAmp;
      ctx.strokeStyle = shadeHex(c, i < 2 ? -0.5 : -0.35);
      ctx.beginPath();
      ctx.moveTo(lx, 3);
      ctx.lineTo(lx + sw, 8);
      ctx.stroke();
    });

    // Long body with a fuller rump
    ctx.fillStyle = coat(c, -6, 5.5);
    ctx.beginPath();
    ell(0, 0, 13, 5, -0.04);
    ell(-7, 0.3, 6, 5.4, 0);
    ctx.fill();

    // Grizzled, salt-and-pepper fur
    ctx.strokeStyle = 'rgba(240,235,220,0.3)';
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    for (let i = 0; i < 12; i++) {
      const gx = -11 + i * 2, gy = -2.5 + (i % 3) * 1.6;
      ctx.moveTo(gx, gy);
      ctx.lineTo(gx - 1.4, gy + 0.5);
    }
    ctx.stroke();

    // Neck and pointed head
    ctx.save();
    ctx.translate(13, -2 + (a.headDrop ? 5 : 0));
    ctx.fillStyle = coat(c, -5, 4);
    ctx.beginPath();
    ctx.moveTo(-4, -3);
    ctx.quadraticCurveTo(1, -4.6, 4, -2.6);
    ctx.lineTo(9.5, 0.6);
    ctx.quadraticCurveTo(8, 2.4, 3, 2.6);
    ctx.quadraticCurveTo(-2, 3.4, -4, 2.5);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = shadeHex(c, -0.3);
    ctx.beginPath();
    ctx.ellipse(-0.5, -3.2, 1.5, 1.1, 0, 0, TAU);
    ctx.fill();
    ctx.fillStyle = '#2a1710';
    ctx.beginPath();
    ctx.arc(3.2, -1.2, 0.8, 0, TAU);
    ctx.fill();
    glint(3.45, -1.45, 0.28);
    ctx.fillStyle = '#3b2a25';
    ctx.beginPath();
    ctx.arc(9.3, 0.6, 0.7, 0, TAU);
    ctx.fill();
    ctx.restore();
  }

  function drawSmallBird(a, t) {
    // Jungle babbler (grey-brown, pale eye, yellowish bill) or Indian pitta (green back, buff belly, bold eye stripe)
    const pitta = a.sub === 'pitta';
    const hop = a.moving ? Math.abs(Math.sin(t * 9 + a.phase)) * 2.6 : 0;
    const peck = a.headDrop ? (Math.sin(t * 6 + a.phase) > 0 ? 3 : 0.8) : 0;
    const flick = Math.sin(t * 4 + a.phase) * 0.8;
    const body = a.color;
    drawShadow(6, 1.4, 6.5);
    ctx.translate(0, -hop);

    // Thin legs and toes
    ctx.strokeStyle = pitta ? '#c9a08e' : '#b9a36a';
    ctx.lineWidth = 0.8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-0.8, 3); ctx.lineTo(-1.2, 6.4); ctx.lineTo(0.4, 6.4);
    ctx.moveTo(1.2, 3); ctx.lineTo(1.4, 6.4); ctx.lineTo(3, 6.4);
    ctx.stroke();

    // Tail: long and loose on the babbler, a short blue stub on the pitta
    ctx.fillStyle = pitta ? '#2c5f8a' : '#6b6054';
    ctx.beginPath();
    ctx.moveTo(-4, -0.8);
    ctx.lineTo(pitta ? -7.5 : -11.5, (pitta ? 1.4 : 2) + flick);
    ctx.lineTo(-4, 2.2);
    ctx.closePath();
    ctx.fill();

    // Body, underparts, and folded wing
    ctx.fillStyle = coat(body, -4.5, 4.5);
    ctx.beginPath();
    ctx.ellipse(0, 0, 5.6, 4, -0.2, 0, TAU);
    ctx.fill();
    ctx.fillStyle = pitta ? '#e0b673' : '#b7a78d';
    ctx.beginPath();
    ctx.ellipse(0.8, 1.5, 4.3, 2.3, -0.15, 0, Math.PI);
    ctx.fill();
    ctx.fillStyle = pitta ? '#3f7a45' : '#73685a';
    ctx.beginPath();
    ctx.ellipse(-1.2, -0.4, 3.8, 2.3, 0.15, 0, TAU);
    ctx.fill();
    if (pitta) {
      ctx.fillStyle = '#3aa0c8';
      ctx.beginPath();
      ctx.ellipse(0.4, -1.2, 1.4, 0.9, 0.2, 0, TAU);
      ctx.fill();
      ctx.fillStyle = '#c8473a';
      ctx.beginPath();
      ctx.ellipse(-2.6, 2.7, 1.6, 0.9, 0.2, 0, TAU);
      ctx.fill();
    }

    // Head, dipping to peck while feeding
    ctx.save();
    ctx.translate(4.6, -3 + peck);
    ctx.rotate(peck * 0.12);
    ctx.fillStyle = pitta ? '#b58a4d' : '#93877a';
    ctx.beginPath();
    ctx.arc(0, 0, 2.9, 0, TAU);
    ctx.fill();
    ctx.fillStyle = pitta ? '#2a2420' : '#d9c36a';
    ctx.beginPath();
    ctx.moveTo(2.4, -0.8);
    ctx.lineTo(6, 0.2);
    ctx.lineTo(2.4, 1);
    ctx.closePath();
    ctx.fill();
    if (pitta) {
      ctx.fillStyle = '#f3ead4';
      ctx.beginPath();
      ctx.ellipse(0.9, 1.5, 1.9, 1, 0.1, 0, TAU);
      ctx.fill();
      ctx.strokeStyle = '#f0e2bd';
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(-2.4, -1.4); ctx.lineTo(2.2, -1.6);
      ctx.stroke();
      ctx.strokeStyle = '#161412';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(-2.6, -0.2); ctx.lineTo(2.5, -0.4);
      ctx.stroke();
      glint(1.2, -0.6, 0.28);
    } else {
      ctx.fillStyle = '#f1ecd9';
      ctx.beginPath();
      ctx.arc(1, -0.6, 0.85, 0, TAU);
      ctx.fill();
      ctx.fillStyle = '#1a1613';
      ctx.beginPath();
      ctx.arc(1.1, -0.6, 0.42, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawAnimal(a, t) {
    const still = !a.moving && !a.fly;
    const acting = a.state === 'act' && still && !a.pose;
    const lying = acting && (a.activity === 'sit' || a.activity === 'rest');
    const headLow = acting && (a.activity === 'graze' || (a.activity === 'drink' && a.atSpot));
    a.headDrop = headLow ? 36 : (acting && a.activity === 'rest') ? 9 : 0;
    gaitAmp = still ? 0 : 1;
    // Running animals (fleeing prey, hunting pack) cycle their legs faster
    const tt = (a.state === 'flee' || a.fast) && a.moving ? t * 2.1 : t;

    ctx.save();
    ctx.translate(a.x, a.y);
    ctx.scale(a.dir * a.scale, a.scale);
    const bob = a.fly ? Math.sin(t * 5 + a.phase) * 3.5 : still ? Math.sin(t * 1.4 + a.phase) * 0.4 : Math.sin(tt * 3.2 + a.phase) * 1.6;
    ctx.translate(0, bob);
    ctx.globalAlpha = 1;

    if (lying) {
      // Lying down: settle the body onto the ground and tuck the legs out of sight
      const feet = FEET_Y[a.kind] || 22;
      ctx.fillStyle = 'rgba(18, 32, 22, 0.28)';
      ctx.beginPath();
      ctx.ellipse(0, feet, 30, 4.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.rect(-95, -95, 190, 95 + feet + 1);
      ctx.clip();
      ctx.translate(0, feet * 0.45);
    } else if (headLow && a.kind !== 'deer' && a.kind !== 'elephant') {
      // Lean forward so the head reaches the ground (deer lower their neck instead)
      ctx.rotate((a.kind === 'peacock' ? 0.24 : 0.13) + Math.sin(t * 1.5 + a.phase) * 0.02);
    }

    t = tt;
    if (a.kind === 'deer') drawDeer(a, t);
    else if (a.kind === 'boar') drawBoar(a, t);
    else if (a.kind === 'gaur') drawGaur(a, t);
    else if (a.kind === 'peacock') drawPeacock(a, t);
    else if (a.kind === 'elephant') drawElephant(a, t);
    else if (a.kind === 'tiger') drawTiger(a, t);
    else if (a.kind === 'leopard') drawLeopard(a, t);
    else if (a.kind === 'bear') drawBear(a, t);
    else if (a.kind === 'hornbill') drawHornbill(a, t);
    else if (a.kind === 'ibis') drawIbis(a, t);
    else if (a.kind === 'wildDog') drawWildDog(a, t);
    else if (a.kind === 'rabbit') drawRabbit(a, t);
    else if (a.kind === 'mongoose') drawMongoose(a, t);
    else if (a.kind === 'smallBird') drawSmallBird(a, t);

    ctx.restore();
  }

  // ---- Creature lifecycle: enter -> act (linger) or cross (pass through) -> exit; flee when a predator appears ----

  function moveToward(a, tx, ty, spd, dt) {
    const dx = tx - a.x, dy = ty - a.y, d = Math.hypot(dx, dy);
    const step = spd * dt;
    if (Math.abs(dx) > 2) a.dir = dx > 0 ? 1 : -1;
    if (d <= step || d < 0.5) { a.x = tx; a.y = ty; return true; }
    a.x += dx / d * step;
    a.y += dy / d * step;
    a.moving = true;
    return false;
  }

  function startActivity(a) {
    const list = ACTIVITIES[a.kind] || ['wait', 'walk'];
    const act = list[Math.floor(Math.random() * list.length)];
    a.activity = act;
    a.atSpot = false;
    a.actTimer = act === 'walk' ? rand(5, 9) : (act === 'sit' || act === 'rest') ? rand(12, 24) : rand(6, 14);
    if (act === 'walk') {
      a.tx = clamp(a.homeX + rand(-70, 70), w * 0.06, w * 0.94);
      a.ty = groundY(a.homeY + rand(-14, 14));
    } else if (act === 'drink') {
      const p = pond();
      const side = a.x < p.x ? -1 : 1;
      a.tx = p.x + side * (p.rx + 24 * a.scale + rand(-4, 10));
      a.ty = groundY(p.y + rand(-5, 8));
    }
  }

  function beginAct(a) {
    a.state = 'act';
    if (a.perform) {
      a.pose = a.perform;
      a.activity = 'perform';
    } else {
      startActivity(a);
    }
  }

  function beginExit(a) {
    a.state = 'exit';
    a.pose = null;
    a.activity = 'walk';
    if (a.exitSide === 2) {
      // Walk down into the foreground vegetation and out of the bottom of the view
      a.tx = a.x + rand(-50, 50);
      a.ty = h + 70;
    } else {
      a.tx = a.exitSide < 0 ? -edgeOf(a) - rand(0, 30) : w + edgeOf(a) + rand(0, 30);
      a.ty = groundY(a.y + rand(-16, 16));
    }
  }

  // Prey bolt away from the predator's position; birds and tuskers stay where they are
  function triggerFlee(px) {
    let any = false;
    for (const c of creatures) {
      if (!isPrey(c) || c.state === 'flee') continue;
      const side = c.x >= px ? 1 : -1;
      c.state = 'flee';
      c.pose = null;
      c.activity = 'flee';
      c.wait = rand(0.05, 0.6);
      c.tx = side > 0 ? w + edgeOf(c) + rand(0, 60) : -edgeOf(c) - rand(0, 60);
      c.ty = groundY(c.y + rand(-22, 22));
      c.runSpeed = rand(95, 135) * speedScale();
      if (!c.binocularOnly) any = true;
    }
    if (any && !testMode) {
      $('sightingHint').textContent = 'Alarm in the clearing';
      $('messageTitle').textContent = 'The forest stirs';
      $('messageText').textContent = 'Something has been scented on the breeze. The herd slips away into the trees.';
    }
  }

  function updateCreature(a, dt) {
    a.age += dt;
    a.moving = false;

    // A predator stepping into view startles any prey on screen
    if (a.predator && !a.alarmed && a.x > w * 0.03 && a.x < w * 0.97) {
      a.alarmed = true;
      triggerFlee(a.x);
    }

    if (a.state === 'enter') {
      if (moveToward(a, a.tx, a.ty, a.speed, dt)) beginAct(a);
    } else if (a.state === 'act') {
      if (elapsed >= a.leaveAt) { beginExit(a); return; }
      if (a.perform) return;
      if (a.activity === 'drink' && !a.atSpot) {
        if (moveToward(a, a.tx, a.ty, a.speed * 0.8, dt)) {
          a.atSpot = true;
          a.dir = a.x < pond().x ? 1 : -1;
          a.actTimer = rand(6, 11);
        }
        return;
      }
      if (a.activity === 'walk' && moveToward(a, a.tx, a.ty, a.speed * 0.7, dt)) a.activity = 'wait';
      a.actTimer -= dt;
      if (a.actTimer <= 0) startActivity(a);
    } else {
      // cross, exit, flee: keep going until fully off-screen, then leave the scene (no fade)
      if (a.wait > 0) { a.wait -= dt; return; }
      const spd = a.state === 'flee' ? a.runSpeed : a.speed;
      if (moveToward(a, a.tx, a.ty, spd, dt)) a.gone = true;
    }
  }

  // Event builders describe a formation on screen; stage it off-screen so it walks in naturally
  function stageEventGroup(group, gallery) {
    const movers = group.filter(c => !c.state && !c.perform);
    if (movers.length) {
      const dir = movers[0].dir;
      const lead = dir > 0 ? Math.max(...movers.map(c => c.x)) : Math.min(...movers.map(c => c.x));
      const shift = (dir > 0 ? -EDGE : w + EDGE) - lead;
      for (const c of movers) {
        c.x += shift;
        c.state = 'cross';
        c.tx = dir > 0 ? w + EDGE : -EDGE;
        c.ty = c.y;
      }
    }
    for (const c of group) {
      if (c.perform && !c.state) {
        // Performers walk in from behind their facing side, perform at their spot, then leave
        const side = c.dir > 0 ? -1 : 1;
        c.tx = c.homeX = c.x;
        c.ty = c.homeY = c.y;
        c.x = side < 0 ? -EDGE : w + EDGE;
        c.state = 'enter';
        c.leaveAt = elapsed + Math.abs(c.tx - c.x) / c.speed + (gallery ? 45 : c.stay);
        c.exitSide = c.perform === 'fight' ? side : (Math.random() < 0.5 ? -1 : 1);
      }
      c.alpha = 1;
      c.age = 0;
      c.moving = false;
    }
  }

  // Opening the window: the encounter is already in the clearing, not walking in from off-screen
  function presentInFrame(group) {
    const chasing = group.filter(c => c.state === 'flee' || c.fast);
    if (chasing.length) {
      const dir = chasing[0].dir || 1;
      const lead = dir > 0 ? Math.max(...chasing.map(c => c.x)) : Math.min(...chasing.map(c => c.x));
      const target = dir > 0 ? w * 0.42 : w * 0.58;
      const shift = target - lead;
      for (const c of chasing) c.x += shift;
    }
    for (const c of group) {
      c.alpha = 1;
      c.age = 0;
      c.moving = false;
      if (c.perform && !c.state) {
        c.homeX = c.x;
        c.homeY = c.y;
        c.leaveAt = elapsed + (c.stay || rand(16, 24));
        c.exitSide = c.perform === 'fight' ? (c.dir > 0 ? -1 : 1) : (Math.random() < 0.5 ? -1 : 1);
        c.state = 'act';
        c.pose = c.perform;
        c.activity = 'perform';
      } else if (!c.state) {
        c.state = 'cross';
        c.tx = (c.dir || 1) > 0 ? w + EDGE : -EDGE;
        c.ty = c.y;
      }
    }
  }

  function spawnEvent(forcedEv, opts = {}) {
    const ev = forcedEv || pickWeighted(events);
    const sc = Math.min(w / 850, 1.15);
    const group = ev.build(w, h, sc);
    if (opts.inFrame) presentInFrame(group);
    else stageEventGroup(group, !!opts.longLife);
    activeEvent = { name: ev.name, rarity: ev.rarity };
    creatures.push(...group);
    $('sightingHint').textContent = opts.testLabel || ev.hint;
    $('messageTitle').textContent = (opts.testLabel ? opts.testLabel + ' · ' : '') + ev.title + ' · ' + ev.rarity;
    $('messageText').textContent = opts.testHint || ev.text;
  }

  function spawnAnimal(forcedSpec, opts = {}) {
    const spec = forcedSpec || pickWeighted(animals);
    const sc = Math.min(w / 850, 1.15);
    const ss = speedScale();
    const fly = !!spec.fly;
    const gallery = !!opts.longLife;
    const count = spec.group ? Math.floor(rand(spec.group[0], spec.group[1] + 0.99)) : 1;

    // Behaviour mode: most ground animals linger; some simply pass through. Birds fly across.
    const inFrame = !!opts.inFrame;
    const linger = !fly && (gallery || spec.binocularOnly || inFrame || Math.random() < LINGER_CHANCE);
    const side = Math.random() < 0.5 ? -1 : 1;                             // -1 enters from the left, 1 from the right
    const fromBelow = linger && !gallery && !inFrame && Math.random() < 0.15; // sometimes walk up out of the foreground
    const exitRoll = Math.random();
    const exitSide = exitRoll < 0.4 ? -1 : exitRoll < 0.8 ? 1 : 2;          // 2 = leave downward into the vegetation

    // Clearing spot; herbivores like to settle near animals that are already there
    let homeX = rand(w * 0.22, w * 0.78);
    let homeY = rand(h * 0.65, h * 0.77);
    if (linger && !spec.predator) {
      const settled = creatures.filter(c => !c.fly && !c.predator && !c.binocularOnly && c.state === 'act');
      if (settled.length && Math.random() < 0.6) {
        const o = settled[Math.floor(Math.random() * settled.length)];
        homeX = clamp(o.x + (Math.random() < 0.5 ? -1 : 1) * rand(70, 140), w * 0.12, w * 0.88);
        homeY = groundY(o.y + rand(-18, 18));
      }
    }

    const speed = (fly ? rand(30, 42) : spec.predator ? rand(14, 19) : rand(16, 23)) * ss * (spec.speedMul || 1);
    const stay = gallery ? 40 : rand(22, 50);
    const skyY = rand(h * 0.22, h * 0.46);
    const skyDrift = rand(-h * 0.06, h * 0.06);
    const depthDrift = rand(-h * 0.06, h * 0.06);
    const eta = fromBelow ? (h + 60 - homeY) / speed : (side < 0 ? homeX + 60 : w + 60 - homeX) / speed;

    for (let i = 0; i < count; i++) {
      const a = {
        ...spec,
        phase: rand(0, 7),
        scale: spec.scale * (i === 0 ? 1 : rand(0.84, 1.04)) * sc,
        alpha: 1,
        age: 0,
        moving: false,
        speed: speed * rand(0.97, 1.03),
        dir: -side,
        hasAntlers: i === 0 || Math.random() < 0.45
      };
      const lag = i * rand(30, 46);                                       // followers trail the leader in
      const startX = side < 0 ? -edgeOf(a) - lag : w + edgeOf(a) + lag;
      const farX = side < 0 ? w + edgeOf(a) : -edgeOf(a);

      if (fly) {
        a.y = skyY + (i === 0 ? 0 : rand(-14, 14));
        a.state = 'cross';
        a.tx = farX;
        a.ty = a.y + skyDrift;
        a.x = inFrame
          ? clamp(rand(w * 0.16, w * 0.84) + (i - (count - 1) / 2) * 28, w * 0.08, w * 0.92)
          : startX;
      } else if (linger) {
        a.homeX = clamp(homeX + (i - (count - 1) / 2) * rand(30, 44), w * 0.06, w * 0.94);
        a.homeY = groundY(homeY + (i === 0 ? 0 : rand(-14, 16)));
        a.tx = a.homeX;
        a.ty = a.homeY;
        a.exitSide = exitSide;
        a.leaveAt = elapsed + (inFrame ? stay : eta + stay) + i * rand(0.3, 1.4);
        if (inFrame) {
          // Already in the clearing when the curtains rise
          a.x = a.homeX;
          a.y = a.homeY;
          beginAct(a);
        } else if (fromBelow) {
          a.x = a.homeX + rand(-30, 30);
          a.y = h + 60 + lag * 0.6;
          a.state = 'enter';
        } else {
          a.x = startX;
          a.y = groundY(a.homeY + rand(-10, 10));
          a.state = 'enter';
        }
      } else {
        // Pass straight through the clearing, drifting a little nearer or deeper as it goes
        a.y = groundY(homeY + (i === 0 ? 0 : rand(-14, 16)));
        a.state = 'cross';
        a.tx = farX;
        a.ty = groundY(a.y + depthDrift);
        a.x = inFrame ? clamp(rand(w * 0.18, w * 0.82), w * 0.1, w * 0.9) : startX;
      }
      creatures.push(a);
    }

    // Small wildlife slips in unannounced; it is there to be discovered through the binoculars
    if (opts.quiet) return;

    const groupNote = count > 1 ? ' (small group of ' + count + ')' : spec.bull ? ' (solitary bull)' : '';
    const hint = fly ? 'Wings across the canopy'
      : spec.predator ? 'Something moves along the treeline'
      : !linger ? 'Movement through the forest'
      : count > 1 ? 'A small herd settles in the glade' : 'A visitor lingers in the glade';
    $('sightingHint').textContent = opts.testLabel || hint;
    $('messageTitle').textContent = (opts.testLabel ? opts.testLabel + ' · ' : '') + spec.name + ' · ' + spec.rarity;
    $('messageText').textContent = opts.testHint || ('Take your time. Can you spot the ' + spec.name.toLowerCase() + groupNote + '?');
  }

  // Quiet gaps: usually short; sometimes a rare long hush (up to ~40s), very rarely up to ~120s
  function quietDelay() {
    const r = Math.random();
    return r < 0.78 ? rand(4, 12) : r < 0.95 ? rand(22, 40) : rand(60, 120);
  }

  // First look through the window: often quiet, sometimes wildlife is already there, rarely a special event
  function openingReveal() {
    const roll = Math.random();
    if (roll < 0.40) {
      $('sightingHint').textContent = 'Listen to the forest';
      $('messageTitle').textContent = 'The forest is waking up';
      $('messageText').textContent = 'You drew the curtains on a quiet clearing. Stay a while.';
    } else if (roll < 0.88) {
      spawnAnimal(pickWeighted(mainAnimals), { inFrame: true });
    } else {
      spawnEvent(undefined, { inFrame: true });
      eventCooldown = rand(28, 45);
    }
    if (Math.random() < 0.05 && !creatures.some(c => c.predator)) {
      spawnAnimal(pickWeighted(smallAnimals), { quiet: true, inFrame: true });
    }
    nextSpawn = rand(8, 14);
    nextSmall = rand(12, 24);
    wasEmpty = !hasMainAnimals();
  }

  function spawn() {
    const ground = creatures.filter(c => !c.fly && !c.binocularOnly);
    const predatorHere = creatures.some(c => c.predator);

    // Special events start when the forest is clear and the event cooldown has passed
    if (!hasMainAnimals() && eventCooldown <= 0 && Math.random() < 0.22) {
      spawnEvent();
      eventCooldown = rand(28, 45);
      return;
    }
    // A wild dog pack may also burst in on animals that are already in the clearing
    if (eventCooldown <= 0 && !predatorHere && ground.filter(isPrey).length >= 2 && Math.random() < 0.003) {
      spawnEvent(events.find(e => e.name === 'Wild Dog Pack Hunting'));
      eventCooldown = rand(28, 45);
      return;
    }

    const spec = pickWeighted(mainAnimals);
    // No newcomers wander in on top of a hunting predator
    if (predatorHere && isPrey(spec)) return;
    // The busier the clearing, the less likely another group joins (aligns with animal-count gathering tiers).
    // Predators and birds are less put off by a crowd, but stay within their rarity tier.
    // Does not override predator flee or event rules.
    const n = ground.length;
    const accept = n === 0 ? 1 : spec.fly ? 0.5 : spec.predator ? 0.4
      : n < 9 ? 0.14 : n < 16 ? 0.06 : n < 30 ? 0.03 : 0.015;
    if (Math.random() < accept) spawnAnimal(spec);
  }

  function showGalleryItem() {
    creatures = [];
    activeEvent = null;
    const list = testMode === '1A' ? animals : events;
    testIndex = ((testIndex % list.length) + list.length) % list.length;
    const label = 'Test ' + testIndex + '/' + (list.length - 1);
    const hint = 'Tap the scene for next · Capture also advances';
    if (testMode === '1A') {
      spawnAnimal(animals[testIndex], { longLife: true, testLabel: label, testHint: hint });
      showToast(label + ' · ' + animals[testIndex].name + ' · ' + animals[testIndex].rarity);
    } else {
      spawnEvent(events[testIndex], { longLife: true, testLabel: label, testHint: hint });
      showToast(label + ' · ' + events[testIndex].name + ' · ' + events[testIndex].rarity);
    }
    galleryHoldUntil = elapsed + 0.35;
  }

  function advanceGallery() {
    if (!testMode || elapsed < galleryHoldUntil) return;
    const list = testMode === '1A' ? animals : events;
    testIndex = (testIndex + 1) % list.length;
    // Keep deep-linkable index in the address bar without reloading
    const next = new URL(location.href);
    next.searchParams.set('test', testMode);
    next.searchParams.set('i', String(testIndex));
    history.replaceState(null, '', next);
    showGalleryItem();
  }

  // Paints the forest once. throughLens = the magnified view inside the binoculars, where small wildlife shows up.
  function drawScene(t, throughLens) {
    drawBackground(t, throughLens);
    for (const a of creatures) {
      // Small wildlife keeps moving even while it is too small to see without the binoculars
      if (!a.binocularOnly || throughLens || testMode) drawAnimal(a, t);
    }
    drawForegroundFoliage(t);
  }

  // Dark barrel, soft edge falloff, and a glint of glass around the binocular view
  function drawLens(R) {
    const edge = ctx.createRadialGradient(aim.x, aim.y, R * 0.7, aim.x, aim.y, R);
    edge.addColorStop(0, 'rgba(5,10,8,0)');
    edge.addColorStop(1, 'rgba(5,10,8,0.6)');
    ctx.fillStyle = edge;
    ctx.beginPath();
    ctx.arc(aim.x, aim.y, R, 0, TAU);
    ctx.fill();

    const rim = Math.max(5, R * 0.06);
    ctx.strokeStyle = '#0a0f0c';
    ctx.lineWidth = rim;
    ctx.beginPath();
    ctx.arc(aim.x, aim.y, R, 0, TAU);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(190,200,185,0.35)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(aim.x, aim.y, R - rim / 2, 0, TAU);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = R * 0.05;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(aim.x, aim.y, R * 0.84, -2.5, -1.6);
    ctx.stroke();
  }

  function draw(t, dt) {
    ctx.clearRect(0, 0, w, h);

    for (const a of creatures) updateCreature(a, dt);
    // Sort ground animals by Y depth so nearer ones draw in front
    creatures.sort((a, b) => a.y - b.y);

    drawScene(t, false);
    if (binoculars) {
      // Through the binoculars: the window dims to a faint outline for finding your bearings,
      // and a round, magnified patch of forest around the aim point comes into focus
      const R = lensRadius();
      ctx.fillStyle = 'rgba(5,10,8,0.84)';
      ctx.fillRect(0, 0, w, h);
      ctx.save();
      ctx.beginPath();
      ctx.arc(aim.x, aim.y, R, 0, TAU);
      ctx.clip();
      ctx.translate(aim.x, aim.y);
      ctx.scale(BINOC_ZOOM, BINOC_ZOOM);
      ctx.translate(-aim.x, -aim.y);
      drawScene(t, true);
      ctx.restore();
      drawLens(R);
    }

    // Animals leave by walking off-screen; nothing fades out (the age check is only a safety net)
    creatures = creatures.filter(a => !a.gone && a.age < 600);
    if (activeEvent && !creatures.some(c => c.isEvent)) activeEvent = null;

    // Noticing a small animal through the lens is its own quiet reward
    let found = null;
    if (binoculars && !testMode) {
      for (const c of creatures) {
        if (c.binocularOnly && inLens(c) && (!found || aimDist(c) < aimDist(found))) found = c;
      }
      if (found && (!lensFind || lensFind.name !== found.name)) {
        $('sightingHint').textContent = 'Spotted through the binoculars';
        $('messageTitle').textContent = found.name + ' · ' + found.rarity;
        $('messageText').textContent = 'A small visitor you would never have noticed with the naked eye.';
      }
    }
    lensFind = found;

    // Busy clearings: species and animal-count tiers (see gatheringOf); binoculars-only excluded
    const gather = gatheringOf(creatures.filter(c => inView(c)));
    const tier = gather.tier;
    if (tier > gatherTier && !activeEvent && !testMode) {
      const titles = {
        1: 'A lively gathering · Rare',
        2: 'A great gathering · Very rare',
        3: 'An extraordinary gathering · Legendary'
      };
      $('sightingHint').textContent = tier === 3 ? 'Life everywhere in the clearing'
        : tier === 2 ? 'The clearing is full of life' : 'A busy clearing';
      $('messageTitle').textContent = titles[tier];
      $('messageText').textContent = gather.animalCount + ' animals across ' + gather.speciesCount
        + ' species are sharing the view. Moments like this do not come often.';
    }
    gatherTier = tier;

    if (testMode) {
      // Keep the gallery item on show by bringing the same index back in after it leaves
      if (creatures.length === 0) showGalleryItem();
    } else if (!hasMainAnimals() && !lensFind) {
      if (elapsed > 8) {
        const hush = emptyFor >= 45 ? 'A very rare, deep stillness has settled over the forest.'
          : emptyFor >= 20 ? 'A rare hush. Even the forest is holding its breath.'
          : 'The forest has its own pace. Stay a while.';
        $('sightingHint').textContent = 'Listen to the forest';
        $('messageTitle').textContent = 'A quiet moment';
        $('messageText').textContent = hush;
      }
    }
  }

  function loop(ts) {
    const now = ts / 1000, dt = Math.min(0.05, now - last || 0);
    last = now;
    elapsed += dt;
    wind += dt;
    if (eventCooldown > 0) eventCooldown -= dt;

    if (!testMode) {
      // When the last animal leaves, choose how long the forest stays empty
      const empty = !hasMainAnimals();
      if (empty && !wasEmpty) { nextSpawn = quietDelay(); emptyFor = 0; }
      if (empty) emptyFor += dt;
      wasEmpty = empty;

      nextSpawn -= dt;
      if (nextSpawn <= 0) {
        const hasEventNow = creatures.some(c => c.isEvent);
        if (!hasEventNow && creatures.length < SOFT_CAP) spawn();
        nextSpawn = rand(10, 18);
      }

      // Small wildlife wanders in on its own schedule, but stays hidden while a predator is about
      nextSmall -= dt;
      if (nextSmall <= 0) {
        const smallCount = creatures.filter(c => c.binocularOnly).length;
        if (smallCount < SMALL_CAP && !creatures.some(c => c.predator)) {
          spawnAnimal(pickWeighted(smallAnimals), { quiet: true });
        }
        nextSmall = rand(12, 24);
      }
    }
    draw(now, dt);
    requestAnimationFrame(loop);
  }

  function showToast(msg) {
    const el = $('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
  }

  function capture() {
    // Only what the player can actually see counts: the whole window, or just the lens through the binoculars
    const visible = creatures.filter(isSeen);
    const a = visible.sort(binoculars
      ? (x, y) => aimDist(x) - aimDist(y)
      : (x, y) => Math.abs(x.x - w / 2) - Math.abs(y.x - w / 2))[0];
    const gather = gatheringOf(visible);
    const gathering = gather.rarity;

    const flash = $('flash');
    flash.classList.remove('active');
    void flash.offsetWidth;
    flash.classList.add('active');

    const link = document.createElement('a');
    link.download = 'wildlife-window-snapshot.png';
    link.href = canvas.toDataURL('image/png');
    link.click();

    if (activeEvent && visible.some(x => x.isEvent)) {
      showToast('Captured Event: ' + activeEvent.name + ' · ' + activeEvent.rarity);
      $('messageTitle').textContent = 'Remarkable capture!';
      $('messageText').textContent = activeEvent.name + ' (' + activeEvent.rarity + '). Your photo has been downloaded.';
    } else if (a && gathering && RARITY_RANK[gathering] > (RARITY_RANK[a.rarity] || 0)) {
      showToast('Captured: Gathering of ' + gather.animalCount + ' animals · ' + gather.speciesCount + ' species · ' + gathering);
      $('messageTitle').textContent = gather.tier === 3 ? 'Remarkable capture!' : 'Lovely capture';
      $('messageText').textContent = 'A ' + gathering.toLowerCase() + ' gathering of ' + gather.animalCount
        + ' animals across ' + gather.speciesCount + ' species. Your photo has been downloaded.';
    } else if (a) {
      const sameKindCount = visible.filter(x => x.name === a.name).length;
      const label = sameKindCount > 1 ? a.name + ' (' + sameKindCount + ')' : a.name;
      showToast('Captured: ' + label + ' · ' + a.rarity);
      $('messageTitle').textContent = 'Lovely capture';
      $('messageText').textContent = 'A ' + a.rarity.toLowerCase() + ' sighting of ' + a.name.toLowerCase() + '. Your photo has been downloaded.';
    } else {
      const stillness = hasMainAnimals() ? '' : emptyFor >= 45 ? ' · Very rare stillness' : emptyFor >= 20 ? ' · Rare stillness' : '';
      showToast('Snapshot captured · No animal in view' + stillness);
    }

    // In test gallery, Capture also advances to the next item (mobile-friendly)
    if (testMode) setTimeout(advanceGallery, 450);
  }

  function setBinoculars(on) {
    binoculars = on;
    lensFind = null;
    // Raising or lowering the binoculars starts from the middle of the window
    setAim(w / 2, h / 2);
    const btn = $('binoculars');
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    $('binocLabel').textContent = on ? 'Lower binoculars' : 'Binoculars';
    canvas.parentElement.classList.toggle('binoc', on);
    showToast(on ? 'Binoculars up · move or drag to look around' : 'Binoculars lowered');
  }

  // The lens follows the mouse, or a dragging finger. A finger sits low in the lens so it does not cover the view.
  function aimFromPointer(e) {
    if (curtainsClosed) return;
    const r = canvas.getBoundingClientRect();
    pointer.x = e.clientX - r.left;
    pointer.y = e.clientY - r.top;
    if (!binoculars) return;
    const lift = e.pointerType === 'touch' ? lensRadius() * 0.6 : 0;
    setAim(pointer.x, pointer.y - lift);
  }

  $('binoculars').addEventListener('click', () => { if (!curtainsClosed) setBinoculars(!binoculars); });
  $('capture').addEventListener('click', () => { if (!curtainsClosed) capture(); });
  canvas.addEventListener('pointermove', aimFromPointer);
  canvas.addEventListener('pointerdown', e => {
    if (curtainsClosed) return;
    // Keep following the finger even if it slides off the scene
    if (binoculars && canvas.setPointerCapture) {
      try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* not supported for this pointer */ }
    }
    aimFromPointer(e);
  });
  if (testMode) {
    // Tapping the scene advances the gallery, unless the tap is aiming the binoculars
    canvas.addEventListener('pointerup', () => { if (!binoculars) advanceGallery(); });
  }
  window.addEventListener('resize', resize);
  resize();

  const settingsApi = window.WildlifeSettings || {
    getAlwaysCurtainRaised: () => false,
    setAlwaysCurtainRaised: () => {}
  };
  const sceneWrap = canvas.parentElement;
  const alwaysRaised = settingsApi.getAlwaysCurtainRaised();
  let curtainsClosed = !testMode && !alwaysRaised;

  function setControlsLocked(locked) {
    $('binoculars').disabled = locked;
    $('capture').disabled = locked;
  }

  function openCurtains(skip) {
    const curtain = $('curtain');
    const finish = () => {
      curtainsClosed = false;
      curtain.setAttribute('aria-hidden', 'true');
      setControlsLocked(false);
    };
    if (skip) {
      sceneWrap.classList.add('curtains-skip');
      sceneWrap.classList.add('curtains-open');
      finish();
      return;
    }
    const done = ev => {
      if (ev && ev.propertyName && ev.propertyName !== 'transform') return;
      curtain.removeEventListener('transitionend', done);
      finish();
    };
    curtain.addEventListener('transitionend', done);
    sceneWrap.classList.add('curtains-open');
    // If the transition never fires, still unlock the window
    setTimeout(() => { if (curtainsClosed) done(); }, 1600);
  }

  const settingsBtn = $('settingsBtn');
  const settingsPanel = $('settingsPanel');
  const alwaysBox = $('alwaysCurtainRaised');
  alwaysBox.checked = alwaysRaised;
  settingsBtn.addEventListener('click', () => {
    const open = settingsPanel.hidden;
    settingsPanel.hidden = !open;
    settingsBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  alwaysBox.addEventListener('change', () => {
    settingsApi.setAlwaysCurtainRaised(alwaysBox.checked);
    if (alwaysBox.checked) {
      sceneWrap.classList.add('curtains-skip');
      if (curtainsClosed) openCurtains(true);
    }
  });
  document.addEventListener('click', e => {
    if (settingsPanel.hidden) return;
    if (e.target.closest('#settingsBtn') || e.target.closest('#settingsPanel')) return;
    settingsPanel.hidden = true;
    settingsBtn.setAttribute('aria-expanded', 'false');
  });

  if (testMode) {
    sceneWrap.classList.add('curtains-skip', 'curtains-open');
    $('curtain').setAttribute('aria-hidden', 'true');
    const listLen = testMode === '1A' ? animals.length : events.length;
    testIndex = ((testIndex % listLen) + listLen) % listLen;
    showGalleryItem();
  } else {
    openingReveal();
    setControlsLocked(curtainsClosed);
    if (alwaysRaised) openCurtains(true);
    else requestAnimationFrame(() => requestAnimationFrame(() => openCurtains(false)));
  }
  requestAnimationFrame(loop);

  // Friendly time label for the prototype; the scene remains a morning/daytime view.
  let clock = 8 * 60 + 15;
  setInterval(() => {
    clock++;
    if (clock >= 18 * 60) clock = 6 * 60;
    const hh = Math.floor(clock / 60), mm = clock % 60;
    $('timeLabel').textContent = (hh < 12 ? 'Morning' : 'Daytime') + ' · ' + String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0');
  }, 60000);
})();
