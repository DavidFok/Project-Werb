// require('dotenv').config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      ssl      : process.env.DB_SSL
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    // connection: process.env.DATABASE_URL + '?ssl=true',
    // connection: {
    //   //host     : process.env.DB_HOST,
    //   host: "postgres://ivrgvnogmzwtcv:7bc5818b89e60b50d753083f6897eafd5cf7abc674e67c59d8b978be42b32544@ec2-184-72-219-186.compute-1.amazonaws.com:5432/daglk1i7be7t3p" + '?ssl=true',
    //   user     : process.env.DB_USER,
    //   password : process.env.DB_PASS,
    //   database : process.env.DB_NAME,
    //   port     : process.env.DB_PORT,
    //   ssl      : process.env.DB_SSL
    // },
    connection: process.env.DATABASE_URL + '?ssl=true',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    }
  }

};
