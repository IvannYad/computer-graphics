export default function RGBtoHSV([R, G, B]: [R: number, G:number, B:number]) {
    R /= 255, G /= 255, B /= 255;
  
    const max = Math.max(R, G, B), min = Math.min(R, G, B);
    const v = max;
  
    let h;
    const d = max - min;
    const s = max == 0 ? 0 : d / max;
  
    if (max == min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case R: h = (G - B) / d + (G < B ? 6 : 0); break;
        case G: h = (B - R) / d + 2; break;
        case B: h = (R - G) / d + 4; break;
      }
  
      h! /= 6;
    }
  
    return [ h!, s, v ];
}