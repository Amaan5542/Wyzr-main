export default function genArray<T,>(length: number, fillValue: T): T[] {
    let array: T[] = [];
    for (let i = 0; i < length; i++) {
        array.push(fillValue);
    }
    return array;
};