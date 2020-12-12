const config = require('../knexfile.js') //importanto o arquivo de configuração com bd
const knex = require('knex')(config) //requisitando knex e chamando o method passando config

knex.migrate.latest([config])
module.exports = knex
