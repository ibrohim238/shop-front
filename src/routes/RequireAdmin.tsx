// src/common/components/RequireAdmin.tsx
import { ReactElement, useEffect, useState } from 'react';
import {Outlet, useNavigate} from 'react-router';
import { getUser } from '@/common/services/UserService';
import { User } from '@/models/User';

/**
 * Обёртка для админ‑страниц.
 * Проверяет роль текущего пользователя и
 * перенаправляет не‑админа на главную.
 */
export default function RequireAdmin(): ReactElement {
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const user: User = await getUser();
                const isAdmin = user.roles.some(r => r.name === 'admin');
                if (!isAdmin) {
                    navigate('/', { replace: true });
                }
            } catch {
                // если не залогинен или fetch упал
                navigate('/login', { replace: true });
            } finally {
                setChecking(false);
            }
        })();
    }, [navigate]);

    if (checking) {
        // Пока проверяем — можно вывести спиннер
        return <div className="flex items-center justify-center h-screen">Проверка доступа…</div>;
    }

    return <Outlet />;
}
