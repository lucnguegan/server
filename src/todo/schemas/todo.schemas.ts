import { Schema } from "mongoose";

export const TodoSchema = new Schema({
    nameTodo: String,
    completed: Boolean,
}); 