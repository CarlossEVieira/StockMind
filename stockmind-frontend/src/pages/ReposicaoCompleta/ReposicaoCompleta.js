import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";

import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal";
import Layout from "../../components/Layout/Layout";
import TituloPagina from "../../components/TituloPagina/TituloPagina";
import BotaoVoltar from "../../components/BotaoVoltar/BotaoVoltar";
import MensagemSistema from "../../components/MensagemSistema/MensagemSistema";

export default function ReposicaoCompleta() {

    const { produtoId } = useParams();

    const [produto, setProduto] = useState(null);

    const [estoques, setEstoques] = useState([]);

    const [observacao, setObservacao] = useState("");

    const [mensagem, setMensagem] = useState("");

    const [tipoMensagem, setTipoMensagem] =
        useState("sucesso");

        useEffect(() => {carregarProduto();carregarEstoques();

        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);

    async function carregarProduto() {

        try {

            const resposta =
                await api.get(`/produtos/${produtoId}`);

            setProduto(resposta.data);

        }
        catch (erro) {

            console.error(
                "Erro ao carregar produto:",
                erro
            );

        }

    }

    async function carregarEstoques() {

        try {

            const resposta =
                await api.get(
                    `/estoques/produto/${produtoId}`
                );

            const estoquesComEntrada =
                resposta.data.map(
                    estoque => ({
                        ...estoque,
                        quantidadeEntrada: 0
                    })
                );

            setEstoques(
                estoquesComEntrada
            );

        }
        catch (erro) {

            console.error(
                "Erro ao carregar estoques:",
                erro
            );

        }

    }

    function alterarQuantidadeEntrada(
        idEstoque,
        valor
    ) {

        setEstoques(

            estoques.map(

                estoque =>

                    estoque.id === idEstoque

                        ? {
                            ...estoque,
                            quantidadeEntrada: valor
                        }

                        : estoque

            )

        );

    }

        // Registra a reposição completa
    async function registrarReposicao(evento) {

        evento.preventDefault();

        // Monta somente os tamanhos que receberam entrada
        const itensReposicao =

            estoques

                .filter(

                    estoque =>

                        Number(
                            estoque.quantidadeEntrada
                        ) > 0

                )

                .map(

                    estoque => ({

                        tamanho:
                            estoque.tamanho,

                        quantidade:
                            Number(
                                estoque.quantidadeEntrada
                            )

                    })

                );

        // Nenhum tamanho informado
        if (itensReposicao.length === 0) {

            setTipoMensagem("erro");

            setMensagem(
                "Informe ao menos uma quantidade para reposição."
            );

            return;

        }

        const reposicaoCompleta = {

            produtoId:
                Number(produtoId),

            observacao,

            itens:
                itensReposicao

        };

        try {

            const resposta =

                await api.post(

                    "/estoques/reposicao-completa",

                    reposicaoCompleta

                );

            setTipoMensagem("sucesso");

            setMensagem(

                resposta.data ||

                "Reposição realizada com sucesso."

            );

            // Atualiza estoque na tela

            await carregarEstoques();

            // Limpa observação

            setObservacao("");

        }
        catch (erro) {

            console.error(

                "Erro ao registrar reposição:",

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

                    "Erro ao registrar reposição."

                );

            }

        }

    }

    return (

        <>

            <MenuPrincipal />

            <Layout>

                <TituloPagina
                    titulo="Reposição Completa"
                    subtitulo="Reposição de todos os tamanhos do produto"
                />

                <BotaoVoltar />

                <MensagemSistema
                    tipo={tipoMensagem}
                    texto={mensagem}
                    onFechar={() =>
                        setMensagem("")
                    }
                />

                <form
                    onSubmit={registrarReposicao}
                    className="mt-4"
                >

                    <div className="card shadow-sm">

                        <div className="card-body">

                            <h5>

                                Produto

                            </h5>

                            <p className="mb-4">

                                <strong>

                                    {
                                        produto?.nome
                                    }

                                </strong>

                            </p>

                            <table className="table">

                            <thead>

                                <tr>

                                    <th>
                                        Tamanho
                                    </th>

                                    <th>
                                        Estoque Atual
                                    </th>

                                    <th>
                                        Entrada
                                    </th>

                                    <th>
                                        Estoque Final
                                    </th>

                                </tr>

                            </thead>

                                <tbody>

                                    {

                                        estoques.map(

                                            estoque => (

                                               <tr
                                                    key={estoque.id}
                                                >

                                                    <td>

                                                        {estoque.tamanho}

                                                    </td>

                                                    <td>

                                                        {estoque.quantidade}

                                                    </td>

                                                    <td>

                                                        <input

                                                            type="number"

                                                            min="0"

                                                            className="form-control"

                                                            value={
                                                                estoque.quantidadeEntrada
                                                            }

                                                            onChange={
                                                                evento =>

                                                                    alterarQuantidadeEntrada(

                                                                        estoque.id,

                                                                        evento.target.value

                                                                    )

                                                            }

                                                        />

                                                    </td>

                                                    <td>

                                                        <strong

                                                            className={

                                                                Number(
                                                                    estoque.quantidadeEntrada
                                                                ) > 0

                                                                    ? "text-success fw-bold"

                                                                    : "text-secondary"

                                                            }

                                                        >

                                                            {

                                                                Number(
                                                                    estoque.quantidade
                                                                )

                                                                +

                                                                Number(
                                                                    estoque.quantidadeEntrada
                                                                )

                                                            }

                                                        </strong>

                                                    </td>

                                                </tr>

                                            )

                                        )

                                    }

                                </tbody>

                            </table>

                            <div className="mt-4">

                                <label className="form-label">

                                    Observação

                                </label>

                                <input

                                    className="form-control"

                                    value={observacao}

                                    onChange={
                                        evento =>

                                            setObservacao(
                                                evento.target.value
                                            )

                                    }

                                />

                            </div>

                        </div>

                    </div>

                    <button
                        className="
                            btn
                            btn-success
                            mt-4
                        "
                    >

                        Registrar Reposição

                    </button>

                </form>

            </Layout>

        </>

    );

}