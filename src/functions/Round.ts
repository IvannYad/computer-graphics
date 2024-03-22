export default function Round(n: number, numberOfDigitsAfterDot: number): number{
    const helperNumber = Math.pow(10, numberOfDigitsAfterDot);
    n *= helperNumber;
    n = Math.round(n);
    n = n * 1.0 / helperNumber;
    return n;
}