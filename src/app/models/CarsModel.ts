import { Model, ModelObject } from 'objection';

export class CarsModel extends Model {
    id!: number;
    user_id!: string;
    name!: string;
    availability!: boolean;
    price!: string;
    startRent!: Date;
    finishRent!: Date;
    image_url?: string;
    created_by!: string;
    updated_by!: string;
    updated_at!: string;
    craeted_at!: string;

    static get tableName(){
        return "cars"
       }
     }
     
     export type Cars = ModelObject<CarsModel>