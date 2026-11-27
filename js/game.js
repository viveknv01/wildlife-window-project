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
    { name: 'Tiger', kind: 'tiger', rarity: 'Very rare', weight: 1.1, scale: 1.08, color: '#d17c32' },
    { name: 'Leopard', kind: 'leopard', rarity: 'Very rare', weight: 1.1, scale: 0.98, color: '#c49348' },
    { name: 'Asian Elephant Tusk', kind: 'elephant', tusks: true, rarity: 'Very rare', weight: 1.0, scale: 1.4, color: '#636860' },
    { name: 'Sloth Bear', kind: 'bear', rarity: 'Very rare', weight: 1.0, scale: 1.02, color: '#272322' },
    { name: 'Black Leopard', kind: 'leopard', black: true, rarity: 'Ultra Rare', weight: 0.45, scale: 0.98, color: '#202126' }
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
          name: 'Indian peacock dancing', kind: 'peacock', pose: 'dance', rarity: 'Rare',
          x: rand(w * 0.3, w * 0.7), y: rand(h * 0.68, h * 0.77), dir,
          phase: rand(0, 7), scale: 1.06 * sc, alpha: 0, life: rand(16, 24), age: 0, speed: rand(1.5, 3.5),
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
        const spd = rand(5, 8.5);
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
        const spd = rand(5, 8.5);
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
        const spd = rand(5, 8.5);
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
        const spd = rand(18, 26);
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
        const cx = rand(w * 0.38, w * 0.62);
        const cy = rand(h * 0.68, h * 0.76);
        const life = rand(16, 23);
        const gap = 58 * sc;
        return [
          {
            name: 'Tuskers fighting', eventName: 'Tuskers fighting', kind: 'elephant', tusks: true, pose: 'fight',
            rarity: 'Legendary', x: cx - gap, y: cy, dir: 1, phase: 0,
            scale: 1.36 * sc, alpha: 0, life, age: 0, speed: 0, color: '#61665e', isEvent: true
          },
          {
            name: 'Tuskers fighting', eventName: 'Tuskers fighting', kind: 'elephant', tusks: true, pose: 'fight',
            rarity: 'Legendary', x: cx + gap, y: cy + 3, dir: -1, phase: Math.PI,
            scale: 1.36 * sc, alpha: 0, life, age: 0, speed: 0, color: '#585d56', isEvent: true
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
        const spd = rand(6.5, 10.5);
        const life = rand(15, 22);
        return [
          {
            name: 'Leopard + Black Leopard', eventName: 'Leopard + Black Leopard', kind: 'leopard', black: false,
            rarity: 'Legendary', x, y, dir, phase: rand(0, 7),
            scale: 1.0 * sc, alpha: 0, life, age: 0, speed: spd, color: '#c49348', isEvent: true
          },
          {
            name: 'Leopard + Black Leopard', eventName: 'Leopard + Black Leopard', kind: 'leopard', black: true,
            rarity: 'Legendary', x: x - dir * 48, y: y - 10, dir, phase: rand(0, 7),
            scale: 0.98 * sc, alpha: 0, life, age: 0, speed: spd, color: '#202126', isEvent: true
          }
        ];
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
      const swing = Math.sin(t * 6.5 + phase + idx * 1.6) * 4.5;
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
    const graze = Math.sin(t * 1.8 + a.phase) * 2.5;
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
    const legSwing = fighting ? 1.5 : 3.5;
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

  function drawTiger(a, t) {
    drawShadow(30, 5.5, 23);
    drawLegs([-19, -11, 11, 18], 7, 22, t, a.phase, '#b86823', 4.2);

    // Long ringed tail
    ctx.strokeStyle = a.color;
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(-25, -2);
    ctx.quadraticCurveTo(-42, 4, -45, -10 + Math.sin(t * 3 + a.phase) * 3);
    ctx.stroke();

    // Muscular torso
    ctx.fillStyle = a.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, 28, 12.5, -0.02, 0, Math.PI * 2);
    ctx.fill();

    // White underbelly
    ctx.fillStyle = '#f3e7d2';
    ctx.beginPath();
    ctx.ellipse(0, 7.5, 21, 4, 0, 0, Math.PI);
    ctx.fill();

    // Head & ruff
    ctx.fillStyle = a.color;
    ctx.beginPath();
    ctx.arc(25, -7, 9.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f3e7d2';
    ctx.beginPath();
    ctx.arc(27, -4, 5.5, 0, Math.PI);
    ctx.fill();

    // Ears
    ctx.fillStyle = '#231d19';
    ctx.beginPath();
    ctx.arc(21, -15, 3.2, 0, Math.PI * 2);
    ctx.arc(27, -15, 3, 0, Math.PI * 2);
    ctx.fill();

    // Vertical black stripes
    ctx.strokeStyle = '#1f1814';
    ctx.lineWidth = 2.2;
    for (let sx = -18; sx <= 14; sx += 5.5) {
      ctx.beginPath();
      ctx.moveTo(sx, -11);
      ctx.quadraticCurveTo(sx - 2, -2, sx + 1, 6);
      ctx.stroke();
    }

    // Eye & nose
    ctx.fillStyle = '#e8c85b';
    ctx.beginPath();
    ctx.arc(28, -9, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#241b18';
    ctx.beginPath();
    ctx.arc(33.5, -6, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawLeopard(a, t) {
    const isBlack = !!a.black;
    drawShadow(27, 5, 22);
    drawLegs([-17, -10, 10, 17], 7, 21, t, a.phase, isBlack ? '#17181c' : '#a67936', 3.8);

    // Long curved tail
    ctx.strokeStyle = a.color;
    ctx.lineWidth = 4.2;
    ctx.beginPath();
    ctx.moveTo(-24, 0);
    ctx.quadraticCurveTo(-43, -4, -41, -18 + Math.sin(t * 2.5 + a.phase) * 3);
    ctx.stroke();

    // Sleek body & head
    ctx.fillStyle = a.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, 26, 11.5, -0.04, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(24, -7, 8.5, 0, Math.PI * 2);
    ctx.fill();

    // Rounded ears
    ctx.beginPath();
    ctx.arc(20, -14, 3, 0, Math.PI * 2);
    ctx.arc(25, -14, 2.8, 0, Math.PI * 2);
    ctx.fill();

    // Rosettes (subtle ghost rosettes on black leopard, bold on golden leopard)
    ctx.strokeStyle = isBlack ? '#32353d' : '#3d2b18';
    ctx.lineWidth = 1.6;
    for (let i = 0; i < 11; i++) {
      const rx = -17 + (i % 6) * 6.5;
      const ry = -4 + Math.floor(i / 6) * 6.5;
      ctx.beginPath();
      ctx.arc(rx, ry, 1.7, 0.3, Math.PI * 1.85);
      ctx.stroke();
    }

    // Gleaming eyes (especially striking on black leopard)
    ctx.fillStyle = isBlack ? '#d9e368' : '#e0be58';
    ctx.beginPath();
    ctx.arc(27, -8.5, 1.6, 0, Math.PI * 2);
    ctx.fill();
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

  function drawAnimal(a, t) {
    ctx.save();
    ctx.translate(a.x, a.y);
    ctx.scale(a.dir * a.scale, a.scale);
    const bob = a.fly ? Math.sin(t * 5 + a.phase) * 3.5 : Math.sin(t * 3.2 + a.phase) * 1.6;
    ctx.translate(0, bob);
    ctx.globalAlpha = a.alpha;

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

    ctx.restore();
  }

  function spawnEvent(forcedEv, opts = {}) {
    const ev = forcedEv || pickWeighted(events);
    const sc = Math.min(w / 850, 1.15);
    const group = ev.build(w, h, sc);
    if (opts.longLife) {
      for (const c of group) c.life = Math.max(c.life, 55);
    }
    activeEvent = { name: ev.name, rarity: ev.rarity };
    creatures.push(...group);
    $('sightingHint').textContent = opts.testLabel || ev.hint;
    $('messageTitle').textContent = (opts.testLabel ? opts.testLabel + ' · ' : '') + ev.title + ' · ' + ev.rarity;
    $('messageText').textContent = opts.testHint || ev.text;
  }

  function spawnAnimal(forcedSpec, opts = {}) {
    const spec = forcedSpec || pickWeighted(animals);
    const sc = Math.min(w / 850, 1.15);
    const fly = !!spec.fly;
    const dir = Math.random() < 0.5 ? -1 : 1;
    const count = spec.group ? Math.floor(rand(spec.group[0], spec.group[1] + 0.99)) : 1;
    const baseX = rand(w * 0.2, w * 0.8);
    const baseY = fly ? rand(h * 0.24, h * 0.48) : rand(h * 0.65, h * 0.77);
    const baseSpeed = fly ? rand(15, 23) : rand(5.5, 11.5);
    const baseLife = opts.longLife ? 55 : rand(14, 23);

    activeEvent = null;

    for (let i = 0; i < count; i++) {
      const spreadX = i === 0 ? 0 : -dir * (i * rand(28, 44)) + rand(-8, 8);
      const spreadY = i === 0 ? 0 : rand(-14, 16);
      const scaleJitter = i === 0 ? 1 : rand(0.84, 1.04);
      creatures.push({
        ...spec,
        x: Math.min(w * 0.88, Math.max(w * 0.12, baseX + spreadX)),
        y: fly ? baseY + spreadY * 0.6 : Math.min(h * 0.8, Math.max(h * 0.61, baseY + spreadY)),
        dir,
        phase: rand(0, 7),
        scale: spec.scale * scaleJitter * sc,
        alpha: 0,
        life: baseLife + (opts.longLife ? 0 : rand(-1.5, 2)),
        age: 0,
        speed: baseSpeed * rand(0.95, 1.05),
        hasAntlers: i === 0 || Math.random() < 0.45
      });
    }

    const groupNote = count > 1 ? ' (small group of ' + count + ')' : spec.bull ? ' (solitary bull)' : '';
    $('sightingHint').textContent = opts.testLabel || (fly ? 'Wings across the canopy' : count > 1 ? 'A small herd in the glade' : 'Movement in the forest');
    $('messageTitle').textContent = (opts.testLabel ? opts.testLabel + ' · ' : '') + spec.name + ' · ' + spec.rarity;
    $('messageText').textContent = opts.testHint || ('Take your time. Can you spot the ' + spec.name.toLowerCase() + groupNote + '?');
  }

  function spawn() {
    // Trigger a special event occasionally when the forest is clear and event cooldown has passed
    if (creatures.length === 0 && eventCooldown <= 0 && Math.random() < 0.22) {
      spawnEvent();
      eventCooldown = rand(28, 45);
    } else {
      spawnAnimal();
    }
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
      a.age += dt;
      a.x += a.dir * a.speed * dt;
      a.alpha = Math.min(1, a.age * 1.4, Math.max(0, (a.life - a.age) * 0.8));
      drawAnimal(a, t);
    }

    drawForegroundFoliage(t);
    ctx.restore();

    creatures = creatures.filter(a => a.age < a.life && a.x > -140 && a.x < w + 140);

    if (creatures.length === 0) {
      activeEvent = null;
      if (testMode) {
        // Keep gallery item visible by respawning the same index if it walked off
        showGalleryItem();
      } else if (elapsed > 8) {
        $('sightingHint').textContent = 'Listen to the forest';
        $('messageTitle').textContent = 'A quiet moment';
        $('messageText').textContent = 'The forest has its own pace. Stay a while.';
      }
    }
  }

  function loop(ts) {
    const now = ts / 1000, dt = Math.min(0.05, now - last || 0);
    last = now;
    elapsed += dt;
    wind += dt;
    nextSpawn -= dt;
    if (eventCooldown > 0) eventCooldown -= dt;

    if (!testMode && nextSpawn <= 0) {
      const hasEventNow = creatures.some(c => c.isEvent);
      if (!hasEventNow && creatures.length < 3) {
        spawn();
      }
      nextSpawn = rand(9, 16);
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
    const visible = creatures.filter(x => x.alpha > 0.5);
    const a = visible.sort((x, y) => Math.abs(x.x - w / 2) - Math.abs(y.x - w / 2))[0];

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
    } else if (a) {
      const sameKindCount = visible.filter(x => x.name === a.name).length;
      const label = sameKindCount > 1 ? a.name + ' (' + sameKindCount + ')' : a.name;
      showToast('Captured: ' + label + ' · ' + a.rarity);
      $('messageTitle').textContent = 'Lovely capture';
      $('messageText').textContent = 'A ' + a.rarity.toLowerCase() + ' sighting of ' + a.name.toLowerCase() + '. Your photo has been downloaded.';
    } else {
      showToast('Snapshot captured · No animal in view');
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
