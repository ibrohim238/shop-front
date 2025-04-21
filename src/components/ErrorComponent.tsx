// src/components/ErrorComponent.tsx
import { ReactElement } from 'react';

interface ErrorComponentProps {
    /** Сообщение об ошибке */
    message: string;
    /** Callback для повторной попытки действия */
    onRetry?: () => void;
}

export default function ErrorComponent({ message, onRetry }: ErrorComponentProps): ReactElement {
    return (
        <div className="p-6">
            <p className="text-red-500">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                    Повторить
                </button>
            )}
        </div>
    );
}