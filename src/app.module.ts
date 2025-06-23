// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ItemsModule } from './items/items.module';
import { StockInModule } from './stock-in/stock-in.module';
import { StockOutModule } from './stock-out/stock-out.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    DatabaseModule,
    ItemsModule,
    StockInModule,
    StockOutModule,
    ThrottlerModule.forRoot([{
      name: 'short',
      ttl : 1000,
      limit: 3,
    }, {
      name: 'long',
      ttl : 60000,
      limit: 100,
    }])
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
})
export class AppModule {}