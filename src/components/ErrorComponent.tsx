// src/components/ErrorComponent.tsx
import type { ReactElement } from 'react';
import { Link } from 'react-router';

interface ErrorComponentProps {
    message: string;
    backUrl?: string;
    backText?: string;
}

export default function ErrorComponent({
                                           message,
                                           backUrl,
                                           backText = '← Назад',
                                       }: ErrorComponentProps): ReactElement {
    return (
        <div className="p-6 text-center">
            <p className="text-red-500 mb-4">{message}</p>
            {backUrl && (
                <Link to={backUrl} className="text-blue-600 hover:underline">
                    {backText}
                </Link>
            )}
        </div>
    );
}
