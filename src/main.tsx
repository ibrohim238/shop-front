import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router';
import HomePage from '@/client/pages/HomePage';
import СlientProductDetailPage from '@/client/pages/ProductDetailPage';

import AdminProductDetailPage from '@/admin/pages/ProductDetailPage';
import CartPage from '@/client/pages/CartPage';
import OrdersPage from '@/client/pages/OrdersPage';
import OrderDetailPage from '@/client/pages/OrderDetailPage';
import LoginPage from '@/client/pages/LoginPage';
import RegisterPage from '@/client/pages/RegisterPage';
import RequireAuth from '@/routes/RequireAuth';
import RequireAdmin from '@/routes/RequireAdmin';
import AdminLayout from '@/layouts/AdminLayout';
import MainLayout from '@/layouts/MainLayout';
import ProductsPage from '@/admin/pages/ProductsPage';
import CouponsPage from '@/admin/pages/CouponsPage';
import CategoriesPage from '@/admin/pages/CategoriesPage';
import '@/index.css';

function PublicRoutes() {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
}

function ProtectedRoutes() {
    return (
        <RequireAuth>
            <Outlet />
        </RequireAuth>
    );
}

function AdminRoutes() {
    return (
        <RequireAuth>
            <RequireAdmin>
                <AdminLayout>
                    <Outlet />
                </AdminLayout>
            </RequireAdmin>
        </RequireAuth>
    );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <Routes>
            {/* Публичная обёртка */}
            <Route element={<PublicRoutes />}>
                <Route index element={<HomePage />} />
                <Route path="products/:id" element={<СlientProductDetailPage />} />

                {/* Всё, что требует логина */}
                <Route element={<ProtectedRoutes />}>
                    <Route path="cart" element={<CartPage />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="orders/:id" element={<OrderDetailPage />} />
                </Route>
            </Route>

            {/* Без лейаута */}
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            {/* Админская часть */}
            <Route path="admin" element={<AdminRoutes />}>
                <Route index element={<ProductsPage />} />
                <Route path="products"   element={<ProductsPage />} />
                <Route path="products/:id" element={<AdminProductDetailPage />} />
                <Route path="coupons"    element={<CouponsPage />} />
                <Route path="categories" element={<CategoriesPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
