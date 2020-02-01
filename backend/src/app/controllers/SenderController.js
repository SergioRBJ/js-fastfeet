import * as Yup from 'yup';
import Sender from '../models/Sender';
import Avatar from '../models/Avatar';

class SenderControler {
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

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, email } = req.body;

    const sender = await Sender.findByPk(req.body.id);

    const senderExists = await Sender.findOne({
      where: { email },
    });

    if (senderExists) {
      return res.status(400).json({ error: 'Sender already exists.' });
    }

    const { name } = await sender.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const sender = await Sender.findByPk(id);

    if (!sender) {
      return res.status(400).json({ error: 'The sender ID does not exists.' });
    }

    await Sender.destroy({ where: { id } });

    return res.json(`The registration with id ${id} has been deleted.`);
  }

  async index(req, res) {
    const sender = await Sender.findAll({
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: Avatar,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.status(200).json(sender);
  }
}

export default new SenderControler();
