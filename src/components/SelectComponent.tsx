import { Fragment, useState, useEffect, ReactElement } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';

export interface Option<T> {
  /** Значение опции */
  value: T;
  /** Отображаемая метка опции */
  label: string;
}

interface AsyncResult<T> {
  options: Option<T>[];
  hasMore: boolean;
  additional: { page: number };
}

interface Props<T> {
  /** Выбранное значение */
  selected: T | null;
  /** Callback при изменении выбора */
  onChange: (value: T) => void;
  /** Плейсхолдер для кнопки */
  placeholder?: string;
  /** Максимальная высота списка */
  maxHeight?: string;
  /**
   * Функция для асинхронной подгрузки опций.
   * Вызывается с параметрами (строка поиска, уже загруженные опции, объект с номером страницы)
   */
  loadOptions: (
    inputValue: string,
    _loadedOptions: Option<T>[],
    additional: { page: number }
  ) => Promise<AsyncResult<T>>;
}

export default function SelectComponent<T>({
  selected,
  onChange,
  placeholder = 'Выберите...',
  maxHeight = 'max-h-60',
  loadOptions,
}: Props<T>): ReactElement {
  const [search, setSearch] = useState<string>('');
  const [asyncOptions, setAsyncOptions] = useState<Option<T>[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Загружаем опции при изменении строки поиска
  useEffect(() => {
    setLoading(true);
    loadOptions(search, [], { page: 1 })
      .then(result => {
        setAsyncOptions(result.options);
        setPage(result.additional.page);
      })
      .catch(() => {
        setAsyncOptions([]);
      })
      .finally(() => setLoading(false));
  }, [search, loadOptions]);

  // Находим выбранную опцию по значению
  const selectedOption = asyncOptions.find(opt => 
    String(opt.value) === String(selected)
  );

  // Текст для кнопки: либо метка выбранной опции, либо плейсхолдер
  const buttonText = selectedOption ? selectedOption.label : placeholder;

  return (
    <Listbox value={selected} onChange={(value: T) => onChange(value)}>
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
            className={`absolute z-10 mt-1 w-full bg-white shadow-lg ${maxHeight} rounded-md py-1 text-base overflow-auto focus:outline-none`}
          >
            <div className="px-3 py-2">
              <input
                type="text"
                placeholder="Поиск..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>

            {loading ? (
              <p className="p-2 text-gray-500 text-sm">Загрузка...</p>
            ) : asyncOptions.length > 0 ? (
              asyncOptions.map(opt => (
                <Listbox.Option
                  key={String(opt.value)}
                  value={opt.value}
                  className={({ active }) =>
                    `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                      active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected: isSelected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          isSelected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {opt.label}
                      </span>
                      {isSelected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <Check className="w-5 h-5 text-blue-600" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))
            ) : (
              <p className="p-2 text-gray-500 text-sm">Ничего не найдено</p>
            )}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}