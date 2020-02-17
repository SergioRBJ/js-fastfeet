module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'recipients',
      [
        {
          name: 'Sorveteria Kibom',
          street: 'Rua dos randoms',
          number: 154,
          state: 'SP',
          city: 'Pedreira',
          zipcode: 13920000,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Nova Mania',
          street: 'Rua XV de Novembro',
          number: 164,
          state: 'SP',
          city: 'Pedreira',
          zipcode: 13920000,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
