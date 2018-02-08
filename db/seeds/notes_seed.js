
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('notes').insert({note_id: 1, user_id: 1, category: 'eat', text: "Shepherd's Pie", created_at: "2018-02-07"}),
        knex('notes').insert({note_id: 2, user_id: 1, category: 'buy', text: "SpaceX", created_at: "2018-02-07"}),
        knex('notes').insert({note_id: 3, user_id: 2, category: 'watch', text: "2001 A Space Odyssey", created_at: "2018-02-07"})
      ]);
    });
};
