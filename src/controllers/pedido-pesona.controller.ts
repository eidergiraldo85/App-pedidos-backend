import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pedido,
  Pesona,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoPesonaController {
  constructor(
    @repository(PedidoRepository)
    public pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/pesona', {
    responses: {
      '200': {
        description: 'Pesona belonging to Pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pesona)},
          },
        },
      },
    },
  })
  async getPesona(
    @param.path.string('id') id: typeof Pedido.prototype.id,
  ): Promise<Pesona> {
    return this.pedidoRepository.pesona(id);
  }
}
