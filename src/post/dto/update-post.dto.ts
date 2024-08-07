import { IsString, IsArray, IsOptional } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsArray()
  categories?: Category[];

  @IsOptional()
  readTime?: number;
}
