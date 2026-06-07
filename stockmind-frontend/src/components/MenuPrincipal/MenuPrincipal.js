import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function MenuPrincipal() {
    // Descobre qual rota/página está aberta
    const location = useLocation();

    // Permite navegar pelo código
    const navigate = useNavigate();

    // Nome do usuário salvo no login
    const nomeUsuario = localStorage.getItem("stockmind_nome_usuario") || "Usuário";

    // Guarda a quantidade de alertas pendentes
    const [quantidadeAlertas, setQuantidadeAlertas] = useState(0);

    // Carrega alertas quando o menu aparece
    useEffect(() => {
        carregarAlertas();
    }, []);

    // Busca alertas no backend
    async function carregarAlertas() {
        try {
            const resposta = await api.get("/alertas");

            // Filtra somente alertas que ainda não foram resolvidos
            const alertasPendentes = resposta.data.filter(
                (alerta) => !alerta.resolvido
            );

            setQuantidadeAlertas(alertasPendentes.length);
        } catch (erro) {
            console.error("Erro ao carregar alertas:", erro);
        }
    }

    // Retorna "active" quando o link for a página atual
    function estaAtivo(caminho) {
        return location.pathname === caminho ? "active" : "";
    }

    // Faz logout do sistema
    function sair() {
        localStorage.removeItem("stockmind_usuario_logado");
        localStorage.removeItem("stockmind_nome_usuario");

        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">

                <Link className="navbar-brand fw-bold" to="/">
                    📦 StockMind
                </Link>

                <div className="collapse navbar-collapse show">
                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">
                            <Link
                                className={`nav-link ${estaAtivo("/")}`}
                                to="/"
                            >
                                🏠 Dashboard
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className={`nav-link ${estaAtivo("/produtos")}`}
                                to="/produtos"
                            >
                                📦 Produtos
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className={`nav-link ${estaAtivo("/estoque/entrada")}`}
                                to="/estoque/entrada"
                            >
                                ➕ Entrada
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className={`nav-link ${estaAtivo("/vendas")}`}
                                to="/vendas"
                            >
                                💰 Vendas
                            </Link>
                        </li>

                        <li className="nav-item position-relative">
                            <Link
                                className={`nav-link ${estaAtivo("/alertas")}`}
                                to="/alertas"
                            >
                                ⚠️ Alertas
                            </Link>

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

                    <div className="d-flex align-items-center gap-3">
                        <span className="text-light small">
                            👤 {nomeUsuario}
                        </span>

                        <button
                            className="btn btn-outline-light btn-sm"
                            onClick={sair}
                        >
                            🚪 Sair
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}