import { Navigate } from "react-router-dom";

export default function RotaPrivada({ children }) {
    // Verifica se o usuário está logado
    const usuarioLogado = localStorage.getItem("stockmind_usuario_logado");

    // Se não estiver logado, volta para login
    if (usuarioLogado !== "true") {
        return <Navigate to="/login" replace />;
    }

    // Se estiver logado, libera a tela
    return children;
}