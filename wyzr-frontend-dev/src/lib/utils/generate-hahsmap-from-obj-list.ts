/**
 * Generates a hashmap from a list based on a pivot point.
 * 
 * @param list - The list of items to be converted into a hashmap.
 * @param pivotPoint - The key or function to determine the hashmap's key.
 * @returns A hashmap based on the provided pivot point.
 */
function generateHashmap<T>(list: T[], pivotPoint: string | ((item: T) => string), mode?: 'list' | 'std' | undefined): Record<string, T | T[]> {
    const hashmap: Record<string, any> = {};

    list.forEach((item) => {
        let pivotValue: string;

        if (typeof pivotPoint === 'function') {
            // Directly use pivotPoint as a function to get pivotValue
            pivotValue = pivotPoint(item);
        } else {
            // Check if item is an object and pivotPoint is a key in this object
            if (typeof item === 'object' && item !== null && pivotPoint in item) {
                // Need to assert that item is an object with a string index signature
                const keyedItem = item as Record<string, any>;
                pivotValue = keyedItem[pivotPoint];
            } else {
                throw new Error(`Invalid pivot point: ${pivotPoint}`);
            }
        }

        if (!hashmap[pivotValue]) {
            if (mode === 'list')
                hashmap[pivotValue] = [];

            if (mode === 'std' || mode === undefined) {
                hashmap[pivotValue] = item;
            }
        }
        if (mode === 'list') hashmap[pivotValue].push(item)
    });

    return hashmap;
}

export { generateHashmap }