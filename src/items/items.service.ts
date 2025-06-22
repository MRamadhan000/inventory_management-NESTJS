import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {

  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) { }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    try {
      const newItem = this.itemRepository.create(createItemDto);
      return await this.itemRepository.save(newItem);
    } catch (error) {
      throw new BadRequestException('Error creating item: ' + error.message);
    }
  }

  async findAll(): Promise<Item[]> {
    try {
      return await this.itemRepository.find();
    } catch (error) {
      throw new BadRequestException('Failed to retrieve items: ' + error.message);
    }
  }

  async findById(id:number): Promise<Item> {
    try {
      const item = await this.itemRepository.findOne({ where: { item_id: id } });
      if (!item) {
        throw new BadRequestException(`Item with ID ${id} not found`);
      }
      return item;
    } catch (error) {
      throw new BadRequestException('Error retrieving item: ' + error.message);
    }
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    try {
      await this.itemRepository.update(id, updateItemDto);
      return this.findById(id);
    } catch (error) {
      throw new BadRequestException('Error updating item: ' + error.message);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.itemRepository.delete(id);
      if (result.affected === 0) {
        throw new BadRequestException(`Item with ID ${id} not found`);
      }
    } catch (error) {
      throw new BadRequestException('Error deleting item: ' + error.message);
    }
  }
}
