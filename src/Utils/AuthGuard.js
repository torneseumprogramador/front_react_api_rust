import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function isUserDataValid() {
    const data = sessionStorage.getItem('userData');
    if (!data) return false;

    const parsedData = JSON.parse(data);
    const now = new Date();
    return now.getTime() < parsedData.expires;
}

export function AuthGuard({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserDataValid()) {
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    return isUserDataValid() ? children : null;
}
