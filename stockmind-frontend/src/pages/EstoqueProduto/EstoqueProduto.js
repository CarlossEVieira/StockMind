import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../../services/api";

import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal";
import Layout from "../../components/Layout/Layout";
import TituloPagina from "../../components/TituloPagina/TituloPagina";
import BotaoVoltar from "../../components/BotaoVoltar/BotaoVoltar";

export default function EstoqueProduto() {

    // Id do produto recebido pela rota
    const { produtoId } = useParams();

    // Lista dos estoques do produto
    const [estoques, setEstoques] =
        useState([]);

    // Carrega os estoques ao abrir a tela
    useEffect(() => {

        carregarEstoques();

    }, [produtoId]);

    // Busca os tamanhos cadastrados
    async function carregarEstoques() {

        try {

            const resposta =
                await api.get(
                    `/estoques/produto/${produtoId}`
                );

            setEstoques(
                resposta.data
            );

        }
        catch (erro) {

            console.error(
                "Erro ao carregar estoques:",
                erro
            );

        }

    }

    return (

        <>

            <MenuPrincipal />

            <Layout>

                <TituloPagina
                    titulo={`Estoque do Produto ${produtoId}`}
                    subtitulo="Visualização por tamanho"
                />

                {/* Botões superiores */}

                <div
                    className="
                        d-flex
                        justify-content-between
                        align-items-center
                        mb-4
                    "
                >

                    <BotaoVoltar />

                    <Link
                        to={`/reposicao/${produtoId}`}
                        className="btn btn-success"
                    >
                        + Reposição Completa
                    </Link>

                </div>

                {/* Card principal */}

                <div className="card shadow-sm">

                    <div className="card-body">

                        <table
                            className="
                                table
                                table-hover
                                align-middle
                            "
                        >

                            <thead>

                                <tr>

                                    <th>
                                        ID Estoque
                                    </th>

                                    <th>
                                        Tamanho
                                    </th>

                                    <th>
                                        Quantidade
                                    </th>

                                    <th>
                                        Quantidade Mínima
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
                                                    {estoque.id}
                                                </td>

                                                <td>
                                                    {estoque.tamanho}
                                                </td>

                                                <td>
                                                    {estoque.quantidade}
                                                </td>

                                                <td>
                                                    {
                                                        estoque.quantidadeMinimaAlerta
                                                    }
                                                </td>

                                            </tr>

                                        )

                                    )

                                }

                                {

                                    estoques.length === 0 &&

                                    (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="text-center"
                                            >

                                                Nenhum estoque encontrado.

                                            </td>

                                        </tr>

                                    )

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </Layout>

        </>

    );

}