// src/stock-in/stock-in.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockIn } from './entities/stock-in.entity';
import { CreateStockInDto } from './dto/create-stock-in.dto';
import { Item } from '../items/entities/item.entity';

@Injectable()
export class StockInService {
  constructor(
    @InjectRepository(StockIn)
    private readonly stockInRepo: Repository<StockIn>,

    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
  ) { }

  async create(dto: CreateStockInDto): Promise<StockIn> {
    const item = await this.itemRepo.findOneBy({ item_id: dto.item_id });
    if (!item) throw new NotFoundException('Item not found');

    const stockIn = this.stockInRepo.create({
      quantity: dto.quantity,
      note: dto.note,
      item,
    });

    await this.itemRepo.update(item.item_id, { stock: item.stock + dto.quantity });

    return this.stockInRepo.save(stockIn);
  }

  async findAll(): Promise<StockIn[]> {
    return this.stockInRepo.find({ relations: ['item'] });
  }

  async findOne(id: number): Promise<StockIn> {
    const stockIn = await this.stockInRepo.findOne({
      where: { in_id: id },
      relations: ['item'],
    });
    if (!stockIn) throw new NotFoundException('StockIn record not found');
    return stockIn;
  }

  async remove(id: number): Promise<{ message: string }> {
    const record = await this.findOne(id);
    await this.stockInRepo.remove(record);
    return { message: `StockIn with ID ${id} deleted` };
  }
}