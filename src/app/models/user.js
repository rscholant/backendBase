const bcrypt = require('bcryptjs');

const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        whatsapp: DataTypes.STRING,
        city: DataTypes.STRING,
        uf: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
      }
    );
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }
  checkPassword(pass) {
    return bcrypt.compare(pass, this.password);
  }
}

module.exports = User;
