import { Document } from 'mongoose';

export interface Todo extends Document {

    readonly nameTodo: string;
    readonly completed: boolean;

}