
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('notes').insert({user_id: 1, category: 'eat', text: "Shepherd's Pie", created_at: "2018-02-07"}),
        knex('notes').insert({user_id: 1, category: 'buy', text: "SpaceX", created_at: "2018-02-07"}),
        knex('notes').insert({user_id: 2, category: 'read', text: "2001 A Space Odyssey", created_at: "2018-02-07"}),
        knex('notes').insert({user_id: 2, category: 'buy', text: "A Gucci Bag", created_at: "2018-02-07"}),
        knex('notes').insert({user_id: 2, category: 'eat', text: "Raijin Ramen", created_at: "2018-02-07"}),
        knex('notes').insert({user_id: 2, category: 'watch', text: "Dr. Strangelove", created_at: "2018-02-07"}),
        knex('notes').insert({user_id: 2, category: 'watch', text: "The Lord of The Rings: Fellowship of the Ring", created_at: "2018-02-07"}),
        knex('notes').insert({user_id: 3, category: 'watch', text: "It follows", created_at: "2018-02-07"}),
        knex('notes').insert({user_id: 3, category: 'read', text: "Paradise Lost", created_at: "2018-02-07"})
      ]);
    });
};
