export interface IPerson extends IPersonBody{
    id: string;
    created_at: Date;
    updated_at: Date | null;
}

export interface IPersonBody {
    first_name: string;
    last_name: string;
    email: string;
}