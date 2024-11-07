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

        const infoId  = req.body.info_id;
        const secr    = req.body.info_secretar.toLowerCase().trim();
        const local   = req.body.info_sect.toLowerCase().trim();
        const ender   = req.body.info_addr.toLowerCase().trim();
        const tipconn = req.body.info_typconn.toLowerCase().trim();

        const ip    = req.body.info_ip.toLowerCase().trim();
        const email   = req.body.info_email.toLowerCase().trim();
        const nome   = req.body.info_name.toLowerCase().trim();
        const obs = req.body.info_obs.toLowerCase().trim();

        const fone    = req.body.info_fonemain.toLowerCase().trim();
        const foneaux   = req.body.info_fonesecond.toLowerCase().trim();
        const fonecel   = req.body.info_fonemobil.toLowerCase().trim();

        // const foneddr = req.body.foneddr.toLowerCase().trim();
        const foneddr = "";

        let sqlUpdInfos = `UPDATE informacoes SET info_secr = ${secr}, info_local = ${local}, info_ender = ${ender}, info_tipconn = ${tipconn},`
                         +` info_ip = ${ip}, info_email = ${email}, info_nome = ${nome}, info_obs = ${obs}`
                         +` WHERE info_cod = ${infoId}`

        await db.query( 
            'UPDATE informacoes SET info_secr = ?, info_local = ?, info_ender = ?, info_tipconn = ?, info_ip = ?, info_email = ?, info_nome = ?, info_obs = ?  WHERE info_cod = ?'
            , [ secr, local, ender, tipconn, ip, email, nome, obs, infoId ], (err, response) => {

            if(err){
                console.log(`update-infos`, err )
                return res.status(500).json({ msg: 'Erro no servidor! Tente novamente mais tarde.' })
            }

            db.query("UPDATE telefones SET fone_info = ?, fone_info_aux = ?, fone_info_cel = ?, fone_ddr = ? WHERE fone_codinfofone = ?", 
                        [ fone, foneaux, fonecel, foneddr, infoId ], (err, response)=>{
                if(err){
                    console.log( `update-fones`, err )
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