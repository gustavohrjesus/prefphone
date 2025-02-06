import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.SECRET

const authAdmin = (req, res, next) => {
    console.log('-- PERFIL 1 -- ADMIN -- AUTHADMIN.JS --')
    // console.log(req)

    const token = req.headers.authorization

    if(!token){
        return res.status(401).json({ msg: "Acesso negado!" })
    }    

    try {
        const decoded = jwt.verify( token.replace( 'Bearer ', '' ), JWT_SECRET )
        req.userId = decoded.id

        if( decoded.perfil !== 1 ){
            return res.status(401).json({ msg: "Funcao somente ADMIN!" })
        }
        console.log( req.userId )
        next()

    } catch(err) {
        return res.status(401).json({ msg: "Token Invalido!" })
    }    
}

export default authAdmin
