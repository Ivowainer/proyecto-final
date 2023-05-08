import mongoose from "mongoose";

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserClassReturn {
    codeResponse: number;
    message: any;
    user?: IUser;
    users?: IUser[];
    token?: string;
}
