// src/layouts/MainLayout.tsx
import type { ReactElement, ReactNode } from 'react';
import { Link, useNavigate } from 'react-router';
import { logout, isAuthenticated } from '@/services/AuthService';

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps): ReactElement {
    const navigate = useNavigate();
    const isAuth = isAuthenticated();

    const handleLogout = (): void => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="bg-blue-600 text-white">
                <div className="container mx-auto flex items-center justify-between py-4 px-6">
                    <Link to="/" className="text-2xl font-bold">
                        MyStore
                    </Link>
                    <nav className="flex items-center space-x-4">
                        <Link to="/" className="px-4 py-1 hover:underline">
                            Главная
                        </Link>
                        {isAuth && (
                            <Link to="/cart" className="px-4 py-1 hover:underline">
                                Корзина
                            </Link>
                        )}
                        {isAuth ? (
                            <button
                                onClick={handleLogout}
                                className="px-4 py-1 hover:underline bg-transparent"
                            >
                                Выйти
                            </button>
                        ) : (
                            <Link to="/login" className="px-4 py-1 hover:underline">
                                Войти
                            </Link>
                        )}
                    </nav>
                </div>
            </header>

            {/* Content */}
            <main className="flex-grow container mx-auto p-6">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 text-gray-600">
                <div className="container mx-auto py-4 px-6 text-center text-sm">
                    © {new Date().getFullYear()} MyStore. Все права защищены.
                </div>
            </footer>
        </div>
    );
}
