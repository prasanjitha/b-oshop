import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesGuard } from 'src/roles.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { FeedPost } from './feed.model';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
    constructor(private feedService: FeedService) { }

    @Post()
    @UsePipes(ValidationPipe)
    createFeed(
        @Body() post: CreatePostDto
    ): Promise<FeedPost> {
        return this.feedService.createPost(post);
    }
    @Get()
    @UseGuards(RolesGuard)
    getAllFeed(): Promise<FeedPost[]> {
        return this.feedService.findAllPost();
    }
    @Get(':id')
    getFeedById(
        @Param('id') id: number
    ): Promise<FeedPost> {
        return this.feedService.findPostById(id);
    }
    @Put(':id')
    updatePost(
        @Param('id') id: number,
        @Body() feedPost: FeedPost
    ): Promise<UpdateResult> {
        return this.feedService.updatePost(id, feedPost);
    }
    @Delete(':id')
    deletePost(
        @Param('id') id: number

    ): Promise<DeleteResult> {
        return this.feedService.deletePost(id);
    }
}
