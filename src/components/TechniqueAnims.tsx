import { useEffect, useRef } from "react";

export function ITCAnim() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf = 0; let t = 0;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => { c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr; };
    resize();
    window.addEventListener("resize", resize);
    const loop = () => {
      t += 0.012;
      const w = c.width, h = c.height;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(120,150,200,0.35)";
      ctx.lineWidth = dpr;
      // axes
      ctx.beginPath();
      ctx.moveTo(20 * dpr, h - 20 * dpr); ctx.lineTo(w - 10 * dpr, h - 20 * dpr);
      ctx.moveTo(20 * dpr, 10 * dpr); ctx.lineTo(20 * dpr, h - 20 * dpr);
      ctx.stroke();
      // injection peaks (downward heat pulses)
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, "#3b6fd8");
      grad.addColorStop(1, "#1aa7c2");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2 * dpr;
      ctx.beginPath();
      const base = h * 0.4;
      ctx.moveTo(20 * dpr, base);
      const peaks = 10;
      for (let i = 0; i < peaks; i++) {
        const x = 20 * dpr + ((w - 30 * dpr) / peaks) * (i + 0.5);
        const decay = 1 - i / peaks;
        const dip = base + Math.sin(t * 2 - i) * 4 * dpr + decay * 70 * dpr;
        ctx.lineTo(x - 8 * dpr, base);
        ctx.lineTo(x, dip);
        ctx.lineTo(x + 8 * dpr, base);
      }
      ctx.lineTo(w - 10 * dpr, base);
      ctx.stroke();
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="w-full h-full" />;
}

