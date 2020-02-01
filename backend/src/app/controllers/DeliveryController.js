import * as Yup from 'yup';
import Delivery from '../models/Delivery';

class DeliveryControler {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const senderExists = await Sender.findOne({
      where: { email: req.body.email },
    });

    if (senderExists) {
      return res.status(400).json({ error: 'Sender already exists' });
    }

    const { id, name, email } = await Sender.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new DeliveryControler();
