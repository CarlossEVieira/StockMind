import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Produtos from "../pages/Produtos/Produtos";
import NovoProduto from "../pages/NovoProduto/NovoProduto";
import EstoqueProduto from "../pages/EstoqueProduto/EstoqueProduto";
import EntradaEstoque from "../pages/EntradaEstoque/EntradaEstoque";
import Vendas from "../pages/Vendas/Vendas";
import Alertas from "../pages/Alertas/Alertas";
import EditarProduto from "../pages/EditarProduto/EditarProduto";
import Login from "../pages/Login/Login";
import RotaPrivada from "./RotaPrivada";
import Usuarios from "../pages/Usuarios/Usuarios";
import NovoUsuario from "../pages/Usuarios/NovoUsuario";
import EditarUsuario from "../pages/Usuarios/EditarUsuario";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route
                    path="/"
                    element={
                        <RotaPrivada>
                            <Dashboard />
                        </RotaPrivada>
                    }
                />

                <Route
                    path="/produtos"
                    element={
                        <RotaPrivada>
                            <Produtos />
                        </RotaPrivada>
                    }
                />

                <Route
                    path="/produtos/novo"
                    element={
                        <RotaPrivada>
                            <NovoProduto />
                        </RotaPrivada>
                    }
                />

                <Route
                    path="/produtos/editar/:id"
                    element={
                        <RotaPrivada>
                            <EditarProduto />
                        </RotaPrivada>
                    }
                />

                <Route
                    path="/estoque/:produtoId"
                    element={
                        <RotaPrivada>
                            <EstoqueProduto />
                        </RotaPrivada>
                    }
                />

                <Route
                    path="/estoque/entrada"
                    element={
                        <RotaPrivada>
                            <EntradaEstoque />
                        </RotaPrivada>
                    }
                />

                <Route
                    path="/vendas"
                    element={
                        <RotaPrivada>
                            <Vendas />
                        </RotaPrivada>
                    }
                />

                <Route
                    path="/alertas"
                    element={
                        <RotaPrivada>
                            <Alertas />
                        </RotaPrivada>
                    }
                />
                <Route
                    path="/usuarios"
                    element={
                        <RotaPrivada>
                            <Usuarios />
                        </RotaPrivada>
                    }
                    
                />
                <Route
                    path="/usuarios/novo"
                    element={
                        <RotaPrivada>
                            <NovoUsuario />
                        </RotaPrivada>
                    }
                    
                />
                <Route
                    path="/usuarios/editar/:id"
                    element={
                        <RotaPrivada>
                            <EditarUsuario />
                        </RotaPrivada>
                    }
                    
                />
            </Routes>
        </BrowserRouter>
    );
}