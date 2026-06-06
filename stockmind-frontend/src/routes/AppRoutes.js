import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Produtos from "../pages/Produtos/Produtos";
import NovoProduto from "../pages/NovoProduto/NovoProduto";
import EstoqueProduto from "../pages/EstoqueProduto/EstoqueProduto";
import EntradaEstoque from "../pages/EntradaEstoque/EntradaEstoque";
import Vendas from "../pages/Vendas/Vendas";
import Alertas from "../pages/Alertas/Alertas";
import EditarProduto from "../pages/EditarProduto/EditarProduto";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/produtos/novo" element={<NovoProduto />} />
                <Route path="/estoque/:produtoId" element={<EstoqueProduto />} />
                <Route path="/estoque/entrada" element={<EntradaEstoque />} />
                <Route path="/vendas" element={<Vendas />} />
                <Route path="/alertas" element={<Alertas />} />
                <Route path="/produtos/editar/:id" element={<EditarProduto />} /> 
            </Routes>
        </BrowserRouter>
    );
}