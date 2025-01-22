const knex = require("knex");
const path = require("path");

const db = knex({
    client: "sqlite3",
    connection: {
        filename: path.join(__dirname, "database.sqlite"),
    },
    useNullAsDefault: true,
});

(async () => {
    try {
        // Tabela użytkowników
        await db.schema.hasTable("users").then((exists) => {
            if (!exists) {
                return db.schema.createTable("users", (table) => {
                    table.increments("id").primary();
                    table.string("username").notNullable();
                    table.string("email").notNullable().unique();
                    table.string("password").notNullable();
                    table.timestamps(true, true);
                });
            }
        });

        // Tabela opinii
        await db.schema.hasTable("reviews").then((exists) => {
            if (!exists) {
                return db.schema.createTable("reviews", (table) => {
                    table.increments("id").primary();
                    table.string("movieId").notNullable(); // ID filmu z zewnętrznego API
                    table.integer("userId").references("id").inTable("users");
                    table.text("content").notNullable();
                    table.integer("rating").notNullable();
                    table.timestamps(true, true);
                });
            }
        });

        console.log("Server is running and the database tables have been created or verified.");
    } catch (error) {
        console.error("Error during database setup:", error);
    }
})();

module.exports = db;
