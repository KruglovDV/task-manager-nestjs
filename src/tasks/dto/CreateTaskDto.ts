import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  header: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  executorId?: number;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsInt({ each: true })
  categories?: number[];
}
