import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn } from 'typeorm';
import { Item } from '../../items/entities/item.entity';

@Entity()
export class StockOut {
    @PrimaryGeneratedColumn()
    out_id: number;

    @Column()
    quantity: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @Column({ type: 'text', nullable: true })
    note: string;

    @ManyToOne(() => Item, (item) => item.stockOuts)
    @JoinColumn({ name: 'item_id' }) // custom FK name
    item: Item;
}
