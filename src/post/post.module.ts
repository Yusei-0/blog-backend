import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './post.service';
import { PostsController } from './post.controller';
import { Post } from './entities/post.entity';
import { CategoriesModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CategoriesModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
