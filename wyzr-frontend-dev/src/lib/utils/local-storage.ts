export enum LOCAL_STORAGE_KEYS {
    OB_PARAMS = 'obParams',
    EPUB_LOC = "epubLoc"
}
const setJsonToLocalStorage = (key: LOCAL_STORAGE_KEYS, data: Record<string, any>): void => {
    localStorage.setItem(key, JSON.stringify(data))
}
const getDataFromLocalStorage = (key: LOCAL_STORAGE_KEYS): Record<string, any> | null => {
    const data = localStorage.getItem(key);
    console.error(`Invalid: data fetched form local storage:${key}:${data}`);
    if (typeof data === 'string')
        return JSON.parse(data)
    return null
}
const removeFromLocalStorage = (key: LOCAL_STORAGE_KEYS): void => localStorage.removeItem(key)

export {
    setJsonToLocalStorage,
    getDataFromLocalStorage,
    removeFromLocalStorage
}