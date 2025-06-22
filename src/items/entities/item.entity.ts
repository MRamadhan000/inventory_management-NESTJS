import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StockIn } from '../../stock-in/entities/stock-in.entity';
import { StockOut } from '../../stock-out/entities/stock-out.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  item_id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50, nullable: true })
  category: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  stock: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => StockIn, (stockIn) => stockIn.item)
  stockIns: StockIn[];

  @OneToMany(() => StockOut, (stockOut) => stockOut.item)
  stockOuts: StockOut[];
}