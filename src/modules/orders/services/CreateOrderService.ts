import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { Order } from '../typeorm/entities/Order';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest{
    customer_id: string;
    products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products}: IRequest): Promise<Order> {
    const ordesRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);
      

    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any custumer with the given id.');
    }

    const existsProduct = await productsRepository.findByIds(products);

    if(!existsProduct.length){
        throw new AppError('Could not find any products with the given ids.')
    }

  }
}

export default CreateOrderService;
