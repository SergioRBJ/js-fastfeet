module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'senders',
      [
        {
          name: 'João Leme',
          email: 'j.leme@fastfeet.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Sebastião Dias',
          email: 's.dias@fastfeet.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Vitor Bernardi',
          email: 'v.bernardi@fastfeet.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
