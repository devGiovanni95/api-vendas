import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import AppError from '@shared/errors/AppError';
import  Product  from '../typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    /**
     * Confere se existe um produto com mesmo nome
     */
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is alread one product eith this name');
    }

    const redisCache = new RedisCache();
    
    const product = productsRepository.create({
      name,
      price,
      quantity,
    });
    
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
