import { Module } from '@nestjs/common';
import { StockInService } from './stock-in.service';
import { StockInController } from './stock-in.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockIn } from './entities/stock-in.entity';
import { Item } from '../items/entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockIn,Item])],
  controllers: [StockInController],
  providers: [StockInService],
})
export class StockInModule {}
