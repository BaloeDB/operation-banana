import { useEffect, useState } from "react";

const useInventoryState = (
    key: string
) => {
    const [inventory, setInventory] = useState(() => {
        const storedValue = sessionStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : []
    });

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(inventory))
    }, [key, inventory]);

    return [inventory, setInventory];
}

export default useInventoryState;