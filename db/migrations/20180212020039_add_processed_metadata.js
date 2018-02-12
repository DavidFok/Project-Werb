
exports.up = function(knex, Promise) {
  return knex.schema.table('notes', function(table){
    //Add metadata field to notes table
    table.text('processed_metadata');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.table('notes', function(table){
    table.dropColumn('processed_metadata');
  });
};
