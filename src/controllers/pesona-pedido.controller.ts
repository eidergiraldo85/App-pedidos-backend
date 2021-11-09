import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Pesona,
  Pedido,
} from '../models';
import {PesonaRepository} from '../repositories';

export class PesonaPedidoController {
  constructor(
    @repository(PesonaRepository) protected pesonaRepository: PesonaRepository,
  ) { }

  @get('/pesonas/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Array of Pesona has many Pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedido)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pedido>,
  ): Promise<Pedido[]> {
    return this.pesonaRepository.pedidos(id).find(filter);
  }

  @post('/pesonas/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Pesona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pedido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pesona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {
            title: 'NewPedidoInPesona',
            exclude: ['id'],
            optional: ['pesonaId']
          }),
        },
      },
    }) pedido: Omit<Pedido, 'id'>,
  ): Promise<Pedido> {
    return this.pesonaRepository.pedidos(id).create(pedido);
  }

  @patch('/pesonas/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Pesona.Pedido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {partial: true}),
        },
      },
    })
    pedido: Partial<Pedido>,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.pesonaRepository.pedidos(id).patch(pedido, where);
  }

  @del('/pesonas/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Pesona.Pedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.pesonaRepository.pedidos(id).delete(where);
  }
}
