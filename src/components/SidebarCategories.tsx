// src/components/SidebarCategories.tsx
import { useState, useEffect, ReactElement } from 'react'
import { useSearchParams } from 'react-router'
import { getCategories } from '@/client/services/CategoryService.ts'
import type { Category } from '@/models/Category.ts'
import { ChevronRight, ChevronDown } from 'lucide-react'

export default function SidebarCategories(): ReactElement {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()

    // выбранные категории из query-параметра «categories»
    const raw = searchParams.get('categories') || ''
    const selectedCategories: number[] = raw
        .split(',')
        .map(s => Number(s))
        .filter(n => !isNaN(n))

    // состояние для раскрытых узлов
    const [expanded, setExpanded] = useState<number[]>([])

    useEffect(() => {
        getCategories(1, 100)
            .then(res => setCategories(res.data))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    // переключить выбор фильтра
    const toggleCategory = (id: number | null) => {
        let next: number[]
        if (id === null) {
            next = []
        } else if (selectedCategories.includes(id)) {
            next = selectedCategories.filter(x => x !== id)
        } else {
            next = [...selectedCategories, id]
        }

        if (next.length > 0) {
            setSearchParams({ categories: next.join(',') })
        } else {
            setSearchParams({})
        }
    }

    // переключить раскрытие узла
    const toggleExpand = (id: number) => {
        setExpanded(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        )
    }

    if (loading) {
        return <div className="p-4 text-gray-500">Загрузка категорий…</div>
    }

    // рекурсивная отрисовка дерева
    const renderTree = (nodes: Category[], level = 0): ReactElement[] => {
        return nodes.map(node => {
            const hasChildren = node.children && node.children.length > 0
            const isOpen = expanded.includes(node.id)
            const isSelected = selectedCategories.includes(node.id)

            return (
                <li key={node.id}>
                    <div
                        className={`flex items-center justify-between cursor-pointer p-2 rounded 
              ${isSelected ? 'bg-blue-100 font-medium' : 'hover:bg-gray-100'}`}
                        style={{ paddingLeft: `${level * 1.5}rem` }}
                        onClick={() => toggleCategory(node.id)}
                    >
                        <div className="flex items-center space-x-2">
                            {hasChildren ? (
                                <button
                                    onClick={e => {
                                        e.stopPropagation()
                                        toggleExpand(node.id)
                                    }}
                                    className="p-1 focus:outline-none"
                                >
                                    {isOpen ? (
                                        <ChevronDown size={16} />
                                    ) : (
                                        <ChevronRight size={16} />
                                    )}
                                </button>
                            ) : (
                                <span className="w-4" />
                            )}

                            {node.media ? (
                                <img
                                    src={node.media.url}
                                    alt={node.name}
                                    className="w-6 h-6 rounded"
                                />
                            ) : (
                                <div className="w-6 h-6 bg-gray-200 rounded" />
                            )}

                            <span>{node.name}</span>
                        </div>
                        <input
                            type="checkbox"
                            checked={isSelected}
                            readOnly
                            className="form-checkbox h-4 w-4 text-blue-600"
                        />
                    </div>

                    {hasChildren && isOpen && (
                        <ul className="mt-1 space-y-1">
                            {renderTree(node.children, level + 1)}
                        </ul>
                    )}
                </li>
            )
        })
    }

    return (
        <aside className="w-64 h-screen bg-white rounded-lg shadow p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Категории</h2>
            <ul className="space-y-2">
                <li>
                    <div
                        className={`flex items-center justify-between cursor-pointer p-2 rounded 
              ${selectedCategories.length === 0 ? 'bg-blue-100 font-medium' : 'hover:bg-gray-100'}`}
                        onClick={() => toggleCategory(null)}
                    >
                        <span>Все категории</span>
                        <input
                            type="checkbox"
                            checked={selectedCategories.length === 0}
                            readOnly
                            className="form-checkbox h-4 w-4 text-blue-600"
                        />
                    </div>
                </li>
                {renderTree(categories)}
            </ul>
        </aside>
    )
}