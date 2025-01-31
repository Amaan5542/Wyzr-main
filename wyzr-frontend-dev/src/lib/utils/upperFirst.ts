export function upperFirst(text: string) {
    if (!text) return text; // Return the original text if it's falsy (e.g., "", null, undefined)
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}