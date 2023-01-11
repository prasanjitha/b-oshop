import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';


@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>
    ) { }
    // private tasks: Task[] = [];

    async getAllTasks(): Promise<TaskEntity[]> {
        return await this.taskRepository.query(`select * from task`);;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        const { title, description } = createTaskDto;
        const task = new TaskEntity();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.DONE;
        await this.taskRepository.save(task);
        return task;
    }
    async getTaskById(id: any): Promise<TaskEntity> {
        const found = await this.taskRepository.query(`select * from task where id=${id}`);
        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return found;
    }

    // getTaskByID(id: string): Task {
    //     const found = this.tasks.find(task => task.id === id);
    //     if (!found) {
    //         throw new NotFoundException(`Task with id "${id}" not found.`)
    //     }
    //     return found;

    // }

    async deleteTask(id: string): Promise<void> {
        const found = this.getTaskById(id);
        if (found) {
            await this.taskRepository.query(`delete from task where id=${id}`);
        }

    }

    async getAllDes(title: string): Promise<TaskEntity[]> {
        console.log(title);
        let newData = [];
        const data = await this.getAllTasks()
        for (let d of data) {
            if (d.title === title) {
                newData.push(d);
            }
        }
        return newData;
    }

    // updateTaskStatus(id: string, status: TaskStatus) {
    //     const task = this.getTaskByID(id);
    //     task.status = status;
    //     return task;
    // }
}
