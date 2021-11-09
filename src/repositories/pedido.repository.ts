import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pedido, PedidoRelations, Pesona, Producto} from '../models';
import {PesonaRepository} from './pesona.repository';
import {ProductoRepository} from './producto.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly pesona: BelongsToAccessor<Pesona, typeof Pedido.prototype.id>;

  public readonly producto: HasOneRepositoryFactory<Producto, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PesonaRepository') protected pesonaRepositoryGetter: Getter<PesonaRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Pedido, dataSource);
    this.producto = this.createHasOneRepositoryFactoryFor('producto', productoRepositoryGetter);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
    this.pesona = this.createBelongsToAccessorFor('pesona', pesonaRepositoryGetter,);
    this.registerInclusionResolver('pesona', this.pesona.inclusionResolver);
  }
}
