import { Op } from 'sequelize';

import Sender from '../models/Sender';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Avatar from '../models/Avatar';

class DeliveryDeliveredController {
  async index(req, res) {
    const { id: senderId } = req.params;

    const sender = await Sender.findByPk(senderId);

    if (!sender) {
      return res.status(400).json({ error: 'Sender does not exists' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        signature_id: { [Op.not]: null },
        sender_id: senderId,
      },
      attributes: [
        'id',
        'sender_id',
        'product',
        'status',
        'start_date',
        'end_date',
        'canceled_at',
      ],
      order: ['id'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'state',
            'city',
            'street',
            'number',
            'complement',
            'zip_code',
          ],
        },
        {
          model: Avatar,
          as: 'signature',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    return res.json(deliveries);
  }
}

export default new DeliveryDeliveredController();
