import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    BsBoxSeam,
    BsGrid1X2,
    BsBoxes,
    BsBoxArrowInDown,
    BsCartCheck,
    BsBell,
    BsPeople,
    BsBoxArrowRight,
    BsPersonCircle
} from "react-icons/bs";

import api from "../../services/api";

import "./MenuPrincipal.css";

export default function MenuPrincipal() {
    const location = useLocation();

    const navigate = useNavigate();

    const nomeUsuario =
        localStorage.getItem("stockmind_nome_usuario") ||
        "Usuário";

    const perfilUsuario =
        localStorage.getItem("stockmind_perfil_usuario") ||
        "Administrador";

    const [quantidadeAlertas, setQuantidadeAlertas] =
        useState(0);

    useEffect(() => {
        carregarAlertas();
    }, []);

    async function carregarAlertas() {
        try {
            const resposta =
                await api.get("/alertas");

            const alertasPendentes =
                resposta.data.filter(
                    alerta => !alerta.resolvido
                );

            setQuantidadeAlertas(
                alertasPendentes.length
            );
        }
        catch (erro) {
            console.error(
                "Erro ao carregar alertas:",
                erro
            );
        }
    }

    function estaAtivo(caminho) {
        return location.pathname === caminho;
    }

    function sair() {
        localStorage.removeItem(
            "stockmind_usuario_logado"
        );

        localStorage.removeItem(
            "stockmind_nome_usuario"
        );

        localStorage.removeItem(
            "stockmind_email_usuario"
        );

        localStorage.removeItem(
            "stockmind_perfil_usuario"
        );

        navigate("/login");
    }

    return (
        <aside className="menu-lateral">

            <div className="menu-logo-area">

                <div className="menu-logo-icone">
                    <BsBoxSeam />
                </div>

                <div>
                    <h4 className="menu-logo-titulo">
                        StockMind
                    </h4>

                    <span className="menu-logo-subtitulo">
                        Gestão Inteligente
                    </span>
                </div>

            </div>

            <div className="menu-usuario-area">

                <div className="menu-usuario-avatar">
                    <BsPersonCircle />
                </div>

                <div className="menu-usuario-dados">

                    <strong className="menu-usuario-nome">
                        {nomeUsuario}
                    </strong>

                    <span className="menu-usuario-perfil">
                        {perfilUsuario}
                    </span>

                </div>

            </div>

            <div className="menu-secao-titulo">
                Menu Principal
            </div>

            <nav className="menu-links">

                <Link
                    to="/"
                    className={
                        estaAtivo("/")
                            ? "menu-link ativo"
                            : "menu-link"
                    }
                >
                    <BsGrid1X2 className="menu-link-icone" />
                    <span>Dashboard</span>
                </Link>

                <Link
                    to="/produtos"
                    className={
                        estaAtivo("/produtos")
                            ? "menu-link ativo"
                            : "menu-link"
                    }
                >
                    <BsBoxes className="menu-link-icone" />
                    <span>Produtos</span>
                </Link>

                <Link
                    to="/estoque/entrada"
                    className={
                        estaAtivo("/estoque/entrada")
                            ? "menu-link ativo"
                            : "menu-link"
                    }
                >
                    <BsBoxArrowInDown className="menu-link-icone" />
                    <span>Entrada</span>
                </Link>

                <Link
                    to="/vendas"
                    className={
                        estaAtivo("/vendas")
                            ? "menu-link ativo"
                            : "menu-link"
                    }
                >
                    <BsCartCheck className="menu-link-icone" />
                    <span>Vendas</span>
                </Link>

                <Link
                    to="/alertas"
                    className={
                        estaAtivo("/alertas")
                            ? "menu-link ativo"
                            : "menu-link"
                    }
                >
                    <BsBell className="menu-link-icone" />
                    <span>Alertas</span>

                    {
                        quantidadeAlertas > 0 && (
                            <span className="menu-alerta-badge">
                                {quantidadeAlertas}
                            </span>
                        )
                    }
                </Link>

                <Link
                    to="/usuarios"
                    className={
                        estaAtivo("/usuarios")
                            ? "menu-link ativo"
                            : "menu-link"
                    }
                >
                    <BsPeople className="menu-link-icone" />
                    <span>Usuários</span>
                </Link>

            </nav>

            <div className="menu-sair-area">

                <button
                    className="menu-sair-botao"
                    onClick={sair}
                >
                    <BsBoxArrowRight className="menu-link-icone" />
                    <span>Sair</span>
                </button>

            </div>

        </aside>
    );
}