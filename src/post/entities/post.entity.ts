import { Category } from 'src/category/entities/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: 0 })
  likes: number;

  @Column()
  readTime: number;

  @ManyToMany(() => Category, (category) => category.posts, { cascade: true })
  @JoinTable()
  categories: Category[];
}
