
exports.up = function(knex, Promise) {
  return knex.schema.table('notes', function(table){
    // Add subtype fields to notes table
    table.text('subtype');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('notes', function(table){
    // Remove subtype fields from notes table
    table.dropColumn('subtype');
  });
};
