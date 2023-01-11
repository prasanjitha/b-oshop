import { IsNotEmpty } from "class-validator";

export interface FeedPost {
    id: number;
    body: string;
    createdAt: Date;
}