// src/components/LoadingComponent.tsx
import type { ReactElement } from 'react';

export default function LoadingComponent(): ReactElement {
    return (
        <div className="p-6 text-center">
            <span className="text-gray-500">Загрузка...</span>
        </div>
    );
}
