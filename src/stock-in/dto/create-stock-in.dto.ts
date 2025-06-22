import { IsNotEmpty, IsNumber, Min, IsOptional, IsString } from 'class-validator';

export class CreateStockInDto {
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;

  @IsOptional()
  @IsString({ message: 'Note must be a string' })
  note?: string;

  @IsNumber({}, { message: 'Item ID must be a number' })
  @IsNotEmpty({ message: 'Item ID is required' })
  item_id: number;
}