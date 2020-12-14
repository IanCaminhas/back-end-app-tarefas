const bcrypt = require('bcrypt-nodejs')

// módulo exporta a função e recebe como parâmetro app. Essa função retorna a fn save
module.exports = app => {
    const obterHash =(password, callback) =>{
        bcrypt.genSalt(10,(err, salt)=>{
            bcrypt.hash(password, salt, null, (err, hash)=> callback(hash))
        })
    }
    //podi ter o next. Isso aqui é o express 
    const save =(req, res) =>{
        obterHash(req.body.password, hash =>{
            const password = hash
            app.db('users')
                .insert({name: req.body.name, email: req.body.email, password})
                .then(_ => res.status(204).send())
                .catch(err => res.status(400).json(err))
        })
    }

    return {save}
}
