import { Model, ModelObject } from 'objection';

export class CarsModel extends Model {
    id!: number;
    name!: string;
    year!: string;
    price!: string;
    startRent!: string;
    finishRent!: string;
    image_url?: string;
    update_at!: string;
    craeted_at!: string;

    static get tableName(){
        return "cars"
       }
     }
     
     export type Cars = ModelObject<CarsModel>