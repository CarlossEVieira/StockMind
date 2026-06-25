import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal";
import TituloPagina from "../../components/TituloPagina/TituloPagina";
import BotaoVoltar from "../../components/BotaoVoltar/BotaoVoltar";
import MensagemSistema from "../../components/MensagemSistema/MensagemSistema";

export default function Produtos() {


const [produtos, setProdutos] = useState([]);

const [mensagem, setMensagem] = useState("");

const [tipoMensagem, setTipoMensagem] =
    useState("sucesso");

const [textoBusca, setTextoBusca] =
    useState("");

const [categoriaSelecionada,
    setCategoriaSelecionada] =
    useState("");

useEffect(() => {

    carregarProdutos();

}, []);

async function carregarProdutos() {

    try {

        const resposta =
            await api.get("/produtos");

        setProdutos(resposta.data);

    }
    catch (erro) {

        console.error(
            "Erro ao carregar produtos:",
            erro
        );

        setTipoMensagem("erro");

        setMensagem(
            "Erro ao carregar produtos."
        );
    }
}

async function excluirProduto(idProduto) {

    const confirmouExclusao =
        window.confirm(
            "Deseja realmente excluir este produto?"
        );

    if (!confirmouExclusao) {
        return;
    }

    try {

        await api.delete(
            `/produtos/${idProduto}`
        );

        await carregarProdutos();

        setTipoMensagem("sucesso");

        setMensagem(
            "Produto excluído com sucesso."
        );
    }
    catch (erro) {

        console.error(
            "Erro ao excluir produto:",
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
                "Erro ao excluir produto."
            );
        }
    }
}

const categoriasDisponiveis =
    useMemo(() => {

        const categorias =
            produtos
                .map(
                    produto =>
                        produto.categoria
                )
                .filter(
                    categoria =>
                        categoria &&
                        categoria.trim() !== ""
                );

        return [
            ...new Set(categorias)
        ].sort();

    }, [produtos]);

const produtosFiltrados =
    useMemo(() => {

        return produtos.filter(
            produto => {

                const nomeProduto =
                    produto.nome?.toLowerCase()
                    || "";

                const textoBuscaFormatado =
                    textoBusca.toLowerCase();

                const atendeBusca =
                    nomeProduto.includes(
                        textoBuscaFormatado
                    );

                const atendeCategoria =
                    categoriaSelecionada === ""
                    ||
                    produto.categoria ===
                    categoriaSelecionada;

                return (
                    atendeBusca
                    &&
                    atendeCategoria
                );
            }
        );

    }, [
        produtos,
        textoBusca,
        categoriaSelecionada
    ]);

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
                titulo="Produtos"
                subtitulo="Lista de produtos cadastrados no estoque"
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
                    to="/produtos/novo"
                    className="btn btn-success"
                >
                    + Novo Produto
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
                    mb-3
                "
            >

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6">

                            <label
                                className="form-label"
                            >
                                Buscar por nome
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Digite o nome do produto"
                                value={textoBusca}
                                onChange={(evento) =>
                                    setTextoBusca(
                                        evento.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="col-md-6">

                            <label
                                className="form-label"
                            >
                                Filtrar por categoria
                            </label>

                            <select
                                className="form-control"
                                value={categoriaSelecionada}
                                onChange={(evento) =>
                                    setCategoriaSelecionada(
                                        evento.target.value
                                    )
                                }
                            >

                                <option value="">
                                    Todas as categorias
                                </option>

                                {
                                    categoriasDisponiveis.map(
                                        categoria => (
                                            <option
                                                key={categoria}
                                                value={categoria}
                                            >
                                                {categoria}
                                            </option>
                                        )
                                    )
                                }

                            </select>

                        </div>

                    </div>

                </div>

            </div>

            <div
                className="
                    card
                    shadow-sm
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
                                <th>Categoria</th>
                                <th>Localização</th>
                                <th>Ações</th>
                            </tr>

                        </thead>

                        <tbody>

                            {
                                produtosFiltrados.map(
                                    produto => (

                                        <tr
                                            key={produto.id}
                                        >

                                            <td>
                                                {produto.id}
                                            </td>

                                            <td>
                                                {produto.nome}
                                            </td>

                                            <td>
                                                {
                                                    produto.categoria
                                                    || "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    produto.localizacao
                                                }
                                            </td>

                                            <td
                                                className="
                                                    d-flex
                                                    gap-2
                                                    flex-wrap
                                                "
                                            >

                                                <Link
                                                    to={`/estoque/${produto.id}`}
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    Ver Estoque
                                                </Link>

                                                <Link
                                                    to={`/produtos/editar/${produto.id}`}
                                                    className="btn btn-sm btn-warning"
                                                >
                                                    Editar
                                                </Link>

                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() =>
                                                        excluirProduto(
                                                            produto.id
                                                        )
                                                    }
                                                >
                                                    Excluir
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )
                            }

                            {
                                produtosFiltrados.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="text-center"
                                        >
                                            Nenhum produto encontrado.
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
