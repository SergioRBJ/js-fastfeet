import Sender from '../models/Sender';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveryPendingController {
  async index(req, res) {
    const { id: senderId } = req.params;

    const sender = await Sender.findByPk(senderId);

    if (!sender) {
      return res.status(400).json({ error: 'Sender does not exists' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        sender_id: senderId,
        signature_id: null,
        canceled_at: null,
      },
      order: ['id'],
      attributes: [
        'id',
        'sender_id',
        'product',
        'status',
        'start_date',
        'end_date',
        'canceled_at',
      ],
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
            'zipcode',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    return res.json(deliveries);
  }
}

export default new DeliveryPendingController();
