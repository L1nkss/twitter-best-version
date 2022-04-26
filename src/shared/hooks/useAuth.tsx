import {useEffect, useState} from "react";

const useAuth = () => {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    console.log('UPS')

    useEffect(() => {
        const userData = localStorage.getItem('userTwitterData');

        if (userData) {
            setIsAuth(true);
        }
    }, [])

    return [isAuth];
}

export default useAuth;