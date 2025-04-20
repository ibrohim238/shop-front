// src/main.tsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from '@/pages/HomePage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CartPage from '@/pages/CartPage';
import LoginPage from '@/pages/LoginPage';
import RequireAuth from '@/routes/RequireAuth';
import '@/index.css';

const root = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="products/:id" element={<ProductDetailPage />} />
            <Route
                path="cart"
                element={
                    <RequireAuth>
                        <CartPage />
                    </RequireAuth>
                }
            />
            <Route path="login" element={<LoginPage />} />
        </Routes>
    </BrowserRouter>
);
