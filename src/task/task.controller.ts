import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskEntity } from './task.entity';
// import { Task, TaskStatus } from './task.model';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) { }
    @Get()
    getAllTasks(): Promise<TaskEntity[]> {
        return this.taskService.getAllTasks()
    }
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto

    ): Promise<TaskEntity> {
        return this.taskService.createTask(createTaskDto);
    }
    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number
    ): Promise<TaskEntity> {
        return this.taskService.getTaskById(id)
    }

    @Get('/title/:name')
    getAllDescription(
        @Param('name') title: string
    ): Promise<TaskEntity[]> {
        return this.taskService.getAllDes(title);
    }

    @Delete('/:id')
    deleteTask(
        @Param('id') id: string
    ) {
        return this.taskService.deleteTask(id);
    }

    // @Patch('/:id/status')

    // updateTaskStatus(
    //     @Param('id') id: string,
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus
    // ): Task {
    //     return this.taskService.updateTaskStatus(id, status);
    // }
}
