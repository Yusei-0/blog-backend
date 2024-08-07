import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PostsService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { multerOptionsFactory } from '../config/multer.config';

@Controller('post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptionsFactory(new ConfigService())))
  create(@UploadedFile() image: Express.Multer.File, @Body() createPostDto: CreatePostDto) {
    if (image) {
      createPostDto.imageUrl = image.path;
    }
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', multerOptionsFactory(new ConfigService())))
  update(@Param('id') id: number, @UploadedFile() image: Express.Multer.File, @Body() updatePostDto: UpdatePostDto) {
    if (image) {
      updatePostDto.imageUrl = image.path;
    }
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postsService.remove(id);
  }

  @Post(':id/like')
  likePost(@Param('id') id: number) {
    return this.postsService.likePost(id);
  }
}
