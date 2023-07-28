/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("rooms", (table) => {
    table.increments("id");
    table.string("name", 40).notNullable();
    table.integer("floor").notNullable();
    table.boolean("for_stuff").defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("rooms");
};
