export interface IProduct {
    _id?: string;
    title: string;
    description: string;
    image: string;
    price: number;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface IProductClassReturn {
    codeResponse: number;
    message: any;
    product?: IProduct;
    products?: IProduct[];
}
