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
    { name: 'Wild Dog', kind: 'wildDog', predator: true, rarity: 'Rare', weight: 3, scale: 0.9, color: '#b5562b', group: [2, 4] }
  ];

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

  let w = 900, h = 520, dpr = 1, last = 0, zoom = 1, creatures = [], nextSpawn = 2.2, elapsed = 0, toastTimer = 0, wind = 0;
  let activeEvent = null;
  let eventCooldown = 0;
  let pointer = { x: 0, y: 0 };

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
  const SOFT_CAP = 16;          // performance guard only, not a gameplay limit on species
  const EDGE = 100;             // off-screen staging distance for event groups
  const GROUND_TOP = 0.62, GROUND_BOT = 0.8;
  const RARITY_RANK = { 'Common': 0, 'Uncommon': 1, 'Rare': 2, 'Very rare': 3, 'Ultra Rare': 4, 'Legendary': 5 };
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
    wildDog: ['walk', 'wait', 'sit', 'drink']
  };
  // Local Y of the feet for each kind (used for the lying-down pose)
  const FEET_Y = { deer: 24, boar: 21, gaur: 28, elephant: 35, peacock: 21, bear: 21, tiger: 24, leopard: 24, wildDog: 21 };

  let gaitAmp = 1;              // 1 while walking, 0 while standing still (scales leg swing)
  let wasEmpty = true, emptyFor = 0, gatherTier = 0;

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const groundY = y => clamp(y, h * GROUND_TOP, h * GROUND_BOT);
  const speedScale = () => clamp(w / 850, 0.6, 1.15);
  const edgeOf = a => 52 * a.scale + 10;
  const inView = a => a.x > 0 && a.x < w && a.y < h + 10;
  const pond = () => ({ x: w * 0.6, y: h * 0.735, rx: Math.max(30, w * 0.07), ry: Math.max(5, h * 0.015) });
  // Prey run from predators; birds (including peafowl) and tuskers hold their ground
  const isPrey = c => !c.fly && !c.predator && c.kind !== 'peacock' && !(c.kind === 'elephant' && c.tusks);

  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = r.width;
    h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawBackground(t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#96b49e');
    sky.addColorStop(0.46, '#b7c69b');
    sky.addColorStop(1, '#4d6847');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Soft morning light
    const sunX = w * 0.76, sunY = h * 0.17;
    const glow = ctx.createRadialGradient(sunX, sunY, 4, sunX, sunY, h * 0.5);
    glow.addColorStop(0, '#f8ecc0aa');
    glow.addColorStop(1, '#f6e9b800');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    // Distant Western Ghats ridges
    ctx.fillStyle = '#7e9975';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.48);
    for (let x = 0; x <= w; x += w / 8) {
      ctx.quadraticCurveTo(x + w / 16, h * 0.31 + Math.sin(x * 0.013) * 12, x + w / 8, h * 0.46);
    }
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fill();

    // Far tree canopy silhouettes
    for (let i = 0; i < 15; i++) {
      let x = (i / 14) * w + Math.sin(i * 8) * 12;
      let y = h * (0.32 + (i % 3) * 0.035);
      let r = h * (0.09 + (i % 4) * 0.014);
      ctx.fillStyle = ['#547354', '#607e5e', '#496b52'][i % 3];
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.arc(x - r * 0.55, y + r * 0.35, r * 0.72, 0, Math.PI * 2);
      ctx.arc(x + r * 0.6, y + r * 0.3, r * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Midground tree trunks
    ctx.fillStyle = '#3f533e';
    for (let i = 0; i < 6; i++) {
      let tx = w * (0.1 + i * 0.17) + Math.sin(i * 3) * 16;
      ctx.fillRect(tx, h * 0.36, 7 + (i % 2) * 3, h * 0.3);
    }

    // Layered forest floor
    ctx.fillStyle = '#506d49';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.63);
    ctx.quadraticCurveTo(w * 0.5, h * 0.55, w, h * 0.65);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fill();

    ctx.fillStyle = '#3e5e40';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.78);
    ctx.quadraticCurveTo(w * 0.5, h * 0.67, w, h * 0.77);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fill();

    // Small forest pool where animals come to drink
    const p = pond();
    ctx.fillStyle = '#34503a';
    ctx.beginPath();
    ctx.ellipse(p.x, p.y + 1.5, p.rx + 5, p.ry + 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#8fb3ad';
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, p.rx, p.ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#cfe2d588';
    ctx.beginPath();
    ctx.ellipse(p.x - p.rx * 0.25 + Math.sin(t * 0.7) * 2, p.y - p.ry * 0.2, p.rx * 0.45, p.ry * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Sunlight shafts
    for (let i = 0; i < 5; i++) {
      let x = w * (0.12 + i * 0.19);
      ctx.fillStyle = '#e5d99a14';
      ctx.beginPath();
      ctx.moveTo(x, h * 0.32);
      ctx.lineTo(x + w * 0.045, h * 0.32);
      ctx.lineTo(x + w * 0.14, h);
      ctx.lineTo(x + w * 0.07, h);
      ctx.fill();
    }
  }

  function drawForegroundFoliage(t) {
    // Foreground shrubs
    for (let i = 0; i < 26; i++) {
      let x = (i / 25) * w + Math.sin(i * 12) * 14;
      let y = h * (0.83 + (i % 4) * 0.035);
      let r = h * (0.045 + (i % 3) * 0.012);
      ctx.fillStyle = ['#294d37', '#34583b', '#3b6541'][i % 3];
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.arc(x - r * 0.6, y + r * 0.3, r * 0.75, 0, Math.PI * 2);
      ctx.arc(x + r * 0.65, y + r * 0.28, r * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
    // Hanging canopy leaves
    for (let i = 0; i < 13; i++) {
      let x = i * w / 12, y = 0;
      ctx.strokeStyle = '#294a36';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + Math.sin(t * 0.4 + i) * 18, h * 0.06, x + Math.sin(t * 0.4 + i) * 27, h * 0.16);
      ctx.stroke();
      for (let j = 0; j < 3; j++) {
        let lx = x + Math.sin(t * 0.4 + i) * 18 + j * 6;
        let ly = h * (0.045 + j * 0.035);
        ctx.fillStyle = '#355d3d';
        ctx.beginPath();
        ctx.ellipse(lx, ly, 10, 24, 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    // Grass blades
    for (let i = 0; i < 55; i++) {
      let x = (i * 97 % Math.max(1, w));
      let y = h * (0.84 + (i * 13 % 14) / 100);
      ctx.strokeStyle = '#77905a';
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(x, y + 8);
      ctx.lineTo(x + Math.sin(t + i) * 3, y - 5);
      ctx.stroke();
    }
  }

  function drawShadow(rx, ry, yOff) {
    ctx.fillStyle = 'rgba(18, 32, 22, 0.28)';
    ctx.beginPath();
    ctx.ellipse(0, yOff, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawLegs(positions, topY, bottomY, t, phase, color, width, extraFn) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    positions.forEach((lx, idx) => {
      const swing = Math.sin(t * 6.5 + phase + idx * 1.6) * 4.5 * gaitAmp;
      ctx.beginPath();
      ctx.moveTo(lx, topY);
      ctx.lineTo(lx + swing * 0.4, (topY + bottomY) * 0.5);
      ctx.lineTo(lx + swing, bottomY);
      ctx.stroke();
      if (extraFn) extraFn(lx, swing, topY, bottomY);
    });
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

    // Body & torso contour
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.ellipse(0, 0, 26, 12.5, -0.03, 0, Math.PI * 2);
    ctx.fill();

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

    // Ear
    ctx.beginPath();
    ctx.ellipse(23, -25 + graze, 3, 6, -0.5, 0, Math.PI * 2);
    ctx.fill();

    // Eye & nose
    ctx.fillStyle = '#1f1916';
    ctx.beginPath();
    ctx.arc(30, -20 + graze, 1.3, 0, Math.PI * 2);
    ctx.arc(35.5, -19 + graze, 1.5, 0, Math.PI * 2);
    ctx.fill();

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

    // Heavy body
    ctx.fillStyle = a.color;
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
    ctx.fillStyle = a.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, 32, 17, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(7, -13, isBull ? 17 : 14, isBull ? 9 : 6.5, -0.15, 0, Math.PI * 2);
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

    // Eye
    ctx.fillStyle = '#14100e';
    ctx.beginPath();
    ctx.arc(31, -6, 1.4, 0, Math.PI * 2);
    ctx.fill();
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
    ctx.fillStyle = a.color;
    ctx.beginPath();
    ctx.ellipse(0, 1, 15, 9, -0.1, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#2d8267';
    ctx.beginPath();
    ctx.ellipse(-2, 1, 10, 5.5, -0.05, 0, Math.PI * 2);
    ctx.fill();

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

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(17, -18.5, 1.1, 0, Math.PI * 2);
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
    ctx.strokeStyle = '#555a53';
    ctx.lineWidth = 7.5;
    ctx.lineCap = 'round';
    [-22, -10, 11, 20].forEach((lx, i) => {
      const sw = Math.sin(t * 4.5 + a.phase + i * 1.5) * legSwing;
      ctx.beginPath();
      ctx.moveTo(lx, 12);
      ctx.lineTo(lx + sw, 35);
      ctx.stroke();
    });

    // Domed back & body
    ctx.fillStyle = a.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, 35, 23, -0.04, 0, Math.PI * 2);
    ctx.fill();

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

    ctx.fillStyle = a.color;
    ctx.beginPath();
    ctx.arc(0, 0, 15.5, 0, Math.PI * 2);
    ctx.arc(-3, -10, 9.5, 0, Math.PI * 2);
    ctx.fill();

    // Large ear
    ctx.fillStyle = '#565b54';
    ctx.beginPath();
    ctx.ellipse(-11, -1, 11, 15, -0.25, 0, Math.PI * 2);
    ctx.fill();

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
    ctx.fillStyle = a.color;
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
    ctx.fillStyle = a.color;
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
    ctx.fillStyle = a.color;
    ctx.beginPath();
    ctx.ellipse(0, -1, 25, 15, 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-4, -9, 16, 9, 0, 0, Math.PI * 2);
    ctx.fill();

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
    ctx.arc(34, -2.5, 1.8, 0, Math.PI * 2);
    ctx.arc(24, -6, 1.3, 0, Math.PI * 2);
    ctx.fill();
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

    // Body & neck
    ctx.fillStyle = a.color;
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

    // Glossy dark body & outstretched neck
    ctx.fillStyle = a.color;
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
    ctx.fillStyle = a.color;
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
    ctx.arc(25.5, -14, 1.1, 0, Math.PI * 2);
    ctx.arc(34, -11.2, 1.2, 0, Math.PI * 2);
    ctx.fill();
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
      any = true;
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

  function spawnEvent(forcedEv, opts = {}) {
    const ev = forcedEv || pickWeighted(events);
    const sc = Math.min(w / 850, 1.15);
    const group = ev.build(w, h, sc);
    stageEventGroup(group, !!opts.longLife);
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
    const linger = !fly && (gallery || Math.random() < LINGER_CHANCE);
    const side = Math.random() < 0.5 ? -1 : 1;                             // -1 enters from the left, 1 from the right
    const fromBelow = linger && !gallery && Math.random() < 0.15;          // sometimes walk up out of the foreground
    const exitRoll = Math.random();
    const exitSide = exitRoll < 0.4 ? -1 : exitRoll < 0.8 ? 1 : 2;          // 2 = leave downward into the vegetation

    // Clearing spot; herbivores like to settle near animals that are already there
    let homeX = rand(w * 0.22, w * 0.78);
    let homeY = rand(h * 0.65, h * 0.77);
    if (linger && !spec.predator) {
      const settled = creatures.filter(c => !c.fly && !c.predator && c.state === 'act');
      if (settled.length && Math.random() < 0.6) {
        const o = settled[Math.floor(Math.random() * settled.length)];
        homeX = clamp(o.x + (Math.random() < 0.5 ? -1 : 1) * rand(70, 140), w * 0.12, w * 0.88);
        homeY = groundY(o.y + rand(-18, 18));
      }
    }

    const speed = (fly ? rand(30, 42) : spec.predator ? rand(14, 19) : rand(16, 23)) * ss;
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
        a.x = startX;
        a.y = skyY + (i === 0 ? 0 : rand(-14, 14));
        a.state = 'cross';
        a.tx = farX;
        a.ty = a.y + skyDrift;
      } else if (linger) {
        a.homeX = clamp(homeX + (i - (count - 1) / 2) * rand(30, 44), w * 0.06, w * 0.94);
        a.homeY = groundY(homeY + (i === 0 ? 0 : rand(-14, 16)));
        a.tx = a.homeX;
        a.ty = a.homeY;
        if (fromBelow) {
          a.x = a.homeX + rand(-30, 30);
          a.y = h + 60 + lag * 0.6;
        } else {
          a.x = startX;
          a.y = groundY(a.homeY + rand(-10, 10));
        }
        a.state = 'enter';
        a.exitSide = exitSide;
        a.leaveAt = elapsed + eta + stay + i * rand(0.3, 1.4);
      } else {
        // Pass straight through the clearing, drifting a little nearer or deeper as it goes
        a.x = startX;
        a.y = groundY(homeY + (i === 0 ? 0 : rand(-14, 16)));
        a.state = 'cross';
        a.tx = farX;
        a.ty = groundY(a.y + depthDrift);
      }
      creatures.push(a);
    }

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

  function spawn() {
    const ground = creatures.filter(c => !c.fly);
    const predatorHere = creatures.some(c => c.predator);

    // Special events start when the forest is clear and the event cooldown has passed
    if (creatures.length === 0 && eventCooldown <= 0 && Math.random() < 0.22) {
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

    const spec = pickWeighted(animals);
    // No newcomers wander in on top of a hunting predator
    if (predatorHere && isPrey(spec)) return;
    // The busier the clearing, the less likely another group joins, so 5+ is rare and 8+ very rare.
    // Predators and birds are less put off by a crowd, but stay within their rarity tier.
    const n = ground.length;
    const accept = n === 0 ? 1 : spec.fly ? 0.5 : spec.predator ? 0.4 : n < 5 ? 0.14 : n < 8 ? 0.06 : 0.03;
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

  function draw(t, dt) {
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.scale(zoom, zoom);
    ctx.translate(-w / 2, -h / 2);

    drawBackground(t);

    // Sort ground animals by Y depth so nearer ones draw in front
    creatures.sort((a, b) => a.y - b.y);

    for (const a of creatures) {
      updateCreature(a, dt);
      drawAnimal(a, t);
    }

    drawForegroundFoliage(t);
    ctx.restore();

    // Animals leave by walking off-screen; nothing fades out (the age check is only a safety net)
    creatures = creatures.filter(a => !a.gone && a.age < 600);
    if (activeEvent && !creatures.some(c => c.isEvent)) activeEvent = null;

    // Busy clearings are special: 5+ animals in view is Rare, 8+ is Very rare
    const inViewCount = creatures.filter(inView).length;
    const tier = inViewCount >= 8 ? 2 : inViewCount >= 5 ? 1 : 0;
    if (tier > gatherTier && !activeEvent && !testMode) {
      $('sightingHint').textContent = tier === 2 ? 'The clearing is full of life' : 'A busy clearing';
      $('messageTitle').textContent = (tier === 2 ? 'A great gathering · Very rare' : 'A lively gathering · Rare');
      $('messageText').textContent = inViewCount + ' animals are sharing the view. Moments like this do not come often.';
    }
    gatherTier = tier;

    if (creatures.length === 0) {
      if (testMode) {
        // Keep the gallery item on show by bringing the same index back in after it leaves
        showGalleryItem();
      } else if (elapsed > 8) {
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
      const empty = creatures.length === 0;
      if (empty && !wasEmpty) { nextSpawn = quietDelay(); emptyFor = 0; }
      if (empty) emptyFor += dt;
      wasEmpty = empty;

      nextSpawn -= dt;
      if (nextSpawn <= 0) {
        const hasEventNow = creatures.some(c => c.isEvent);
        if (!hasEventNow && creatures.length < SOFT_CAP) spawn();
        nextSpawn = rand(10, 18);
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
    const visible = creatures.filter(inView);
    const a = visible.sort((x, y) => Math.abs(x.x - w / 2) - Math.abs(y.x - w / 2))[0];
    const gathering = visible.length >= 8 ? 'Very rare' : visible.length >= 5 ? 'Rare' : null;

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
      showToast('Captured: Gathering of ' + visible.length + ' animals · ' + gathering);
      $('messageTitle').textContent = 'Lovely capture';
      $('messageText').textContent = 'A ' + gathering.toLowerCase() + ' gathering of ' + visible.length + ' animals. Your photo has been downloaded.';
    } else if (a) {
      const sameKindCount = visible.filter(x => x.name === a.name).length;
      const label = sameKindCount > 1 ? a.name + ' (' + sameKindCount + ')' : a.name;
      showToast('Captured: ' + label + ' · ' + a.rarity);
      $('messageTitle').textContent = 'Lovely capture';
      $('messageText').textContent = 'A ' + a.rarity.toLowerCase() + ' sighting of ' + a.name.toLowerCase() + '. Your photo has been downloaded.';
    } else {
      const stillness = creatures.length ? '' : emptyFor >= 45 ? ' · Very rare stillness' : emptyFor >= 20 ? ' · Rare stillness' : '';
      showToast('Snapshot captured · No animal in view' + stillness);
    }

    // In test gallery, Capture also advances to the next item (mobile-friendly)
    if (testMode) setTimeout(advanceGallery, 450);
  }

  $('zoomIn').addEventListener('click', () => {
    zoom = Math.min(1.65, +(zoom + 0.15).toFixed(2));
    $('zoomLabel').textContent = zoom.toFixed(1) + '×';
  });
  $('zoomOut').addEventListener('click', () => {
    zoom = Math.max(1, +(zoom - 0.15).toFixed(2));
    $('zoomLabel').textContent = zoom.toFixed(1) + '×';
  });
  $('capture').addEventListener('click', capture);
  canvas.addEventListener('pointermove', e => {
    const r = canvas.getBoundingClientRect();
    pointer.x = e.clientX - r.left;
    pointer.y = e.clientY - r.top;
  });
  if (testMode) {
    canvas.addEventListener('pointerup', advanceGallery);
  }
  window.addEventListener('resize', resize);
  resize();
  if (testMode) {
    const listLen = testMode === '1A' ? animals.length : events.length;
    testIndex = ((testIndex % listLen) + listLen) % listLen;
    showGalleryItem();
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
