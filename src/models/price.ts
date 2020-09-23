import sequelize, * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';


export interface PriceAttributes{
    id? : number;
    offerPrice : number;
    country : string;
    currency : string;
    createdAt? : Date;
    updatedAt? : Date;
};

export interface PriceInstance extends Sequelize.Instance<PriceAttributes>, PriceAttributes{

}

export const PriceFactory = (sequelize : Sequelize.Sequelize, DataTypes : Sequelize.DataTypes) : Sequelize.Model<PriceInstance,PriceAttributes> => {
    const attributes : SequelizeAttributes<PriceAttributes> = {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        offerPrice: {
            type: DataTypes.NUMERIC,
          },
          country :{
              type : DataTypes.STRING
          },
          currency :{
              type : DataTypes.STRING
          }
    };

    const Price = sequelize.define<PriceInstance,PriceAttributes>('Price', attributes);

    return Price;

}