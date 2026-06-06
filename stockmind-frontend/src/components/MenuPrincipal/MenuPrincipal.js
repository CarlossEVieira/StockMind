import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function MenuPrincipal() {
    // Hook para saber em qual rota estamos
    const location = useLocation();

    // Estado para guardar quantidade de alertas pendentes
    const [quantidadeAlertas, setQuantidadeAlertas] = useState(0);

    // Carrega alertas ao abrir o menu
    useEffect(() => {
        carregarAlertas();
    }, []);

    // Função para buscar alertas no backend
    async function carregarAlertas() {
        try {
            const resposta = await api.get("/alertas");

            // Filtra apenas alertas NÃO resolvidos
            const alertasPendentes = resposta.data.filter(
                (alerta) => !alerta.resolvido
            );

            // Atualiza o contador
            setQuantidadeAlertas(alertasPendentes.length);
        } catch (erro) {
            console.error("Erro ao carregar alertas:", erro);
        }
    }

    // Função para verificar se a rota está ativa
    function estaAtivo(caminho) {
        return location.pathname === caminho ? "active" : "";
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">

                {/* Nome do sistema */}
                <Link className="navbar-brand fw-bold" to="/">
                    📦 StockMind
                </Link>

                <div className="collapse navbar-collapse show">
                    <ul className="navbar-nav me-auto">

                        {/* DASHBOARD */}
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${estaAtivo("/")}`}
                                to="/"
                            >
                                🏠 Dashboard
                            </Link>
                        </li>

                        {/* PRODUTOS */}
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${estaAtivo("/produtos")}`}
                                to="/produtos"
                            >
                                📦 Produtos
                            </Link>
                        </li>

                        {/* ENTRADA DE ESTOQUE */}
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${estaAtivo("/estoque/entrada")}`}
                                to="/estoque/entrada"
                            >
                                ➕ Entrada
                            </Link>
                        </li>

                        {/* VENDAS */}
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${estaAtivo("/vendas")}`}
                                to="/vendas"
                            >
                                💰 Vendas
                            </Link>
                        </li>

                        {/* ALERTAS COM BADGE */}
                        <li className="nav-item position-relative">
                            <Link
                                className={`nav-link ${estaAtivo("/alertas")}`}
                                to="/alertas"
                            >
                                ⚠️ Alertas
                            </Link>

                            {/* Badge vermelho com quantidade */}
                            {quantidadeAlertas > 0 && (
                                <span
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    style={{ fontSize: "0.7rem" }}
                                >
                                    {quantidadeAlertas}
                                </span>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}