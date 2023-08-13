import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import  Product  from '../typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();

    //recebe lista caso haja produtos no cache
    let products = await redisCache.recover<Product[]>(
      'api-vendas-PRODUCT_LIST',
    )

    //verifica se realmente tinha algun produto no cache se nao tiver ele busca no database e salva no cache
    if(!products){
      const products = await productsRepository.find();
      
      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
