export default function HSVtoRGB([H, S, V]: [H: number, S:number, V:number]) {
    let r, g, b;
  
    const i = Math.floor(H * 6);
    const f = H * 6 - i;
    const p = V * (1 - S);
    const q = V * (1 - f * S);
    const t = V * (1 - (1 - f) * S);
  
    switch (i % 6) {
      case 0: r = V, g = t, b = p; break;
      case 1: r = q, g = V, b = p; break;
      case 2: r = p, g = V, b = t; break;
      case 3: r = p, g = q, b = V; break;
      case 4: r = t, g = p, b = V; break;
      case 5: r = V, g = p, b = q; break;
    }
  
    return [ r! * 255, g! * 255, b! * 255 ];
}