exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({user_id: 1, email: 'eothel@gmail.com', password: '1234'}),
        knex('users').insert({user_id: 2, email: 'siegendignitas@gmail.com', password: '1234'}),
        knex('users').insert({user_id: 3, email: 'tonytaesung.ha@gmail.com', password: '1234'})
      ]);
    });
};
