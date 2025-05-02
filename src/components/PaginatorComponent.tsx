import type { ReactElement } from 'react';

interface PaginatorProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
}

export default function PaginatorComponent({
                                      currentPage,
                                      lastPage,
                                      onPageChange,
                                  }: PaginatorProps): ReactElement {
    const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

    return (
        <div className="flex justify-center mt-8 space-x-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
                Назад
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded ${
                        page === currentPage
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
                Вперёд
            </button>
        </div>
    );
}
