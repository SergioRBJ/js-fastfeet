import * as Yup from 'yup';
import { parseISO, isAfter, isBefore, setHours } from 'date-fns';

import Sender from '../models/Sender';
import Delivery from '../models/Delivery';

class DeliveryPickupController {
  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { senderId, deliveryId } = req.params;

    const sender = await Sender.findByPk(senderId);

    if (!sender) {
      return res.status(400).json({ error: 'Sender does not exists' });
    }

    const delivery = await Delivery.findByPk(deliveryId);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    const { count } = await Delivery.findAndCountAll({
      where: {
        sender_id: senderId,
        start_date: null,
        signature_id: null,
      },
    });

    if (count === 5) {
      return res
        .status(400)
        .json({ error: 'Maximum number of delivery pickups reached' });
    }

    const { start_date } = req.body;
    const start_date_ISO = parseISO(start_date);

    if (
      isBefore(start_date_ISO, setHours(new Date(), 8)) ||
      isAfter(start_date_ISO, setHours(new Date(), 18))
    ) {
      return res.status(400).json({ error: 'Invalid time' });
    }

    await delivery.update({ start_date, status: 'RETIRADA' });

    return res.json({});
  }
}

export default new DeliveryPickupController();
