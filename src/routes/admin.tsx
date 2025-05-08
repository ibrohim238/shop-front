import { Route } from "react-router";
import ProductsPage from "@/admin/pages/Products/ProductsPage.tsx";
import ProductCreatePage from "@/admin/pages/Products/ProductCreatePage";
import ProductDetailPage from "@/admin/pages/Products/ProductDetailPage";
import CouponsPage from "@/admin/pages/Coupons/CouponsPage.tsx";
import CouponCreatePage from "@/admin/pages/Coupons/CouponCreatePage";
import CouponDetailPage from "@/admin/pages/Coupons/CouponDetailPage";
import CategoriesPage from "@/admin/pages/Categories/CategoriesPage.tsx";
import CategoryCreatePage from "@/admin/pages/Categories/CategoryCreatePage";
import CategoryDetailPage from "@/admin/pages/Categories/CategoryDetailPage";
import OrdersPage from "@/admin/pages/Orders/OrdersPage.tsx";
import OrdersDetailsPage from "@/admin/pages/Orders/OrderDetailPage";
import RequireAdmin from "@/routes/RequireAdmin.tsx";
import AdminLayout from "@/layouts/AdminLayout.tsx";

export default function AdminRoutes() {
    return (
        <Route element={<RequireAdmin/>}>
            <Route element={<RequireAdmin/>}>
                <Route element={<AdminLayout/>} path="admin">
                    <Route index element={<ProductsPage/>}/>
                    <Route path="products" element={<ProductsPage/>}/>
                    <Route path="products/new" element={<ProductCreatePage/>}/>
                    <Route path="products/:id" element={<ProductDetailPage/>}/>
                    <Route path="coupons" element={<CouponsPage/>}/>
                    <Route path="coupons/new" element={<CouponCreatePage/>}/>
                    <Route path="coupons/:id" element={<CouponDetailPage/>}/>
                    <Route path="categories" element={<CategoriesPage/>}/>
                    <Route path="categories/new" element={<CategoryCreatePage/>}/>
                    <Route path="categories/:slug" element={<CategoryDetailPage/>}/>
                    <Route path="orders" element={<OrdersPage/>}/>
                    <Route path="orders/:id" element={<OrdersDetailsPage/>}/>
                </Route>
            </Route>
        </Route>
    );
};