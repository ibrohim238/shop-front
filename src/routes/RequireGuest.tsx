import type { ReactElement } from 'react';
import {Navigate, Outlet} from 'react-router';
import {useAuth} from "@/common/context/provider/AuthContextProvider.tsx";

export default function RequiredGuest(): ReactElement {
    const { isAuth } = useAuth();

    if (isAuth) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}
