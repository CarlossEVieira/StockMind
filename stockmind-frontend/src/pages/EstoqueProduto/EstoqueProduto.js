import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";

import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal";
import TituloPagina from "../../components/TituloPagina/TituloPagina";
import BotaoVoltar from "../../components/BotaoVoltar/BotaoVoltar";

export default function EstoqueProduto() {

    const { produtoId } = useParams();

    const [estoques, setEstoques] = useState([]);

    useEffect(() => {
        carregarEstoques();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [produtoId]);

    async function carregarEstoques() {

        try {

            const resposta =
                await api.get(`/estoques/produto/${produtoId}`);

            setEstoques(resposta.data);

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

            <div
                className="container-fluid"
                style={{
                    marginLeft: "260px",
                    width: "calc(100% - 260px)",
                    padding: "25px"
                }}
            >

                <TituloPagina
                    titulo={`Estoque do Produto ${produtoId}`}
                    subtitulo="Visualização por tamanho"
                />

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <BotaoVoltar />

                </div>

                <div className="card shadow-sm">

                    <div className="card-body">

                        <table className="table table-hover align-middle">

                            <thead>

                                <tr>

                                    <th>ID Estoque</th>
                                    <th>Tamanho</th>
                                    <th>Quantidade</th>
                                    <th>Quantidade Mínima</th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    estoques.map(estoque => (

                                        <tr key={estoque.id}>

                                            <td>{estoque.id}</td>

                                            <td>{estoque.tamanho}</td>

                                            <td>{estoque.quantidade}</td>

                                            <td>
                                                {estoque.quantidadeMinimaAlerta}
                                            </td>

                                        </tr>

                                    ))
                                }

                                {
                                    estoques.length === 0 &&

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="text-center"
                                        >
                                            Nenhum estoque encontrado.
                                        </td>

                                    </tr>
                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </>

    );

}