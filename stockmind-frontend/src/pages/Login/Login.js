import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import MensagemSistema from "../../components/MensagemSistema/MensagemSistema";

export default function Login() {

    const navigate = useNavigate();

    // Dados do formulário
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    // Mensagem exibida na tela
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] =
        useState("erro");

    // Realiza login
    async function entrar(evento) {

        evento.preventDefault();

        try {

            const resposta =
                await api.post(
                    "/usuarios/login",
                    {
                        email,
                        senha
                    }
                );

            // Salva informações do usuário logado
            localStorage.setItem(
                "stockmind_usuario_logado",
                "true"
            );

            localStorage.setItem(
                "stockmind_nome_usuario",
                resposta.data.nome
            );

            localStorage.setItem(
                "stockmind_email_usuario",
                resposta.data.email
            );

            localStorage.setItem(
                "stockmind_perfil_usuario",
                resposta.data.perfil
            );

            navigate("/");

        }
        catch (erro) {

            console.error(
                "Erro ao realizar login:",
                erro
            );

            setTipoMensagem("erro");

            if (
                erro.response &&
                erro.response.data
            ) {
                setMensagem(
                    erro.response.data
                );
            }
            else {

                setMensagem(
                    "Não foi possível realizar o login."
                );

            }

        }

    }

    return (

        <div
            className="
                d-flex
                justify-content-center
                align-items-center
            "
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg,#111827,#1f2937)"
            }}
        >

            <div
                className="
                    card
                    shadow-lg
                    border-0
                    p-4
                "
                style={{
                    width: "100%",
                    maxWidth: "430px",
                    borderRadius: "18px"
                }}
            >

                <div className="text-center mb-4">

                    <div
                        style={{
                            fontSize: "3.2rem"
                        }}
                    >
                        📦
                    </div>

                    <h2 className="fw-bold mt-2">
                        StockMind
                    </h2>

                    <p className="text-muted mb-0">
                        Sistema Inteligente de Gestão de Estoque
                    </p>

                </div>

                <MensagemSistema
                    tipo={tipoMensagem}
                    texto={mensagem}
                    onFechar={() =>
                        setMensagem("")
                    }
                />

                <form
                    onSubmit={entrar}
                >

                    <div className="mb-3">

                        <label className="form-label">
                            E-mail
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(evento) =>
                                setEmail(
                                    evento.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label">
                            Senha
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(evento) =>
                                setSenha(
                                    evento.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="
                            btn
                            btn-dark
                            w-100
                        "
                    >
                        Entrar
                    </button>

                </form>

                <hr />

                <div className="text-center">

                    <small className="text-muted">

                        Utilize um usuário cadastrado
                        no sistema para acessar.

                    </small>

                </div>

            </div>

        </div>

    );

}