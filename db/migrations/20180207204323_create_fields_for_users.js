
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    //Add email and password field
    table.string('email');
    table.string('password');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.dropColumn('email');
    table.dropColumn('password');
  });
};
