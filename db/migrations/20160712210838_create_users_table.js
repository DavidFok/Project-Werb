exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments("user_id").primary();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
