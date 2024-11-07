import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

// import api from "../../services/api"

export function Login(){
    // const nameRef       = useRef()
    const emailRef        = useRef()
    const passwordRef     = useRef()
    
    const navigate = useNavigate()

    async function handleSubmit( event ){
        event.preventDefault()

        try {
            const { data:token } = await api.post('/login', { // { data } - desestrutura a info vinda do backend, pega a info "data" e a chama de "token"
                // name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            })

            localStorage.setItem( 'token', token )
            
            navigate('/listar-usuarios')
        } catch(err){
            alert(`Senha ou email incorretos: ${ err }`)
        }
        
    }

    return(
        <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
            <form className="flex flex-col gap-5" onSubmit={ handleSubmit } >
                {/* <input ref={ nameRef } placeholder="Nome" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" /> */}
                <input ref={ emailRef } placeholder="Email" type="email"  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                <input ref={ passwordRef } placeholder="Senha" type ="password"  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />

                <button className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-400">Login</button>
            </form>
            
            <Link to="/justsearch" className="text-blue-700 hover:underline mt-4 block text-center">Nao tem cadastro? Consule a lista de ramais!</Link>
        </div>
    )
}