// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ItemsModule } from './items/items.module';
import { StockInModule } from './stock-in/stock-in.module';
import { StockOutModule } from './stock-out/stock-out.module';

@Module({
  imports: [
    DatabaseModule,
    ItemsModule,
    StockInModule,
    StockOutModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}