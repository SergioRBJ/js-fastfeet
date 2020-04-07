import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Sender from '../models/Sender';

class DeliveryControler {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      sender_id: Yup.number().required(),
      signature_id: Yup.number(),
      product: Yup.string().required(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id, sender_id } = req.body;

    const recipientExists = await Recipient.findByPk(recipient_id);
    if (!recipientExists) {
      return res.status(400).json({ error: `Recipient ID doesn't exists` });
    }

    const senderExists = await Sender.findByPk(sender_id);
    if (!senderExists) {
      return res.status(400).json({ error: `Sender ID doesn't exists` });
    }

    const { id, product } = await Delivery.create(req.body);

    return res.json({
      id,
      product,
      recipient_id,
      sender_id,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      recipient_id: Yup.number(),
      sender_id: Yup.number(),
      signature_id: Yup.number(),
      product: Yup.string(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.body;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: `Delivery doesn't exists.` });
    }

    const {
      recipient_id,
      sender_id,
      signature_id,
      product,
      canceled_at,
      start_date,
      end_date,
    } = await delivery.update(req.body);

    return res.status(200).json({
      id,
      recipient_id,
      sender_id,
      signature_id,
      product,
      canceled_at,
      start_date,
      end_date,
    });
  }

  async index(req, res) {
    const delivery = await Delivery.findAll({
      attributes: [
        'id',
        'recipient_id',
        'sender_id',
        'signature_id',
        'product',
        'start_date',
        'end_date',
        'canceled_at',
      ],
    });

    return res.status(200).json(delivery);
  }

  async show(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id, {
      attributes: ['id', 'product'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name'],
        },
        {
          model: Sender,
          as: 'sender',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    return res.json(delivery);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);
    if (!delivery) {
      return res.status(400).json({ error: `The delivery ID doesn't exists.` });
    }

    await Delivery.destroy({ where: { id } });

    return res.json(`The delivery with id ${id} has been deleted.`);
  }
}

export default new DeliveryControler();
