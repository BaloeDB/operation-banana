import { useEffect, useState } from "react"

const useBananaState = (
    key: string
) => {
    const [bananas, setBananas] = useState(() => {
        const storedValue = sessionStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : 0
    });

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(bananas))
    }, [key, bananas]);

    return [bananas, setBananas];
};

export default useBananaState;