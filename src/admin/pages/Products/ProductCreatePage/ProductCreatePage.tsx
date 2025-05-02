import {useNavigate} from 'react-router';
import FormProduct from "@/admin/pages/Products/ProductCreatePage/ProductForm.tsx";
import {Product} from "@/models/Product.ts";

export default function ProductCreatePage() {
    const navigate = useNavigate();

    const handleSuccess = (newProduct: Product) => {
        navigate(`/admin/products/${newProduct.id}`);
    };


    return (
        <div className="container mx-auto p-6">
            <button onClick={() => navigate('/admin/products')} className="mb-4 text-blue-600 hover:underline">
                ← Назад к списку
            </button>
            <FormProduct success={handleSuccess}/>

        </div>
    );
}