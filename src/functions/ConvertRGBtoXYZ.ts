export default function RGBtoXYZ([R, G, B]: [R: number, G:number, B:number]) {
    const [var_R, var_G, var_B] = [R, G, B]
        .map(x => x / 255)
        .map(x => x > 0.04045
            ? Math.pow(((x + 0.055) / 1.055), 2.4)
            : x / 12.92)
        .map(x => x * 100)

    // Observer. = 2°, Illuminant = D65
    const X = var_R * 0.4124 + var_G * 0.3576 + var_B * 0.1805
    const Y = var_R * 0.2126 + var_G * 0.7152 + var_B * 0.0722
    const Z = var_R * 0.0193 + var_G * 0.1192 + var_B * 0.9505
    return [X, Y, Z];
}
