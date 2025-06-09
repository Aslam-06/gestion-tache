import { BrowserRouter, Route, Routes } from "react-router-dom"
import Todo from "./pages/Todo"
import Connexion from "./pages/Login"
import Inscription from "./pages/Register"
import Deconnexion from "./pages/deconnexion"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/deconnexion" element={<Deconnexion />} />
          <Route path="/login" element={<Connexion />} />
          <Route path="/register" element={<Inscription />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App