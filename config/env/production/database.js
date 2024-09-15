
module.exports = ({ env }) => {
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: env('DATABASE_HOST', 'localhost'),
          port: env.int('DATABASE_PORT', 5432),
          database: env('DATABASE_NAME', 'strapi'),
          user: env('DATABASE_USERNAME'),
          password: env('DATABASE_PASSWORD'),
          ssl: { rejectUnauthorized: false },
        },
        debug: env.bool('DATABASE_DEBUG', false),
      },
    };
  };
  