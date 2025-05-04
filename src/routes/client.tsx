import {Outlet, Route} from "react-router";
import HomePage from "@/client/pages/HomePage.tsx";
import ProductDetailPage from "@/client/pages/ProductDetailPage.tsx";
import LoginPage from "@/client/pages/LoginPage.tsx";
import RegisterPage from "@/client/pages/RegisterPage.tsx";
import CartPage from "@/client/pages/CartPage.tsx";
import OrdersPage from "@/client/pages/OrdersPage.tsx";
import OrderDetailPage from "@/client/pages/OrderDetailPage.tsx";
import MainLayout from "@/layouts/MainLayout.tsx";
import RequireAuth from "@/routes/RequireAuth.tsx";


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


export default function ClientRoutes() {
    return (
        <Route element={<PublicRoutes/>}>
            <Route index element={<HomePage />} />
            <Route path="products/:id" element={<ProductDetailPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />


            <Route element={<ProtectedRoutes/>}>
                <Route path="cart" element={<CartPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="orders/:id" element={<OrderDetailPage />} />
            </Route>
        </Route>
    );
}