import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './interfaces/Todo';
import { CreateTodoDTO } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
    constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) { }

    //Get all Todos
    async getTodos(): Promise<Todo[]> {
        const todos = await this.todoModel.find();
        return todos;
    }

    // Get a single todo
    async getTodo(todoID: string): Promise<Todo> {
        const todo = await this.todoModel.findById(todoID);
        return todo;
    }

    // Post a single todo
    async createTodo(createTodoDTO: CreateTodoDTO): Promise<Todo> {
        const newTodo = new this.todoModel(createTodoDTO);
        return newTodo.save();
    }

    // Delete todo
    async deleteTodo(todoID: string): Promise<any> {
        const deletedTodo = await this.todoModel.findByIdAndDelete(todoID);
        return deletedTodo;
    }

    // Put a single todo
    async updateTodo(todoID: string, createTodoDTO: CreateTodoDTO): Promise<Todo> {
        const updatedTodo = await this.todoModel
            .findByIdAndUpdate(todoID, createTodoDTO, { new: true });
        return updatedTodo;
    }


}