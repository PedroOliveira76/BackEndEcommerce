import { Category } from "@prisma/client";

interface Rating {
    rate?: number;
    count?: number;
  }

export class UpdateGameDto{
    id?:number
    title?: string;
    image?: string;
    price?: number;
    category?: Category;
    description?:string;
    rating?:Rating
}