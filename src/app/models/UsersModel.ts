import { Model, ModelObject } from 'objection';

export class UsersModel extends Model {
    id!: number;
    username!: string;
    email!: string;
    password!: string;
    encryptedPassword!: string;
    update_at!: string;
    created_at!: string;

    static get tableName(){
        return "users"
       }
     }
     
     export type Users = ModelObject<UsersModel>

     