import { type ChangeEvent, ReactElement } from 'react';

interface Props {
  label: string;
  onSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  multiple?: boolean;
}

export default function FileUploadComponent({
  label,
  onSelect,
  accept = '*',
  multiple = true,
}: Props): ReactElement {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        name="file"
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onSelect}
        className="mt-1"
      />
    </div>
  );
}