import express from "express";
import db from '../services/connection.js'

const router = express.Router()

//! ------ GET ALL INFOS BY INFO_COD - BEGIN ------
router.post( '/getInfosById', (req, res) => {    
    try{        
        let info_cod = req.body.infoCod
        console.log(`pubr -> getInfosById: ${ req.body.infoCod }`)
        if( !info_cod ){
            return res.status(400).json({ msg: 'Erro na pesquisa!' })
        }

        let sqlInfoById = 'SELECT inf.info_cod, inf.info_secr, inf.info_local, inf.info_ender, inf.info_tipconn,'
                        + ' inf.info_ip, inf.info_email, inf.info_nome,'
                        + ' fon.fone_info, fon.fone_info_aux, fon.fone_info_cel, fon.fone_ddr, inf.info_obs'
                        + ' FROM informacoes inf, telefones fon'
                        + ' WHERE fon.fone_codinfofone = inf.info_cod'
                        + ' AND info_cod = ' + info_cod

        db.query( sqlInfoById, ( err, result ) => {
            if(err){
                res.status(500).json({ err , erro: true})
            }

            if( result.length > 0 ){
                res.status(202).json({ msg: "Informacao obtida com sucesso!", result })
            } else {
                res.status(404).json({ err, msg: "Registro nao encontrado!" })
            }
        })
    } catch(e){
        console.log(e)
    }
})
//! ------ GET ALL INFOS BY INFO_COD - END --------

//! ------ GET ALL INFOS AND FONES - BEGIN ------
router.get( '/getInfosFones', (req, res) => {
    try{
        console.log('pubr -> getInfos')
        let sqlInfos = 'SELECT inf.info_cod, inf.info_secr, inf.info_local, inf.info_ender, inf.info_tipconn,'
        + ' inf.info_ip, inf.info_email, inf.info_nome,'
        + ' fon.fone_info, fon.fone_info_aux, fon.fone_info_cel, fon.fone_ddr, inf.info_obs'
        + ' FROM informacoes inf, telefones fon'
        + ' WHERE fon.fone_codinfofone = inf.info_cod'
        + ' ORDER BY inf.info_secr'

        db.query( sqlInfos, (err, result) => {
            if(err){
                return res.status(500).json(err)
            }

            if( result.length > 0 ) {
                res.status(202).json({ msg: "Informacoes obtidas com sucesso!", result })
            } else {
                res.status(404).json({ err, msg: 'Nenhuma informacao encontrada!' })
            }
        })
    } catch (e) {
        console.log(`Error: `, e)
    }
})
//! ------ GET ALL INFOS AND FONES - END --------

//! ------ GET INFOS - BEGIN ------
router.get( '/getInfos', (req, res) => {
    try{
        console.log('pubr -> getInfos')
        let sqlInfos = 'SELECT inf.info_cod, inf.info_secr, inf.info_local, inf.info_ender, inf.info_tipconn,'
        + ' inf.info_ip, inf.info_email, inf.info_nome'
        + ' FROM informacoes inf'
        + ' ORDER BY inf.info_secr'

        db.query( sqlInfos, (err, result) => {
            if(err){
                return res.status(500).json(err)
            }

            if( result.length > 0 ) {
                res.status(202).json({ msg: "Informacoes obtidas com sucesso!", result })
            } else {
                res.status(404).json({ err, msg: 'Nenhuma informacao encontrada!' })
            }
        })
    } catch (e) {
        console.log(`Error: `, e)
    }
})
//! ------ GET INFOS - END --------

export default router


