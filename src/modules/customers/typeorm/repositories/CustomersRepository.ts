import { EntityRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

@EntityRepository(Customer)
class CustomersRepository extends Repository<Customer> {
  public async findByName(name: string): Promise<Customer | undefined> {
    const custumer = this.findOne({
      where: {
        name,
      },
    });

    return custumer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const custumer = this.findOne({
      where: {
        id,
      },
    });

    return custumer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const custumer = this.findOne({
      where: {
        email,
      },
    });

    return custumer;
  }
}

export default CustomersRepository;
