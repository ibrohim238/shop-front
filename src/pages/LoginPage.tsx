// src/pages/LoginPage.tsx
import { useState, useEffect, ReactElement, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router';
import MainLayout from '@/layouts/MainLayout';
import { authenticate, isAuthenticated } from '@/services/AuthService';

export default function LoginPage(): ReactElement {
    const navigate = useNavigate();
    const location = useLocation() as { state?: { from: Location } };
    const from = location.state?.from?.pathname || '/';

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Если уже авторизован, сразу перенаправляем
    useEffect(() => {
        if (isAuthenticated()) {
            navigate(from, { replace: true });
        }
    }, [navigate, from]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await authenticate(username, password);
            navigate(from, { replace: true });
        } catch {
            setError('Неверное имя пользователя или пароль');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="max-w-sm mx-auto p-6 bg-white shadow rounded">
                <h1 className="text-2xl font-semibold mb-4">Вход</h1>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            disabled={loading}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Пароль</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Входим...' : 'Войти'}
                    </button>
                </form>
            </div>
        </MainLayout>
    );
}
