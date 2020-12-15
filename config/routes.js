//app é fruto da instanciação de const app = express() de index.js
module.exports = app =>{
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
}

