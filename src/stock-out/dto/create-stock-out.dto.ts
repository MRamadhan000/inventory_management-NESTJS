import { IsInt, IsNotEmpty, IsOptional, Min, IsString } from 'class-validator';

export class CreateStockOutDto {
  @IsInt()
  @IsNotEmpty()
  itemId: number;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsString()
  note?: string;
}