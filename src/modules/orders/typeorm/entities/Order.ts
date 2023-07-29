import Customer from '@modules/customers/typeorm/entities/Customer';
import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('order')
  export class Ordes {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => Customer)
    @JoinColumn({name:'customer_id'})
    customer: Customer
  
    @CreateDateColumn()
    created_at: Date;
  
    @CreateDateColumn()
    updated_at: Date;
  }
  