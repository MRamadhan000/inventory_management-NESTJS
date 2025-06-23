import { Module } from '@nestjs/common';
import { StockOutService } from './stock-out.service';
import { StockOutController } from './stock-out.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockOut } from './entities/stock-out.entity';
import { Item } from 'src/items/entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockOut,Item])],
  controllers: [StockOutController],
  providers: [StockOutService],
})
export class StockOutModule {}
