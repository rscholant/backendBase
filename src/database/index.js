import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

const models = [];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(
      process.env.NODE_ENV === 'test'
        ? databaseConfig.test
        : databaseConfig.development
    );

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
