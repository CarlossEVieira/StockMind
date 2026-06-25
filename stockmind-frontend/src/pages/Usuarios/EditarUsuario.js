import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal";
import TituloPagina from "../../components/TituloPagina/TituloPagina";
import BotaoVoltar from "../../components/BotaoVoltar/BotaoVoltar";
import MensagemSistema from "../../components/MensagemSistema/MensagemSistema";

export default function EditarUsuario() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [perfil, setPerfil] = useState("Administrador");
    const [ativo, setAtivo] = useState(true);

    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("sucesso");

    // Carrega usuário ao abrir a tela
    useEffect(() => {

        async function carregarUsuario() {

            try {

                const resposta =
                    await api.get(`/usuarios/${id}`);

                setNome(resposta.data.nome);
                setEmail(resposta.data.email);
                setPerfil(resposta.data.perfil);
                setAtivo(resposta.data.ativo);

            }
            catch (erro) {

                console.error(
                    "Erro ao carregar usuário:",
                    erro
                );

                setTipoMensagem("erro");

                setMensagem(
                    "Erro ao carregar usuário."
                );
            }
        }

        carregarUsuario();

    }, [id]);

    // Salva alterações
    async function salvarUsuario(evento) {

        evento.preventDefault();

        try {

            await api.put(
                `/usuarios/${id}`,
                {
                    nome,
                    email,
                    perfil,
                    ativo
                }
            );

            setTipoMensagem("sucesso");

            setMensagem(
                "Usuário atualizado com sucesso."
            );

            setTimeout(() => {

                navigate("/usuarios");

            }, 1500);

        }
        catch (erro) {

            console.error(
                "Erro ao atualizar usuário:",
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
                    "Erro ao atualizar usuário."
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
                    titulo="Editar Usuário"
                    subtitulo="Alteração dos dados do usuário"
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
                                />

                            </div>

                            <div className="mb-3">

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

                            <div
                                className="form-check mb-4"
                            >

                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={ativo}
                                    onChange={(evento) =>
                                        setAtivo(
                                            evento.target.checked
                                        )
                                    }
                                />

                                <label
                                    className="form-check-label"
                                >
                                    Usuário ativo
                                </label>

                            </div>

                            <button
                                type="submit"
                                className="btn btn-warning"
                            >
                                Salvar Alterações
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}