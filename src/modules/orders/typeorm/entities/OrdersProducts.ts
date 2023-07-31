
import {
  Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { Order } from './Order';
import { Product } from '@modules/products/typeorm/entities/Product';
  
  @Entity('orders_products')
  export class OrdersProducts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order, order => order.order_products)
    @JoinColumn({name:'order_id'})
    order: Order;
    
    @ManyToOne(() => Product, product => product.order_products)
    @JoinColumn({name:'product_id'})
    product: Product;
  
    @Column('decimal')
    price: number;
  
    @Column()
    order_id: string;
  
    @Column()
    product_id: string;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    created_at: Date;
  
    @CreateDateColumn()
    updated_at: Date;
  }
  