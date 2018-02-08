
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(table){
    table.increments('note_id').primary();
    table.integer('user_id');
    table.string('category');
    table.string('text');
    table.date('created_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes');
};
