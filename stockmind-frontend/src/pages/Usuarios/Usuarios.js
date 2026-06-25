import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal";
import TituloPagina from "../../components/TituloPagina/TituloPagina";
import BotaoVoltar from "../../components/BotaoVoltar/BotaoVoltar";
import MensagemSistema from "../../components/MensagemSistema/MensagemSistema";

export default function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);

    const [mensagem, setMensagem] = useState("");

    const [tipoMensagem, setTipoMensagem] =
        useState("sucesso");

    useEffect(() => {

        carregarUsuarios();

    }, []);

    async function carregarUsuarios() {

        try {

            const resposta =
                await api.get("/usuarios");

            setUsuarios(resposta.data);

        }
        catch (erro) {

            console.error(
                "Erro ao carregar usuários:",
                erro
            );

            setTipoMensagem("erro");

            setMensagem(
                "Erro ao carregar usuários."
            );
        }
    }

    async function excluirUsuario(idUsuario) {

        const confirmouExclusao =
            window.confirm(
                "Deseja realmente excluir este usuário?"
            );

        if (!confirmouExclusao) {
            return;
        }

        try {

            await api.delete(
                `/usuarios/${idUsuario}`
            );

            await carregarUsuarios();

            setTipoMensagem("sucesso");

            setMensagem(
                "Usuário removido com sucesso."
            );

        }
        catch (erro) {

            console.error(
                "Erro ao excluir usuário:",
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
                    "Erro ao excluir usuário."
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
                    titulo="Usuários"
                    subtitulo="Gerenciamento de usuários do sistema"
                />

                <div
                    className="
                        d-flex
                        justify-content-between
                        align-items-center
                        mb-3
                    "
                >

                    <BotaoVoltar />

                    <Link
                        to="/usuarios/novo"
                        className="btn btn-success"
                    >
                        + Novo Usuário
                    </Link>

                </div>

                <MensagemSistema
                    tipo={tipoMensagem}
                    texto={mensagem}
                    onFechar={() =>
                        setMensagem("")
                    }
                />

                <div
                    className="
                        card
                        shadow-sm
                        mt-3
                    "
                >

                    <div className="card-body">

                        <table
                            className="
                                table
                                table-bordered
                                table-striped
                                align-middle
                                mb-0
                            "
                        >

                            <thead>

                                <tr>
                                    <th>Id</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Perfil</th>
                                    <th>Ativo</th>
                                    <th>Ações</th>
                                </tr>

                            </thead>

                            <tbody>

                                {
                                    usuarios.map(usuario => (

                                        <tr
                                            key={usuario.id}
                                        >

                                            <td>
                                                {usuario.id}
                                            </td>

                                            <td>
                                                {usuario.nome}
                                            </td>

                                            <td>
                                                {usuario.email}
                                            </td>

                                            <td>
                                                {usuario.perfil}
                                            </td>

                                            <td>

                                                {
                                                    usuario.ativo
                                                        ? "Sim"
                                                        : "Não"
                                                }

                                            </td>

                                            <td
                                                className="
                                                    d-flex
                                                    gap-2
                                                "
                                            >

                                                <Link
                                                    to={`/usuarios/editar/${usuario.id}`}
                                                    className="
                                                        btn
                                                        btn-warning
                                                        btn-sm
                                                    "
                                                >
                                                    Editar
                                                </Link>

                                                <button
                                                    className="
                                                        btn
                                                        btn-danger
                                                        btn-sm
                                                    "
                                                    onClick={() =>
                                                        excluirUsuario(
                                                            usuario.id
                                                        )
                                                    }
                                                >
                                                    Excluir
                                                </button>

                                            </td>

                                        </tr>

                                    ))
                                }

                                {
                                    usuarios.length === 0 && (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="text-center"
                                            >
                                                Nenhum usuário encontrado.
                                            </td>

                                        </tr>

                                    )
                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </>
    );
}