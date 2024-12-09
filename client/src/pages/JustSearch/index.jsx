import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api"

import "./index.css"
import { toast } from "react-toastify";

export function JustSearch() {
    const [ styleBtnSavEdit, setStyleBtnSavEdit  ] = useState( {
        info: 'Cadastrar',
        type: 'w-4/12 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400'
    } )
    const [ styleInputSavEdit, setStyleInputSavEdit ] = useState( {
        bgColor: 'bg-transparent br-gradient',
        bgColorSecondary: 'bg-transparent'
    } )

    const [ listInfo, setListInfo ] = useState([])
    const [ searchInfo, setSearchInfo ] = useState('')

    const [ idInfo, setIdInfo] = useState('')
    const [ name, setName] = useState('')
    const [ secretariat, setSecretariat] = useState('')
    const [ sector, setSector] = useState('')
    const [ address, setAddress] = useState('')
    const [ typConn, setTypConn] = useState('')
    const [ ip, setIp] = useState('')
    const [ email, setEmail] = useState('')
    const [ foneMain, setFoneMain] = useState('')
    const [ foneSecond, setFoneSecond] = useState('')
    const [ foneMobile, setFoneMobile] = useState('')
    const [ observation, setObservation] = useState('')

    const [ isActive, setIsActive ] = useState('')

    const headers = {
        'Content-type': 'application/json'
    }    

    const getAllInfos = async () => {
        console.log(`front -> getAllInfo`)
        try {
            // await api.get('/getInfos', {}, { headers })
            await api.get('/getInfosFones', {}, { headers })
            .then( (response) => {
                setListInfo(response.data.result)
            } )
        } catch (error) {
            setListInfo([])
            toast.error(error.response.data.msg)
        }
    }

    function tirarAcentos(word){
        return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }

    let filteredInfos = ''
    if( listInfo !== '' && listInfo.length > 0  ){
        filteredInfos = sector.length > 0
            ? (
                listInfo.filter( info => tirarAcentos( info.info_secr.toLowerCase()+"-"+info.info_local.toLowerCase()+"-"+info.info_nome.toLowerCase())
                                          .includes( tirarAcentos(sector.toLowerCase()) ) 
                               )
            )
            : []
    }

    const handleClickViewInfos = ( info_id, info_name, info_secretar, info_sect, info_addr, info_typconn, info_ip, 
                                   info_email, info_fonemain, info_fonesecond, info_fonemobil, info_obs,
                                   info_foneddr ) => {
        setIdInfo( info_id )
        setName( info_name )
        setSecretariat( info_secretar )
        setSector( info_sect )
        setAddress( info_addr )
        setTypConn( info_typconn )
        setIp( info_ip )
        setEmail( info_email )

        info_fonemain !== null ? setFoneMain( info_fonemain ) : ""
        info_fonesecond !== null ? setFoneSecond( info_fonesecond ) : ""
        info_fonemobil !== null ? setFoneMobile( info_fonemobil ) : ""
        info_obs !== null ? setObservation( info_obs ) : ""
    }

    const clearField = () => {
        setStyleBtnSavEdit( { info: "Cadastrar", type: "w-4/12 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400"} )
        // setStyleInputSavEdit( {bgColor: 'bg-transparent'} )
        setIdInfo( '' )
        setName( '' )
        setSecretariat( '' )
        setSector( '' )
        setAddress( '' )
        setTypConn( '' )
        setIp( '' )
        setEmail( '' )

        setFoneMain( '' )
        setFoneSecond( '' )
        setFoneMobile( '' )
        setObservation( '' )
    }

    useEffect( () => {
        getAllInfos()
    }, [])

    return (
        <div className="max-w-5xl mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Lista de Ramais - Consulta
            </h2>
            <form className="flex flex-col gap-4">
                <div className=" flex flex-row justify-between">
                    <input type="text" placeholder="ID" disabled readOnly value={ idInfo } onChange= { e => (setIdInfo( e.target.value )) }
                           className="w-1/12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                    
                    <div className="w-10/12">
                        <input type="search" placeholder="Pesquise por Setor/Depto ..." value={ sector } onChange= { e => (setSector( e.target.value )) } 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                            onFocus={ () => { setIsActive(true) } }
                        />

                        <div id="searchSelect" style={{ display: isActive ? 'inherit' : 'none' }} >
                            { sector.length > 0 ?
                            (                                    
                                <ul className="myUL" >
                                    <div className="dropdown-content">
                                    {   
                                        listInfo.length > 0 
                                        ? ( 
                                            filteredInfos.map( repo => {                                
                                                return (
                                                    
                                                    <li key={ repo.info_cod }
                                                        onClick={ () => {   handleClickViewInfos( repo.info_cod, repo.info_nome, repo.info_secr, repo.info_local,
                                                                                                repo.info_ender, repo.info_tipconn, repo.info_ip, repo.info_email,
                                                                                                repo.fone_info, repo.fone_info_aux, repo.fone_info_cel, repo.info_obs,
                                                                                                repo.fone_ddr
                                                                                            )
                                                                            setIsActive( false ) } 
                                                        }
                                                        
                                                    >
                                                        { 
                                                            repo.info_local !== null 
                                                                ? repo.info_secr +"-"+ repo.info_local +" - "+ repo.info_nome +" - "+ repo.fone_info +" - "+ repo.fone_info_aux +" - "+ repo.fone_info_cel
                                                                : repo.info_local
                                                        }
                                                    </li>
                                                )
                                            })
                                        ) : null
                                    }
                                    </div>
                                </ul>
                            ) : (                                    
                                null                                    
                            ) }
                        </div>
                    </div>
                </div>

                <div className=" flex flex-row justify-between">
                    <input type="text" placeholder="Secretaria" value={ secretariat } onChange= { e => (setSecretariat( e.target.value )) }
                           className="w-7/12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none" 
                           onClick={ () => { setIsActive(false) } }
                    />

                    <input type="text" placeholder="Nome" value={ name } onChange= { e => (setName( e.target.value )) }
                           className="w-4/12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none" 
                           onClick={ () => { setIsActive(false) } }
                    />                    
                </div>

                <div className="flex-row">
                    <input type="text" placeholder="Endereco" value={ address } onChange= { e => (setAddress( e.target.value )) }
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" 
                           onClick={ () => { setIsActive(false) } }
                    />
                </div>

                <div className="flex-row">
                    <input type="email" placeholder="Email" value={ email } onChange= { e => (setEmail( e.target.value )) }
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" 
                           onClick={ () => { setIsActive(false) } }
                    />
                </div>

                <div className=" flex flex-row justify-between">
                    <input type="tel" placeholder="Telefone (principal)" value={ foneMain } onChange= { e => (setFoneMain( e.target.value )) } 
                           className="w-4/12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none" 
                           onClick={ () => { setIsActive(false) } }
                    />
                    <input type="text" placeholder="Telefone (secundario)" value={ foneSecond } onChange= { e => (setFoneSecond( e.target.value )) } 
                           className="w-4/12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none" 
                           onClick={ () => { setIsActive(false) } }
                    />
                    <input type="text" placeholder="Telefone (celular)" value={ foneMobile } onChange= { e => (setFoneMobile( e.target.value )) } 
                           className="w-3/12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none" 
                           onClick={ () => { setIsActive(false) } }
                    />
                </div>

                <div className="flex-row">
                    <input type="text" placeholder="Observacao" value={ observation } onChange= { e => (setObservation( e.target.value )) } 
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" 
                           onClick={ () => { setIsActive(false) } }
                    />
                </div>
                
                <div className="text-center flex flex-row justify-around">

                    <button type="button" 
                            className="w-4/12 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-400" 
                            onClick={ () => clearField() } >
                        Limpar
                    </button>
                </div>
                
                <div className="text-center"> Para retornar ao login, 
                    <Link to="/login" className="font-bold hover:underline"> clique aqui </Link>
                </div>
                

            </form>
        </div>
    )
}