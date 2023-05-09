import { IProduct } from "./ProductTypes";

export interface ICart {
    _id?: string;
    products: IProduct[];
    productId?: string;
    address: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICartClassReturn {
    codeResponse: number;
    message: any;
    cart?: ICart;
}