export function FluorescenceAnim() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf = 0; let t = 0;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => { c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr; };
    resize();
    window.addEventListener("resize", resize);
    const loop = () => {
      t += 0.02;
      const w = c.width, h = c.height;
      ctx.clearRect(0, 0, w, h);
      // gaussian emission spectra at multiple wavelengths
      const cols = ["#3b6fd8", "#1aa7c2", "#7a5cff"];
      cols.forEach((col, idx) => {
        const center = w * (0.3 + idx * 0.2);
        const sigma = w * 0.07;
        const amp = (h * 0.65) * (0.6 + 0.4 * Math.sin(t * 1.5 + idx));
        const grad = ctx.createLinearGradient(0, h - amp, 0, h);
        grad.addColorStop(0, col);
        grad.addColorStop(1, col + "00");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 2) {
          const y = h - amp * Math.exp(-((x - center) ** 2) / (2 * sigma ** 2));
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.globalAlpha = 0.55;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="w-full h-full" />;
}

export function ConfocalAnim() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf = 0; let t = 0;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => { c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr; };
    resize();
    window.addEventListener("resize", resize);
    // cells
    const cells = Array.from({ length: 14 }).map(() => ({
      x: Math.random(), y: Math.random(),
      r: 0.05 + Math.random() * 0.08, phase: Math.random() * Math.PI * 2,
    }));
    const loop = () => {
      t += 0.012;
      const w = c.width, h = c.height;
      ctx.fillStyle = "rgba(15,30,60,0.05)";
      ctx.fillRect(0, 0, w, h);
      ctx.clearRect(0, 0, w, h);
      cells.forEach(cell => {
        const pulse = 0.6 + 0.4 * Math.sin(t * 2 + cell.phase);
        const x = cell.x * w, y = cell.y * h, r = cell.r * Math.min(w, h);
        const grad = ctx.createRadialGradient(x, y, r * 0.2, x, y, r);
        grad.addColorStop(0, `rgba(122,180,255,${0.85 * pulse})`);
        grad.addColorStop(0.5, `rgba(26,167,194,${0.4 * pulse})`);
        grad.addColorStop(1, "rgba(26,167,194,0)");
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      });
      // scan line
      const scanY = ((t * 0.3) % 1) * h;
      const grad2 = ctx.createLinearGradient(0, scanY - 6 * dpr, 0, scanY + 6 * dpr);
      grad2.addColorStop(0, "rgba(255,255,255,0)");
      grad2.addColorStop(0.5, "rgba(180,220,255,0.45)");
      grad2.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, scanY - 6 * dpr, w, 12 * dpr);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="w-full h-full" />;
}

export function BindingAnim() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf = 0; let t = 0;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => { c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr; };
    resize();
    window.addEventListener("resize", resize);
    const loop = () => {
      t += 0.015;
      const w = c.width, h = c.height;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      // protein blob
      ctx.fillStyle = "rgba(59,111,216,0.45)";
      ctx.beginPath();
      for (let a = 0; a < Math.PI * 2; a += 0.1) {
        const r = 40 * dpr + Math.sin(a * 5 + t) * 6 * dpr;
        const x = cx - 30 * dpr + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath(); ctx.fill();
      // RNA strand approaching/binding
      ctx.strokeStyle = "rgba(26,167,194,0.85)";
      ctx.lineWidth = 2 * dpr;
      const phase = (Math.sin(t) + 1) / 2; // 0..1
      const startX = cx + 90 * dpr * (1 - phase);
      ctx.beginPath();
      for (let i = 0; i < 60; i++) {
        const x = startX + i * 2 * dpr;
        const y = cy + Math.sin(i * 0.3 + t * 3) * 14 * dpr * (1 - phase * 0.5);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      // bases
      for (let i = 0; i < 12; i++) {
        const x = startX + i * 10 * dpr;
        const y = cy + Math.sin(i * 0.5 + t * 3) * 14 * dpr * (1 - phase * 0.5);
        ctx.fillStyle = "rgba(122,92,255,0.8)";
        ctx.beginPath(); ctx.arc(x, y, 3 * dpr, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="w-full h-full" />;
}

export function PurificationAnim() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf = 0; let t = 0;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => { c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr; };
    resize();
    window.addEventListener("resize", resize);
    type P = { x: number; y: number; vy: number; col: string; r: number };
    let parts: P[] = [];
    const colors = ["#3b6fd8", "#1aa7c2", "#7a5cff", "#3b6fd8", "#1aa7c2"];
    const loop = () => {
      t += 0.016;
      const w = c.width, h = c.height;
      ctx.clearRect(0, 0, w, h);
      // column
      const colX = w / 2 - 30 * dpr, colW = 60 * dpr;
      ctx.fillStyle = "rgba(180,200,230,0.18)";
      ctx.fillRect(colX, 10 * dpr, colW, h - 20 * dpr);
      ctx.strokeStyle = "rgba(120,150,200,0.4)";
      ctx.strokeRect(colX, 10 * dpr, colW, h - 20 * dpr);
      // spawn
      if (Math.random() < 0.4) {
        parts.push({
          x: colX + 10 * dpr + Math.random() * (colW - 20 * dpr),
          y: 10 * dpr,
          vy: 0.4 + Math.random() * 0.6,
          col: colors[Math.floor(Math.random() * colors.length)],
          r: (2 + Math.random() * 2) * dpr,
        });
      }
      parts.forEach(p => {
        p.y += p.vy * dpr;
        ctx.fillStyle = p.col;
        ctx.globalAlpha = 0.85;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;
      parts = parts.filter(p => p.y < h - 10 * dpr);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="w-full h-full" />;
}

export function CloningAnim() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf = 0; let t = 0;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => { c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr; };
    resize();
    window.addEventListener("resize", resize);
    const loop = () => {
      t += 0.012;
      const w = c.width, h = c.height;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      const R = Math.min(w, h) * 0.32;
      // plasmid ring
      ctx.strokeStyle = "rgba(59,111,216,0.7)";
      ctx.lineWidth = 3 * dpr;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      // double strand effect
      ctx.strokeStyle = "rgba(26,167,194,0.5)";
      ctx.lineWidth = 1.5 * dpr;
      ctx.beginPath(); ctx.arc(cx, cy, R + 4 * dpr, 0, Math.PI * 2); ctx.stroke();
      // insert traveling around
      const a = t * 0.8;
      const ix = cx + Math.cos(a) * R, iy = cy + Math.sin(a) * R;
      ctx.fillStyle = "#7a5cff";
      ctx.beginPath(); ctx.arc(ix, iy, 7 * dpr, 0, Math.PI * 2); ctx.fill();
      ctx.shadowColor = "#7a5cff"; ctx.shadowBlur = 18 * dpr;
      ctx.beginPath(); ctx.arc(ix, iy, 7 * dpr, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      // tick marks
      for (let i = 0; i < 16; i++) {
        const ang = (i / 16) * Math.PI * 2;
        const x1 = cx + Math.cos(ang) * (R - 6 * dpr);
        const y1 = cy + Math.sin(ang) * (R - 6 * dpr);
        const x2 = cx + Math.cos(ang) * (R + 6 * dpr);
        const y2 = cy + Math.sin(ang) * (R + 6 * dpr);
        ctx.strokeStyle = "rgba(120,150,200,0.4)";
        ctx.lineWidth = 1 * dpr;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="w-full h-full" />;
}

export function GelAnim() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf = 0; let t = 0;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => { c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr; };
    resize();
    window.addEventListener("resize", resize);
    const loop = () => {
      t += 0.01;
      const w = c.width, h = c.height;
      ctx.fillStyle = "rgba(20,40,80,0.04)";
      ctx.fillRect(0, 0, w, h);
      ctx.clearRect(0, 0, w, h);
      const lanes = 5;
      for (let i = 0; i < lanes; i++) {
        const x = ((i + 0.5) / lanes) * w;
        // well
        ctx.strokeStyle = "rgba(120,150,200,0.4)";
        ctx.lineWidth = dpr;
        ctx.strokeRect(x - 18 * dpr, 8 * dpr, 36 * dpr, 8 * dpr);
        // bands moving down at different speeds
        const speed = 0.15 + i * 0.03;
        const bands = [0.25, 0.5, 0.75];
        bands.forEach((b, j) => {
          const y = ((t * speed + b) % 1) * (h - 30 * dpr) + 20 * dpr;
          const alpha = 0.7 - j * 0.15;
          ctx.fillStyle = `rgba(122,180,255,${alpha})`;
          ctx.shadowColor = "rgba(120,180,255,0.5)";
          ctx.shadowBlur = 10 * dpr;
          ctx.fillRect(x - 16 * dpr, y, 32 * dpr, 4 * dpr);
          ctx.shadowBlur = 0;
        });
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="w-full h-full" />;
}
