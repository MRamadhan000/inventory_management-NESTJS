import { Controller, Post, Get, Param, Body, Delete, ParseIntPipe } from '@nestjs/common';
import { StockInService } from './stock-in.service';
import { CreateStockInDto } from './dto/create-stock-in.dto';

@Controller('stock-in')
export class StockInController {
  constructor(private readonly stockInService: StockInService) {}

  @Post()
  async create(@Body() dto: CreateStockInDto) {
    const result = await this.stockInService.create(dto);
    return {
      message: 'StockIn record created successfully',
      data: result,
    };
  }

  @Get()
  async findAll() {
    const data = await this.stockInService.findAll();
    return {
      message: 'StockIn records retrieved',
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.stockInService.findOne(id);
    return {
      message: 'StockIn record retrieved',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.stockInService.remove(id);
  }
}