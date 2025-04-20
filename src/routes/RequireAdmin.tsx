// src/common/components/RequireAdmin.tsx
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getUser } from '@/common/services/UserService';
import { User } from '@/models/User';

interface RequireAdminProps {
    children: ReactNode;
}

/**
 * Обёртка для админ‑страниц.
 * Проверяет роль текущего пользователя и
 * перенаправляет не‑админа на главную.
 */
export default function RequireAdmin({ children }: RequireAdminProps): ReactElement {
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const user: User = await getUser();
                console.log(123);
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

    return <>{children}</>;
}
