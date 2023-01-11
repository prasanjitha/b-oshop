import { IsNotEmpty } from "class-validator";

export interface User {
    id: number;
    username: string;
    password: string;
    createdAt: Date;
}