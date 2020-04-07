import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import databaseConfig from '../config/database';
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Avatar from '../app/models/Avatar';
import Sender from '../app/models/Sender';
import Delivery from '../app/models/Delivery';
import File from '../app/models/File';
import mongoConfig from '../config/mongo';

const models = [User, Recipient, Avatar, Sender, Delivery, File];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      `mongodb://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`,
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
