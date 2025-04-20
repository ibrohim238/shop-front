import type { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router';

interface RequireAuthProps {
    children: ReactElement;
}

export default function RequireAuth({ children }: RequireAuthProps): ReactElement {
    const token = localStorage.getItem('token');
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}
