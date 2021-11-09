import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Pesona} from '../models';
import {PesonaRepository} from '../repositories';

export class PersonaController {
  constructor(
    @repository(PesonaRepository)
    public pesonaRepository : PesonaRepository,
  ) {}

  @post('/pesonas')
  @response(200, {
    description: 'Pesona model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pesona)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pesona, {
            title: 'NewPesona',
            exclude: ['id'],
          }),
        },
      },
    })
    pesona: Omit<Pesona, 'id'>,
  ): Promise<Pesona> {
    return this.pesonaRepository.create(pesona);
  }

  @get('/pesonas/count')
  @response(200, {
    description: 'Pesona model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pesona) where?: Where<Pesona>,
  ): Promise<Count> {
    return this.pesonaRepository.count(where);
  }

  @get('/pesonas')
  @response(200, {
    description: 'Array of Pesona model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pesona, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pesona) filter?: Filter<Pesona>,
  ): Promise<Pesona[]> {
    return this.pesonaRepository.find(filter);
  }

  @patch('/pesonas')
  @response(200, {
    description: 'Pesona PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pesona, {partial: true}),
        },
      },
    })
    pesona: Pesona,
    @param.where(Pesona) where?: Where<Pesona>,
  ): Promise<Count> {
    return this.pesonaRepository.updateAll(pesona, where);
  }

  @get('/pesonas/{id}')
  @response(200, {
    description: 'Pesona model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pesona, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pesona, {exclude: 'where'}) filter?: FilterExcludingWhere<Pesona>
  ): Promise<Pesona> {
    return this.pesonaRepository.findById(id, filter);
  }

  @patch('/pesonas/{id}')
  @response(204, {
    description: 'Pesona PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pesona, {partial: true}),
        },
      },
    })
    pesona: Pesona,
  ): Promise<void> {
    await this.pesonaRepository.updateById(id, pesona);
  }

  @put('/pesonas/{id}')
  @response(204, {
    description: 'Pesona PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pesona: Pesona,
  ): Promise<void> {
    await this.pesonaRepository.replaceById(id, pesona);
  }

  @del('/pesonas/{id}')
  @response(204, {
    description: 'Pesona DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pesonaRepository.deleteById(id);
  }
}
