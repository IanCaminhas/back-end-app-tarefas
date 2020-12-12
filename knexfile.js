module.exports = {

    client: 'postgresql',
    connection: {
      database: 'tasks',
      user:     'root',
      password: '123'
    },
    pool: {
      min: 2, //minimo 2 conexões
      max: 10 //máxima 10 conexões
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  

};
