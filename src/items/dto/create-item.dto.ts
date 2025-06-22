import { IsOptional, IsString, IsNumber, Min, MaxLength } from 'class-validator';

export class CreateItemDto {
    @IsString({ message: 'Name must be a string' })
    @MaxLength(100, { message: 'Name must not exceed 100 characters' })
    name: string;

    @IsOptional()
    @IsString({ message: 'Category must be a string' })
    @MaxLength(50, { message: 'Category must not exceed 50 characters' })
    category?: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsNumber({}, { message: 'Stock must be a number' })
    @Min(0, { message: 'Stock must be at least 0' })
    stock: number;

    @IsNumber({}, { message: 'Price must be a number' })
    @Min(0, { message: 'Price must be at least 0' })
    price: number;
}