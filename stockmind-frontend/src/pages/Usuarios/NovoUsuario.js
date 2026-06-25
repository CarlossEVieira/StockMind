import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal";
import TituloPagina from "../../components/TituloPagina/TituloPagina";
import BotaoVoltar from "../../components/BotaoVoltar/BotaoVoltar";
import MensagemSistema from "../../components/MensagemSistema/MensagemSistema";

export default function NovoUsuario() {

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [perfil, setPerfil] = useState("Administrador");

    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("sucesso");

    async function salvarUsuario(evento) {

        evento.preventDefault();

        try {

            await api.post(
                "/usuarios",
                {
                    nome,
                    email,
                    senha,
                    perfil
                }
            );

            setTipoMensagem("sucesso");

            setMensagem(
                "Usuário cadastrado com sucesso."
            );

            setTimeout(() => {

                navigate("/usuarios");

            }, 1500);

        }
        catch (erro) {

            console.error(
                "Erro ao cadastrar usuário:",
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
                    "Erro ao cadastrar usuário."
                );
            }
        }
    }

    return (
        <>
            <MenuPrincipal />

            <div
                className="container-fluid"
                style={{
                    marginLeft: "260px",
                    width: "calc(100% - 260px)",
                    padding: "25px"
                }}
            >

                <TituloPagina
                    titulo="Novo Usuário"
                    subtitulo="Cadastro de usuários"
                />

                <BotaoVoltar />

                <MensagemSistema
                    tipo={tipoMensagem}
                    texto={mensagem}
                    onFechar={() =>
                        setMensagem("")
                    }
                />

                <div
                    className="card shadow-sm mt-4"
                >

                    <div className="card-body">

                        <form
                            onSubmit={salvarUsuario}
                        >

                            <div className="mb-3">

                                <label
                                    className="form-label"
                                >
                                    Nome
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={nome}
                                    onChange={(evento) =>
                                        setNome(
                                            evento.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label
                                    className="form-label"
                                >
                                    E-mail
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(evento) =>
                                        setEmail(
                                            evento.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label
                                    className="form-label"
                                >
                                    Senha
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    value={senha}
                                    onChange={(evento) =>
                                        setSenha(
                                            evento.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="mb-4">

                                <label
                                    className="form-label"
                                >
                                    Perfil
                                </label>

                                <select
                                    className="form-control"
                                    value={perfil}
                                    onChange={(evento) =>
                                        setPerfil(
                                            evento.target.value
                                        )
                                    }
                                >

                                    <option value="Administrador">
                                        Administrador
                                    </option>

                                    <option value="Gestor">
                                        Gestor
                                    </option>

                                    <option value="Operador">
                                        Operador
                                    </option>

                                </select>

                            </div>

                            <button
                                type="submit"
                                className="btn btn-success"
                            >
                                Salvar Usuário
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}