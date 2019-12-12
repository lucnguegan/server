import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosController } from './todo.controller';
import { TodosService } from './todo.service';
import { MorganModule } from 'nest-morgan';
import { TodoSchema } from './schemas/todo.schemas';

@Module({
    imports: [
        MorganModule.forRoot(),
        MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],

    controllers: [TodosController],
    providers: [TodosService],
})
export class TodoModule { }