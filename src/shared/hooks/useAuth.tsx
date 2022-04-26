import {useEffect, useState} from "react";

const useAuth = () => {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        const userData = localStorage.getItem('userTwitterData');

        if (userData) {
            setIsAuth(true);
        }
    }, [])

    return [isAuth];
}

export default useAuth;