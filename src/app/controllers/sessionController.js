import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import User from '../models/user';
import authConfig from '../../config/auth';

module.exports = {
  async store(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return response.status(401).json({ error: 'Password does not match 😥' });
    }

    const { id, name } = user;

    const token = jwt.sign({ id, name, email }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    return response.json({
      token,
      name,
      expireAt: decoded.exp,
      logout: false,
      expired: false,
    });
  },
};
