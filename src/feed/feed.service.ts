import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { DeleteResult, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { threadId } from 'worker_threads';
import { CreatePostDto } from './dto/create-post.dto';
import { FeedPostEntity } from './feed.entity';
import { FeedPost } from './feed.model';

@Injectable()
export class FeedService {
    constructor(
        @InjectRepository(FeedPostEntity)
        private readonly feedPostRepository: Repository<FeedPostEntity>) { }

    async createPost(feedPost: CreatePostDto): Promise<FeedPost> {
        return await this.feedPostRepository.save(feedPost);
    }

    async findAllPost(): Promise<FeedPost[]> {
        return await this.feedPostRepository.find();
    }
    async findPostById(id: number): Promise<FeedPost> {
        const found = await this.feedPostRepository.findOne({ where: { id } });
        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return found;
    }
    async updatePost(id: number, feedPost: FeedPost): Promise<UpdateResult> {
        const found = await this.findPostById(id);
        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return await this.feedPostRepository.update(id, feedPost);
    }
    async deletePost(id: number): Promise<DeleteResult> {
        const found = await this.findPostById(id);
        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return await this.feedPostRepository.delete(id);
    }
}
