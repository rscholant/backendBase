import { Op } from 'sequelize';

const User = require('../models/user');

module.exports = {
  async index(response) {
    const users = await User.findAll();
    return response.json(users);
  },

  async create(request, response) {
    const { name, email, whatsapp, city, uf, password } = request.body;

    try {
      const userExistent = await User.findOne({
        where: { [Op.or]: [{ email }, { whatsapp }] },
      });

      if (userExistent) {
        return response.status(400).json({ error: 'User already exists 😥' });
      }
      await User.create({
        name,
        email,
        whatsapp,
        city,
        uf,
        password,
      });
      return response.status(201).send('User Successfully created 🙌!');
    } catch (error) {
      return response.status(400).send(error);
    }
  },
};
