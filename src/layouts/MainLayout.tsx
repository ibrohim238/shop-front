// src/layouts/MainLayout.tsx
import {ReactElement} from 'react';
import {Link, Outlet, useNavigate} from 'react-router';
import {useAuth} from "@/common/context/provider/AuthContextProvider.tsx";

export default function MainLayout(): ReactElement {
    const navigate = useNavigate();
    const { isAuth, logout } = useAuth();

    const handleLogout = (): void => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <div className="flex flex-col min-h-screen">
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
                            <>
                                <Link to="/orders" className="px-4 py-1 hover:underline">
                                    Мои заказы
                                </Link>
                                <Link to="/cart" className="px-4 py-1 hover:underline">
                                    Корзина
                                </Link>
                            </>
                        )}
                        {isAuth ? (
                            <button
                                onClick={handleLogout}
                                className="px-4 py-1 hover:underline bg-transparent"
                            >
                                Выйти
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="px-4 py-1 hover:underline">
                                    Войти
                                </Link>
                                <Link to="/register" className="px-4 py-1 hover:underline">
                                    Регистрация
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            <main className="flex-grow container mx-auto p-6">
                <Outlet/>
            </main>

            <footer className="bg-gray-100 text-gray-600">
                <div className="container mx-auto py-4 px-6 text-center text-sm">
                    © {new Date().getFullYear()} MyStore. Все права защищены.
                </div>
            </footer>
        </div>
    );
}
