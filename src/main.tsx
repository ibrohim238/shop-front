import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router';
import HomePage from '@/client/pages/HomePage';
import СlientProductDetailPage from '@/client/pages/ProductDetailPage';
import CartPage from '@/client/pages/CartPage';
import ClientOrdersPage from '@/client/pages/OrdersPage';
import ClientOrderDetailPage from '@/client/pages/OrderDetailPage';
import LoginPage from '@/client/pages/LoginPage';
import RegisterPage from '@/client/pages/RegisterPage';
import RequireAuth from '@/routes/RequireAuth';
import RequireAdmin from '@/routes/RequireAdmin';
import AdminLayout from '@/layouts/AdminLayout';
import MainLayout from '@/layouts/MainLayout';
import ProductsPage from '@/admin/pages/Products/ProductsPage.tsx';
import CouponsPage from '@/admin/pages/Coupons/CouponsPage.tsx';
import CategoriesPage from '@/admin/pages/Categories/CategoriesPage';
import '@/index.css';
import AdminProductDetailPage from "@/admin/pages/Products/ProductDetailPage/ProductDetailPage.tsx";
import ProductCreatePage from "@/admin/pages/Products/ProductCreatePage/ProductCreatePage.tsx";
import CouponCreatePage from "@/admin/pages/Coupons/CouponCreatePage/CouponCreatePage.tsx";
import CouponDetailPage from "@/admin/pages/Coupons/CouponDetailPage/CouponDetailPage.tsx";
import CategoryCreatePage from "@/admin/pages/Categories/CategoryCreatePage/CategoryCreatePage.tsx";
import CategoryDetailPage from "@/admin/pages/Categories/CategoryDetailPage/CategoryDetailPage.tsx";
import AdminOrdersPage from "@/admin/pages/Orders/OrdersPage.tsx";
import AdminOrdersDetailsPage from "@/admin/pages/Orders/OrderDetailPage/OrderDetailPage.tsx";

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
                    <Route path="orders" element={<ClientOrdersPage />} />
                    <Route path="orders/:id" element={<ClientOrderDetailPage />} />
                </Route>
            </Route>

            {/* Без лейаута */}
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            {/* Админская часть */}
            <Route path="admin" element={<AdminRoutes />}>
                <Route index element={<ProductsPage />} />
                <Route path="products"   element={<ProductsPage />} />
                <Route path="products/new"   element={<ProductCreatePage />} />
                <Route path="products/:id" element={<AdminProductDetailPage />} />
                <Route path="coupons"    element={<CouponsPage />} />
                <Route path="coupons/new" element={<CouponCreatePage />} />
                <Route path="coupons/:id" element={<CouponDetailPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="categories/new" element={<CategoryCreatePage />} />
                <Route path="categories/:slug" element={<CategoryDetailPage />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="orders/:id" element={<AdminOrdersDetailsPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
