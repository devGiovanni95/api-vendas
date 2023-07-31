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

    //verifica se ha um customer
    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any custumer with the given id.');
    }

    //verifica se ha produtos
    const existsProduct = await productsRepository.findByIds(products);

    if(!existsProduct.length){
        throw new AppError('Could not find any products with the given ids.');
    }
    
    //verifica se todos os produtos existem no banco de dados
    const existsProductsIds = existsProduct.map((product) => product.id);
    
    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
      );
      
      if(checkInexistentProducts.length){
          throw new AppError(`Could not find product ${checkInexistentProducts[0].id}.`);
      }

      //verificando se quantidade é menor que a disponivel do sistema
      const quantityAvailable = products.filter(
        product => existsProduct.filter(
          p => p.id === product.id
        )[0].quantity<product.quantity,
      )

      //se for menor gera uma excessão
      if(quantityAvailable.length){
        throw new AppError(
          `The quantity ${quantityAvailable[0].quantity} 
          is not available for ${quantityAvailable[0].id}.`);
    }
    


  }
}

export default CreateOrderService;
