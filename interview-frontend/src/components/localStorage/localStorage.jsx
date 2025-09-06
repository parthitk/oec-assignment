
export const setItem = ({key , value}) => {
    if(value){
        
        window.localStorage.setItem(key, JSON.stringify(value));
        const storeItem = getItem({key:key})
        if(storeItem?.Length == 0){
            window.localStorage.removeItem(key)
        }
    }
}

export const getItem = ({key}) => {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}