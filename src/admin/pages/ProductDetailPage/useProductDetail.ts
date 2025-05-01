// src/admin/hooks/useProductDetail.ts
import { useState, useEffect } from 'react';
import { getProductById } from '@/admin/services/ProductService.ts';
import type { Product } from '@/models/Product.ts';

export function useProductDetail(productId: number) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isNaN(productId)) {
            setError('Некорректный ID товара');
            setLoading(false);
            return;
        }
        getProductById(productId)
            .then(prod => setProduct(prod))
            .catch(err => {
                console.error(err);
                setError('Не удалось загрузить данные товара');
            })
            .finally(() => setLoading(false));
    }, [productId]);

    return { product, setProduct, loading, error } as const;
}