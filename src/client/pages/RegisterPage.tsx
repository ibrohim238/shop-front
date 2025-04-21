// src/pages/RegisterPage.tsx
import { useState, ReactElement, FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { RegisterDto } from '@/client/dtos/RegisterDto.ts';
import { register as registerService } from '@/common/services/AuthService.ts';

export default function RegisterPage(): ReactElement {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const dto = new RegisterDto(
                firstName,
                lastName,
                email,
                password,
                passwordConfirmation
            );
            await registerService(dto);
            navigate('/login', { replace: true });
        } catch {
            setError('Не удалось зарегистрироваться');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
                <h1 className="text-2xl font-semibold mb-4">Регистрация</h1>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Имя</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            required
                            disabled={loading}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Фамилия</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            required
                            disabled={loading}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
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
                    <div>
                        <label className="block text-sm mb-1">Подтверждение пароля</label>
                        <input
                            type="password"
                            value={passwordConfirmation}
                            onChange={e => setPasswordConfirmation(e.target.value)}
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
                        {loading ? 'Регистрируем...' : 'Зарегистрироваться'}
                    </button>
                </form>
            </div>
        </>
    );
}
