import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.SECRET

const auth = (req, res, next) => {    
    console.log('middleware -> auth.js')
    console.log(req.headers)
    const token  = req.headers.authorization
    console.log(`token: `,token)
    

    if(!token){
        return res.status(401).json({ msg: "Acesso negado!" })
    }    

    try {
        const decoded = jwt.verify( token.replace( 'Bearer ', '' ), JWT_SECRET )
        req.userId = decoded.id
        req.perfil = decoded.perfil

        if(req.perfil > 1){
            return res.status(401).json({ msg: "Acesso nao autorizado!" })
        }

        console.log( req.userId, req.perfil )
        next()

    } catch(err) {
        return res.status(401).json({ msg: "Token Invalido!" })
    }    
}

export default auth
