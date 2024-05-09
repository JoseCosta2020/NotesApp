const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    //Depois de fazer o login tenho uma parte do Network fetch que se chama authorization
    //Nele encontra-se o Bearer Token e aparece depois de carregar login e sabe-se o user 
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token)
        return res.sendStatus(401);
    //Verificar se o token + Acess_Token é igual ao que o login indicou
    //Verifica a assinatura do token utilizando a chave secreta
    //Se estiver correta a função retorna os dados(payload) contidos no token
    //Se a assinatura for inválida ou se o token estiver expirado(dps de 3600 minutos), a função lança um erro.
    jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err,user) => {
        if (err) return res.sendStatus(401);
        console.log('Ok')
        req.user=user
        console.log('req',req.user)
        next();
    })

}

module.exports = {
    authenticateToken,   
};
