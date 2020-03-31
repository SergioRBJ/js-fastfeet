import Mail from '../../lib/Mail';

class CreationDeliveryMail {
  get key() {
    return 'CreationDeliveryMail';
  }

  async handle({ data }) {
    const { sender, product, recipient } = data;

    await Mail.sendMail({
      to: `${sender.name} <${sender.email}>`,
      subject: 'Nova entrega cadastrada',
      template: 'CreationDelivery',
      context: {
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

export default new CreationDeliveryMail();
