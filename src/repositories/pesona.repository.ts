import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pesona, PesonaRelations, Pedido} from '../models';
import {PedidoRepository} from './pedido.repository';

export class PesonaRepository extends DefaultCrudRepository<
  Pesona,
  typeof Pesona.prototype.id,
  PesonaRelations
> {

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Pesona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Pesona, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
