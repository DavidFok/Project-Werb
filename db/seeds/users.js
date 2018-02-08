exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({email: 'eothel@gmail.com', password: '1234'}),
        knex('users').insert({email: 'siegendignitas@gmail.com', password: '1234'}),
        knex('users').insert({email: 'tonytaesung.ha@gmail.com', password: '1234'})
      ]);
    });
};
