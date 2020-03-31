import Mail from '../../lib/Mail';

class CancelationDeliveryMail {
  get key() {
    return 'CancelationDeliveryMail';
  }

  async handle({ data }) {
    const { sender, product, recipient, description } = data;

    await Mail.sendMail({
      to: `${sender.name} <${sender.email}>`,
      subject: 'Entrega cancelada',
      template: 'CancelationDelivery',
      context: {
        description,
        sender: sender.name,
        product,
        recipient: recipient.name,
        city: recipient.city,
        state: recipient.state,
        street: recipient.street,
        number: recipient.number,
        zipcode: recipient.zipcode,
      },
    });
  }
}

export default new CancelationDeliveryMail();
