import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe , UseGuards} from '@nestjs/common';
import { StockOutService } from './stock-out.service';
import { CreateStockOutDto } from './dto/create-stock-out.dto';
import { UpdateStockOutDto } from './dto/update-stock-out.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('stock-out')
@UseGuards(AuthGuard,RolesGuard)
@Roles(Role.EMPLOYEE)
export class StockOutController {
  constructor(private readonly stockOutService: StockOutService) {}

  @Post()
  create(@Body() createStockOutDto: CreateStockOutDto) {
    return this.stockOutService.create(createStockOutDto);
  }

  @Get()
  findAll() {
    return this.stockOutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.stockOutService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateStockOutDto: UpdateStockOutDto) {
    return this.stockOutService.update(id, updateStockOutDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.stockOutService.remove(id);
  }
}
