import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

import api from "../../services/api"
import { toast } from "react-toastify";

export function Login(){
    const nameRef     = useRef()
    const passwordRef = useRef()
    
    const navigate = useNavigate()

    async function handleSubmit( event ){
        event.preventDefault()

        console.log(`LOGIN FRONTEND ->`, nameRef.current.value)
        try {
            const { data: { token, msg } } = await api.post('/login', {
                name: nameRef.current.value,
                password: passwordRef.current.value
            })

            // console.log( 'LOGOU COM SUCESSO.', token, msg )
            if(!token){
                navigate('/login')
            }

            localStorage.setItem( 'token', token )
            toast.success(msg)
            navigate('/main')
        } catch(err){
            // alert(`Senha ou nome incorretos: ${ err }`)
            toast.error(`Senha ou nome incorretos!`)
        }
        
    }

    return(
        <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
            <form className="flex flex-col gap-5" onSubmit={ handleSubmit } >
                <input ref={ nameRef } placeholder="Nome" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                {/* <input ref={ emailRef } placeholder="Email" type="email"  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" /> */}
                <input ref={ passwordRef } placeholder="Senha" type ="password"  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />

                <button className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-400">Login</button>
            </form>
            
            <div className="text-center"> Nao tem cadastro? Sem problema. 
                <Link to="/" className="font-bold hover:underline"> Clique aqui </Link>
                    para visualizar a lista de ramais!
            </div>
        </div>
    )
}