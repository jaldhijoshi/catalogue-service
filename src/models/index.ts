import Sequelize from 'sequelize';
import { DbInterface } from'../typings/DbInterface';
import { CatalogueFactory } from './catalogue';
import { PriceFactory } from './price';


export const createModels = (sequelizeConfig: any): DbInterface => {
  const { database, username, password, params } = sequelizeConfig;
  const sequelize = new Sequelize(database, username, password, params);

  const db: DbInterface = {
    sequelize,
    Sequelize,
    Price : PriceFactory(sequelize, Sequelize),
    Catalogue : CatalogueFactory(sequelize, Sequelize)
  };

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};
