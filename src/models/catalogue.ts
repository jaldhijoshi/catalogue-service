import sequelize, * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../typings/SequelizeAttributes';
import { PriceAttributes, PriceInstance } from './price';


export interface CatalogueAttributes{
    id? : number;
    name : string;
    shortDescription : string;
    longDescription : string;
    prices? : PriceAttributes[]; 
    createdAt? : Date;
    updatedAt? : Date;
};

export interface CatalogueInstance extends Sequelize.Instance<CatalogueAttributes>, CatalogueAttributes{
    getPrice: Sequelize.HasOneGetAssociationMixin<PriceInstance>;
}

export const CatalogueFactory = (sequelize : Sequelize.Sequelize, DataTypes : Sequelize.DataTypes) : Sequelize.Model<CatalogueInstance,CatalogueAttributes> => {
    const attributes : SequelizeAttributes<CatalogueAttributes> = {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
          },
          shortDescription :{
              type : DataTypes.STRING
          },
          longDescription :{
              type : DataTypes.STRING
          }
    };

    const Catalogue = sequelize.define<CatalogueInstance,CatalogueAttributes>('Catalogue', attributes);

    Catalogue.associate = models => {
        Catalogue.hasMany(models.Price, {foreignKey : 'catalogueId', as : 'prices'});

    };

    return Catalogue;

}