export interface IMedia {
    id: number;
    name: string;
    mime_type: string;
    collection_name: string;
    url: string;
    disk: string;
    created_at: string;
}

export class Media {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly mimeType: string,
        public readonly collectionName: string,
        public readonly url: string,
        public readonly disk: string,
        public readonly createdAt: string
    ) {}

    public static fromData(data: IMedia): Media {
        return new Media(
            data.id,
            data.name,
            data.mime_type,
            data.collection_name,
            data.url,
            data.disk,
            data.created_at
        );
    }
}
