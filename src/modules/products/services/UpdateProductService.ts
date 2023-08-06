import { UpdateDateColumn, getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import AppError from '@shared/errors/AppError';
import  Product  from '../typeorm/entities/Product';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }
    /**
     * Confere se o novo nome ja existe em outro produto
     */
    const productExists = await productsRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('There is alread one product eith this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}
export default UpdateProductService;
