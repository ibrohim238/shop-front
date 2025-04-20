// src/common/models/Category.ts
import { Media, IMedia } from '@/models/Media.ts';

export interface ICategory {
    id: number;
    name: string;
    slug: string;
    media: IMedia | null;
    description: string;
    created_at: string;
    updated_at: string;
}

export class Category {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly slug: string,
        public readonly media: Media | null,
        public readonly description: string,
        public readonly created_at: Date,
        public readonly updated_at: Date
    ) {}

    public static fromData(data: ICategory): Category {
        return new Category(
            data.id,
            data.name,
            data.slug,
            data.media ? Media.fromData(data.media) : null,
            data.description,
            new Date(data.created_at),
            new Date(data.updated_at)
        );
    }
}
