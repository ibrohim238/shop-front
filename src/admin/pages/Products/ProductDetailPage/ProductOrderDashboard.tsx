import { useState, ChangeEvent } from "react";
import ProductOrderChart from "@/admin/pages/Products/ProductDetailPage/ProductOrderChart";
import ProductOrderMetrics from "@/admin/pages/Products/ProductDetailPage/ProductOrderMetrics";

interface Props {
    productId: number
}

export function ProductOrderDashboard({ productId }: Props) {
    // изначально null, потом массив из 1–2 дат
    const [dateRange, setDateRange] = useState<string[] | null>(null);

    const handleDateChange = (index: 0 | 1) => (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!value) return;
        setDateRange(prev => {
            // если ещё не было массива, создаём пустой
            const newArr = prev ? [...prev] : [];
            newArr[index] = value;
            return newArr;
        });
    };

    return (
        <div>
            <div>
                <div className="flex items-end">
                    <div className="mx-2">
                        <label className="block mx-2 text-sm font-medium text-gray-700">
                            Начальная дата
                        </label>
                        <input
                            type="date"
                            value={dateRange?.[0] ?? ""}
                            onChange={handleDateChange(0)}
                        className="mt-1 block w-64 border rounded p-2"
                    />
                    </div>
                    <div className="mx-2">
                        <label className="block mx-2 text-sm font-medium text-gray-700">
                            Конечная дата
                        </label>
                        <input
                            type="date"
                            value={dateRange?.[1] ?? ""}
                            onChange={handleDateChange(1)}
                        className="mt-1 block w-64 border rounded p-2"
                    />
                    </div>
                    <div className="mx-2">
                        <button
                            type="button"
                            onClick={() => setDateRange(null)}
                            className="mt-1 px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300"
                        >
                            Сбросить
                        </button>
                    </div>
                </div>
            </div>

            <ProductOrderChart productId={productId} dateRange={dateRange} />
            <ProductOrderMetrics productId={productId} dateRange={dateRange} />
        </div>
    );
}