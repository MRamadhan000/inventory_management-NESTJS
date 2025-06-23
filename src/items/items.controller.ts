import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('items')
@UseGuards(AuthGuard,RolesGuard)
@Roles(Role.EMPLOYEE)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Get()
  async findAll() {
    const items = await this.itemsService.findAll();
    return { message: 'Items retrieved', data: items };
  }

  @Post()
  async create(@Body() dto: CreateItemDto) {
    const result = await this.itemsService.create(dto);
    return { message: 'Item created', data: result };
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateItemDto) {
    const updatedItem = await this.itemsService.update(id, dto);
    return { message: `Item with ID ${id} updated successfully`, data: updatedItem };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.itemsService.remove(id);
    return { message: `Item with ID ${id} deleted successfully` };
  }
}
