import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pedido} from './pedido.model';

@model()
export class Pesona extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @hasMany(() => Pedido)
  pedidos: Pedido[];

  constructor(data?: Partial<Pesona>) {
    super(data);
  }
}

export interface PesonaRelations {
  // describe navigational properties here
}

export type PesonaWithRelations = Pesona & PesonaRelations;
