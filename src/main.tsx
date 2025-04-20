// src/main.tsx
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router';
import HomePage from '@/client/pages/HomePage';
import ProductDetailPage from '@/client/pages/ProductDetailPage';
import CartPage from '@/client/pages/CartPage';
import OrdersPage from '@/client/pages/OrdersPage';
import OrderDetailPage from '@/client/pages/OrderDetailPage';
import LoginPage from '@/client/pages/LoginPage';
import RequireAuth from '@/routes/RequireAuth';
import RegisterPage from '@/client/pages/RegisterPage';
import AdminLayout from '@/layouts/AdminLayout';
import ProductsPage from '@/admin/pages/ProductsPage';
import CouponsPage from '@/admin/pages/CouponsPage';
import CategoriesPage from '@/admin/pages/CategoriesPage';
import '@/index.css';
import RequireAdmin from "@/routes/RequireAdmin.tsx";

const root = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route index element={<HomePage/>}/>
            <Route path="products/:id" element={<ProductDetailPage/>}/>
            <Route
                path="cart"
                element={
                    <RequireAuth>
                        <CartPage/>
                    </RequireAuth>
                }
            />
            <Route
                path="orders"
                element={
                    <RequireAuth>
                        <OrdersPage/>
                    </RequireAuth>
                }
            />
            <Route
                path="orders/:id"
                element={
                    <RequireAuth>
                        <OrderDetailPage/>
                    </RequireAuth>
                }
            />
            <Route path="login" element={<LoginPage/>}/>
            <Route path="register" element={<RegisterPage/>}/>
            <Route
                path="admin"
                element={
                    <RequireAuth>
                        <RequireAdmin>
                            <AdminLayout/>
                        </RequireAdmin>
                    </RequireAuth>
                }
            >
                <Route index element={<ProductsPage/>}/>
                <Route path="products" element={<ProductsPage/>}/>
                <Route path="coupons" element={<CouponsPage/>}/>
                <Route path="categories" element={<CategoriesPage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
);
