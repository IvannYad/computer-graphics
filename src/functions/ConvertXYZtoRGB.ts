export default function XYZtoRGB([X, Y, Z]: [X: number, Y:number, Z:number]) {
    //X, Y and Z input refer to a D65/2° standard illuminant.
    //sR, sG and sB (standard RGB) output range = 0 ÷ 255

    const var_X = X / 100
    const var_Y = Y / 100
    const var_Z = Z / 100

    const var_R = var_X *  3.2406 + var_Y * -1.5372 + var_Z * -0.4986
    const var_G = var_X * -0.9689 + var_Y *  1.8758 + var_Z *  0.0415
    const var_B = var_X *  0.0557 + var_Y * -0.2040 + var_Z *  1.0570

    return [var_R, var_G, var_B]
        .map(n => n > 0.0031308
            ? 1.055 * Math.pow(n, (1 / 2.4)) - 0.055
            : 12.92 * n)
        .map(n => n * 255)
}
