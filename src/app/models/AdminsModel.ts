import { Model, ModelObject } from 'objection';

export class AdminsModel extends Model {
    id!: number;
    email!: string;
    password!: string;
    role!: string;
    update_at!: string;
    craeted_at!: string;

    static get tableName(){
        return "admins"
       }
     }
     
     export type Users = ModelObject<AdminsModel>