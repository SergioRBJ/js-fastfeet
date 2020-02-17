import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientControler {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      details: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipcode: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists' });
    }

    const {
      id,
      name,
      street,
      number,
      details,
      state,
      city,
      zipcode,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      details,
      state,
      city,
      zipcode,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      details: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zipcode: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, name } = req.body;

    const recipient = await Recipient.findByPk(id);
    const recipientExists = await Recipient.findOne({ where: { name } });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists.' });
    }

    const {
      street,
      number,
      details,
      state,
      city,
      zipcode,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      details,
      state,
      city,
      zipcode,
    });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res
        .status(400)
        .json({ error: `The recipient ID doesn't exists.` });
    }

    await Recipient.destroy({ where: { id } });

    return res.json(`The recipient with id ${id} has been deleted.`);
  }

  async index(req, res) {
    const recipient = await Recipient.findAll({
      attributes: [
        'id',
        'name',
        'number',
        'street',
        'state',
        'details',
        'city',
        'zipcode',
      ],
    });

    return res.status(200).json(recipient);
  }
}

export default new RecipientControler();
