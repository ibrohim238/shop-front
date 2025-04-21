// src/components/LoadingComponent.tsx
import { ReactElement } from 'react';

export default function LoadingComponent(): ReactElement {
    return (
        <div className="flex items-center justify-center h-64">
            <span className="text-gray-500">Загрузка...</span>
        </div>
    );
}