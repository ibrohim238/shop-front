import {type ChangeEvent, ReactElement} from 'react';

interface Props {
    label: string;
    onSelect: (e: ChangeEvent<HTMLInputElement>) => void;
    accept?: string;
}

export default function FileUpload({
                                       label,
                                       onSelect,
                                       accept = '*',
                                   }: Props): ReactElement {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                name="files"
                type="file"
                accept={accept}
                multiple
                onChange={onSelect}
                className="mt-1"
            />
        </div>
    );
}
