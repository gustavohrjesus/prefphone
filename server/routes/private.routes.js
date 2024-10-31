import express from 'express'
import db from '../services/connection.js'

const router = express.Router()


//! ----- INSERT INFOS - BEGIN -------
router.post('/registerInfos', async (req, res) => {
    try{
        console.log('privr -> registerInfos')
        const info = req.body

        await db.query('INSERT INTO informacoes (info_secr, info_local, info_ender, info_tipconn, info_ip, info_email, info_nome, info_obs) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                        [ info.secr, info.local, info.ender, info.tipconn, info.ip, info.email, info.nome, info.obs ], (err, response) => {
            if(err){
                res.status(500).json( { msg: "Erro no servidor! Tente novamente mais tarde." } )
                console.log(err.sqlMessage)
            } 
            else {
                db.query("SELECT MAX(info_cod) as info_cod FROM informacoes", (err_maxid, res_maxid) => {
                    if(err_maxid){
                        return res.status(500).json( { msg: "Erro no servidor! Tente novamente mais tarde." } )
                    }                    
                    
                    
                    db.query("INSERT INTO telefones (fone_codinfofone, fone_info, fone_info_aux, fone_info_cel, fone_ddr) VALUES (?, ?, ?, ?, ?)", 
                                [res_maxid[0].info_cod, info.fone, info.foneaux, info.fonecel, info.foneddr ], (err, response)=>{
                        if(err){
                            return res.status(500).json( { msg: "Erro no servidor! Tente novamente mais tarde." } )
                        }
                    })
                })
                res.status(201).json(`Informacao cadastrada com sucesso!`)
            }
        } )

    } catch(e){
        console.log(e)
    }
})
//! ----- INSERT INFOS - END ---------

//todo ----- UPDATE INFOS - BEGIN -------
router.put( '/updateInfos', async (req, res) => {
    try{
        console.log('privr -> updateInfos', req.body)
        const info = req.body

        const infoId  = req.body.infoId;
        const secr    = req.body.secr.toLowerCase().trim();
        const local   = req.body.local.toLowerCase().trim();
        const ender   = req.body.ender.toLowerCase().trim();
        const tipconn = req.body.tipconn.toLowerCase().trim();

        const ip    = req.body.ip.toLowerCase().trim();
        const email   = req.body.email.toLowerCase().trim();
        const nome   = req.body.nome.toLowerCase().trim();
        const obs = req.body.obs.toLowerCase().trim();

        const fone    = req.body.fone.toLowerCase().trim();
        const foneaux   = req.body.foneaux.toLowerCase().trim();
        const fonecel   = req.body.fonecel.toLowerCase().trim();
        const foneddr = req.body.foneddr.toLowerCase().trim();

        let sqlUpdInfos = `UPDATE informacoes SET info_secr = ${secr}, info_local = ${local}, info_ender = ${ender}, info_tipconn = ${tipconn},`
                         +` info_ip = ${ip}, info_email = ${email}, info_nome = ${nome}, info_obs = ${obs}`
                         +` WHERE info_cod = ${infoId}`

        await db.query( 
            'UPDATE informacoes SET info_secr = ?, info_local = ?, info_ender = ?, info_tipconn = ?, info_ip = ?, info_email = ?, info_nome = ?, info_obs = ?  WHERE info_cod = ?'
            , [ secr, local, ender, tipconn, ip, email, nome, obs, infoId ], (err, response) => {

            if(err){
                return res.status(500).json({ msg: 'Erro no servidor! Tente novamente mais tarde.' })
            }

            db.query("UPDATE telefones SET fone_info = ?, fone_info_aux = ?, fone_info_cel = ?, fone_ddr = ? WHERE fone_codinfofone = ?", 
                        [ fone, foneaux, fonecel, foneddr, infoId ], (err, response)=>{
                if(err){
                    return res.status(500).json( { msg: "Erro no servidor! Tente novamente mais tarde." } )
                }

                res.status(200).json({ msg: 'Informacoes atualizadas com sucesso!', response })
            })

            
        })

    } catch(e) {
        console.log(e)
    }
})
//todo ----- UPDATE INFOS - END ---------

export default router