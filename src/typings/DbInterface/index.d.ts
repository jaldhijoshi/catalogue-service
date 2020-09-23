import * as Sequelize from 'sequelize';
import { CatalogueInstance, CatalogueAttributes } from '../../models/catalogue';
import { PriceInstance, PriceAttributes } from 'models/price';

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  Price: Sequelize.Model<PriceInstance,PriceAttributes>;
  Catalogue: Sequelize.Model<CatalogueInstance, CatalogueAttributes>;
}
