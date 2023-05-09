import { ObjectId } from "mongoose";

export interface IProduct {
    _id?: string;
    title: string;
    description: string;
    image: string;
    price: number;
    category: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface IProductClassReturn {
    codeResponse: number;
    message: any;
    product?: IProduct;
    products?: IProduct[];
}
