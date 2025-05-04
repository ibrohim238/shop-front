export interface IRole {
    name: string;
}

export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    roles: IRole[];
    created_at: string;
    updated_at: string;
}

export class User {
    constructor(
        public readonly id: number,
        public readonly first_name: string,
        public readonly last_name: string,
        public readonly email: string,
        public readonly roles: IRole[],
        public readonly created_at: Date,
        public readonly updated_at: Date
    ) {}

    public static fromData(data: IUser): User {
        return new User(
            data.id,
            data.first_name,
            data.last_name,
            data.email,
            data.roles,
            new Date(data.created_at),
            new Date(data.updated_at)
        );
    }
}
