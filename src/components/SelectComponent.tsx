import {
  Fragment,
  useState,
  useEffect,
  useRef,
  ReactElement,
  UIEvent,
} from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Check, ChevronDown } from 'lucide-react'

export interface Option<T> {
  /** Значение опции */
  value: T
  /** Отображаемая метка опции */
  label: string
}

interface AsyncResult<T> {
  /** Загруженные опции */
  options: Option<T>[]
  /** Есть ли ещё страницы */
  hasMore: boolean
  /** Данные пагинации */
  additional: { page: number }
}

export interface Props<T> {
  /** Текущее выбранное значение */
  selected: T | null
  /** Коллбэк при изменении выбора */
  onChange: (value: T) => void
  /** Плейсхолдер кнопки */
  placeholder?: string
  /** Максимальная высота списка (CSS-класс) */
  maxHeight?: string
  /**
   * Функция загрузки опций.
   * @param inputValue строка поиска
   * @param loadedOptions уже загруженные опции
   * @param additional номер страницы
   */
  loadOptions: (
    inputValue: string,
    loadedOptions: Option<T>[],
    additional: { page: number }
  ) => Promise<AsyncResult<T>>
}

export default function SelectComponent<T>({
  selected,
  onChange,
  placeholder = 'Выберите...',
  maxHeight = 'max-h-60',
  loadOptions,
}: Props<T>): ReactElement {
  const [search, setSearch] = useState<string>('')
  const [asyncOptions, setAsyncOptions] = useState<Option<T>[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  // Храним актуальный список опций в ref, чтобы не добавлять его в зависимости
  const optionsRef = useRef<Option<T>[]>([])
  useEffect(() => {
    optionsRef.current = asyncOptions
  }, [asyncOptions])

  // Сброс при изменении поиска
  useEffect(() => {
    setAsyncOptions([])
    setPage(1)
    setHasMore(false)
  }, [search])

  // Загрузка опций (первой или следующей страницы)
  useEffect(() => {
    let active = true
    setLoading(true)

    const prev = page === 1 ? [] : optionsRef.current

    loadOptions(search, prev, { page })
      .then(result => {
        if (!active) return
        setAsyncOptions(curr =>
          page === 1 ? result.options : [...curr, ...result.options]
        )
        setHasMore(result.hasMore)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [search, page, loadOptions])

  // Обработчик скролла для подгрузки следующей страницы
  const handleScroll = (e: UIEvent<HTMLElement>) => {
    const el = e.currentTarget
    if (
      !loading &&
      hasMore &&
      el.scrollHeight - el.scrollTop <= el.clientHeight + 20
    ) {
      setPage(prev => prev + 1)
    }
  }

  // Отображаем выбранную опцию
  const selectedOption = asyncOptions.find(
    opt => String(opt.value) === String(selected)
  )
  const buttonText = selectedOption ? selectedOption.label : placeholder

  return (
    <Listbox value={selected} onChange={(val: T) => onChange(val)}>
      <div className="relative">
        <Listbox.Button className="w-full border rounded p-2 flex justify-between items-center">
          <span>{buttonText}</span>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            onScroll={handleScroll}
            className={`absolute z-10 mt-1 w-full bg-white shadow-lg ${maxHeight} rounded-md py-1 text-base overflow-auto focus:outline-none`}
          >
            <div className="px-3 py-2 sticky top-0 bg-white">
              <input
                type="text"
                placeholder="Поиск..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>

            {asyncOptions.length === 0 && !loading && (
              <p className="p-2 text-gray-500 text-sm">Ничего не найдено</p>
            )}

            {asyncOptions.map(opt => (
              <Listbox.Option
                key={String(opt.value)}
                value={opt.value}
                className={({ active }) =>
                  `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                    active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                  }`
                }
              >
                {({ selected: isSel }) => (
                  <>
                    <span
                      className={`block truncate ${
                        isSel ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {opt.label}
                    </span>
                    {isSel && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Check className="w-5 h-5 text-blue-600" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}

            {loading && (
              <p className="p-2 text-gray-500 text-sm">Загрузка...</p>
            )}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}