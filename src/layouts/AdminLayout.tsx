import type {ReactElement, ReactNode} from 'react';
import { Link } from 'react-router';

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps ): ReactElement {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Админ-хедер */}
            <header className="bg-white shadow">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold">Админка</h1>
                    <nav className="space-x-4">
                        <Link to="products" className="hover:underline">
                            Товары
                        </Link>
                        <Link to="coupons" className="hover:underline">
                            Купоны
                        </Link>
                        <Link to="categories" className="hover:underline">
                            Категории
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Основной контент */}
            <main className="container mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
