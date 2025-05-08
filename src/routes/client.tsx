import { Route } from "react-router";
import HomePage from "@/client/pages/HomePage";
import ProductDetailPage from "@/client/pages/ProductDetailPage";
import LoginPage from "@/client/pages/LoginPage";
import RegisterPage from "@/client/pages/RegisterPage";
import CartPage from "@/client/pages/CartPage";
import OrdersPage from "@/client/pages/OrdersPage";
import OrderDetailPage from "@/client/pages/OrderDetailPage";
import MainLayout from "@/layouts/MainLayout";
import RequireAuth from "@/routes/RequireAuth";
import RequireGuest from "@/routes/RequireGuest.tsx";


export default function ClientRoutes() {
    return (
        <Route element={<MainLayout/>}>
            <Route index element={<HomePage />} />
            <Route path="products/:id" element={<ProductDetailPage />} />
            <Route element={<RequireGuest/>}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
            </Route>


            <Route element={<RequireAuth/>}>
                <Route path="cart" element={<CartPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="orders/:id" element={<OrderDetailPage />} />
            </Route>
        </Route>
    );
}