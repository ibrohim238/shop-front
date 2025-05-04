import {Outlet, Route} from "react-router";
import ProductsPage from "@/admin/pages/Products/ProductsPage.tsx";
import ProductCreatePage from "@/admin/pages/Products/ProductCreatePage/ProductCreatePage.tsx";
import AdminProductDetailPage from "@/admin/pages/Products/ProductDetailPage/ProductDetailPage.tsx";
import CouponsPage from "@/admin/pages/Coupons/CouponsPage.tsx";
import CouponCreatePage from "@/admin/pages/Coupons/CouponCreatePage/CouponCreatePage.tsx";
import CouponDetailPage from "@/admin/pages/Coupons/CouponDetailPage/CouponDetailPage.tsx";
import CategoriesPage from "@/admin/pages/Categories/CategoriesPage.tsx";
import CategoryCreatePage from "@/admin/pages/Categories/CategoryCreatePage/CategoryCreatePage.tsx";
import CategoryDetailPage from "@/admin/pages/Categories/CategoryDetailPage/CategoryDetailPage.tsx";
import AdminOrdersPage from "@/admin/pages/Orders/OrdersPage.tsx";
import AdminOrdersDetailsPage from "@/admin/pages/Orders/OrderDetailPage/OrderDetailPage.tsx";
import RequireAuth from "@/routes/RequireAuth.tsx";
import RequireAdmin from "@/routes/RequireAdmin.tsx";
import AdminLayout from "@/layouts/AdminLayout.tsx";

function AdminRoutesLayout() {
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


export default function AdminRoutes() {
    return (
        <Route element={<AdminRoutesLayout/>} path="admin">
            <Route index element={<ProductsPage/>}/>
            <Route path="products" element={<ProductsPage/>}/>
            <Route path="products/new" element={<ProductCreatePage/>}/>
            <Route path="products/:id" element={<AdminProductDetailPage/>}/>
            <Route path="coupons" element={<CouponsPage/>}/>
            <Route path="coupons/new" element={<CouponCreatePage/>}/>
            <Route path="coupons/:id" element={<CouponDetailPage/>}/>
            <Route path="categories" element={<CategoriesPage/>}/>
            <Route path="categories/new" element={<CategoryCreatePage/>}/>
            <Route path="categories/:slug" element={<CategoryDetailPage/>}/>
            <Route path="orders" element={<AdminOrdersPage/>}/>
            <Route path="orders/:id" element={<AdminOrdersDetailsPage/>}/>
        </Route>
    );
};