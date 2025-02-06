import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Main } from "./pages/Main"
import { Login } from "./pages/Login"
import { JustSearch } from "./pages/JustSearch"

//* Importamos o toast em App para que ele fiquei disponível (global) para uso na aplicação inteira
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <div>
    <ToastContainer 
      position='top-right'
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition:Bounce
    />

    <BrowserRouter>
      <Routes>
        <Route path="/main" element={ <Main /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/" element={ <JustSearch /> } />
      </Routes>
    </BrowserRouter>

    </div>
  )
}

export default App
