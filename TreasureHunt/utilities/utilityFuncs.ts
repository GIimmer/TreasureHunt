export function getMinMax<T>(list: T[], comparatorFunc: (a: any, b: any) => number): T[] {
    const sorted = list.sort(comparatorFunc);
    return [sorted[0], sorted[-1]];
}