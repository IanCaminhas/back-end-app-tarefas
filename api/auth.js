const {authSecret} = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app =>{
    const signin = async(req,res) =>{
        if(!req.body.email || !req.body.password){
            return res.status(400).send("Dados incompletos")
        }

        const user = await app.db('users')
                .where({email: req.body.email})
                .first()
        
        if(user){
            bcrypt.compare(req.body.password,user.password, (err, match) =>{
                //se não der compatibilidade entre as senhas, e der erro não autorizar 401
                if(err || !match){
                    return res.status(401).send('A senha informada é inválida!')
                }

                //nesse caso, validou o usuário e vou armazenar o id na var payload. paylod é a chave que ficará dentro do token
                //token tem um segredo gerado a partir do authSecret em .env
                //pego o token e pego o payload do usuário para ver o id do usuário
                //payload vai conter o id do usuário
                const payload = {id: user.id}
                //retorno para o user o token, name e email. 
                res.json({
                    name:user.name,
                    email:user.email,
                    //gero um token com o payload assinado com o AuthSecret
                    //esse token precisa ser usado para todas as requisições subsequentes
                    token: jwt.encode(payload,authSecret),
                })

            })
        } else{
            res.status(400).send('Usuaŕio não cadastrado!')
        }

    }
    return {signin}

}