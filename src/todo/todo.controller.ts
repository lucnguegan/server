import { Controller, Post, Body, Get, HttpStatus, Res, Put, NotFoundException, Query, Param, UseInterceptors, Delete } from '@nestjs/common';
import { MorganInterceptor } from 'nest-morgan';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { TodosService } from './todo.service';


@Controller('todos')
export class TodosController {
    constructor(private todoService: TodosService) { }

    // Add Todo: /todoListe
    @Post()
    async addTodo(@Body() createTodoDTO: CreateTodoDTO) {
        return this.todoService.createTodo(createTodoDTO);
        // return res.status(HttpStatus.OK).json({
        //     message: 'Product Successfully Created',
        //     todo
        // });
    }

    // Get Todos /
    // @Get('/list')
    @Get()
    async getTodos(@Res() res) {
        const todos = await this.todoService.getTodos();
        return res.status(HttpStatus.OK).json(todos);
    }

    // GET single todo: /todo/5c9d46100e2e5c44c444b2d1
    @Get('/:todoID')
    async getTodo(@Res() res, @Param('todoID') todoID) {
        const todo = await this.todoService.getTodo(todoID);
        if (!todo) throw new NotFoundException('Todo does not exist!');
        return res.status(HttpStatus.OK).json(todo);
    }

    // Delete Todo: /delete?todoID=5c9d45e705ea4843c8d0e8f7
    @UseInterceptors(MorganInterceptor('combined'))
    @Delete('/delete')
    async deleteTodo(@Res() res, @Query('todoID') todoID) {
        const todoDeleted = await this.todoService.deleteTodo(todoID);
        if (!todoDeleted) throw new NotFoundException('Todo does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'todo Deleted Successfully',
            todoDeleted
        });
    }

    // Update todo: /update?todoID=5c9d45e705ea4843c8d0e8f7
    @Put('/update')
    async updateTodo(@Res() res, @Body() createTodoDTO: CreateTodoDTO, @Query('todoID') todoID) {
        const updatedTodo = await this.todoService.updateTodo(todoID, createTodoDTO);
        if (!updatedTodo) throw new NotFoundException('Todo does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Todo Updated Successfully',
            updatedTodo
        });
    }






}