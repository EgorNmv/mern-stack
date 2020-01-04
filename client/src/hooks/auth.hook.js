import {useState, useCallback, useEffect} from "react";

const storageName = "userData";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
    const [userId, setUserId] = useState(null);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);
        try {
            localStorage.setItem(storageName, JSON.stringify({userId: id, token: jwtToken}));
        } catch (e) {
            console.error(e);
        }
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem(storageName));
            if (data && data.token) {
                login(data.token, data.userId);
            }
            setReady(true);
        } catch (e) {
            console.error(e);
        }
    }, [login]);

    return {login, logout, token, userId, ready};
};