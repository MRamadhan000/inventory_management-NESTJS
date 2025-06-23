import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockOut } from './entities/stock-out.entity';
import { CreateStockOutDto } from './dto/create-stock-out.dto';
import { UpdateStockOutDto } from './dto/update-stock-out.dto';
import { Item } from 'src/items/entities/item.entity';

@Injectable()
export class StockOutService {
  constructor(
    @InjectRepository(StockOut)
    private readonly stockOutRepo: Repository<StockOut>,

    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
  ) { }

  async create(dto: CreateStockOutDto): Promise<StockOut> {
    const item = await this.itemRepo.findOne({ where: { item_id: dto.itemId } });
    if (!item) {
      throw new NotFoundException('Item not found');
    }

    if (item.stock < dto.quantity) {
      throw new Error(`Stock is not enough. Available: ${item.stock}`);
    }

    item.stock -= dto.quantity;
    await this.itemRepo.save(item);

    const stockOut = this.stockOutRepo.create({
      item,
      quantity: dto.quantity,
      note: dto.note,
    });

    return this.stockOutRepo.save(stockOut);
  }

  async findAll(): Promise<StockOut[]> {
    return this.stockOutRepo.find({
      relations: ['item'],
      order: { date: 'DESC' },
    });
  }

  async findOne(id: number): Promise<StockOut> {
    const stockOut = await this.stockOutRepo.findOne({
      where: { out_id: id },
      relations: ['item'],
    });

    if (!stockOut) throw new NotFoundException(`StockOut #${id} not found`);
    return stockOut;
  }

  async update(id: number, dto: UpdateStockOutDto): Promise<StockOut> {
    const stockOut = await this.findOne(id);

    if (dto.itemId) {
      const item = await this.itemRepo.findOne({ where: { item_id: dto.itemId } });
      if (!item) throw new NotFoundException('Item not found');
      stockOut.item = item;
    }

    stockOut.quantity = dto.quantity ?? stockOut.quantity;
    stockOut.note = dto.note ?? stockOut.note;

    return this.stockOutRepo.save(stockOut);
  }

  async remove(id: number): Promise<void> {
    const stockOut = await this.findOne(id);
    await this.stockOutRepo.remove(stockOut);
  }
}