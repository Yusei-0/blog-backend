import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import readingTime from 'reading-time';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  private calculateReadTime(content: string): number {
    const stats = readingTime(content);
    return stats.minutes;
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const readTime = this.calculateReadTime(createPostDto.content);
    const post = this.postsRepository.create({
      ...createPostDto,
      readTime,
    });
    return this.postsRepository.save(post);
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['categories'] });
  }

  findOne(id: number): Promise<Post> {
    return this.postsRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.postsRepository.update(id, updatePostDto);
    return this.postsRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }

  async likePost(id: number): Promise<Post> {
    const post = await this.postsRepository.findOneBy({ id });
    post.likes++;
    return this.postsRepository.save(post);
  }
}
