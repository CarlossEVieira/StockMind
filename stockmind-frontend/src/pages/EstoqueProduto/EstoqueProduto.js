import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal";
import TituloPagina from "../../components/TituloPagina/TituloPagina";

export default function EstoqueProduto() {
    const { produtoId } = useParams();
    const [estoques, setEstoques] = useState([]);

    useEffect(() => {
    carregarEstoques();
    // eslint-disable-next-line
    }, [produtoId]);

    async function carregarEstoques() {
        try {
            const resposta = await api.get(`/estoques/produto/${produtoId}`);
            setEstoques(resposta.data);
        } catch (erro) {
            console.error("Erro ao carregar estoques:", erro);
        }
    }

    return (
        <>
            <MenuPrincipal />

            <div className="container">
                <TituloPagina
                    titulo={`Estoque do Produto ${produtoId}`}
                    subtitulo="Visualização por tamanho"
                />

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Id Estoque</th>
                            <th>Tamanho</th>
                            <th>Quantidade</th>
                            <th>Quantidade mínima alerta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estoques.map((estoque) => (
                            <tr key={estoque.id}>
                                <td>{estoque.id}</td>
                                <td>{estoque.tamanho}</td>
                                <td>{estoque.quantidade}</td>
                                <td>{estoque.quantidadeMinimaAlerta}</td>
                            </tr>
                        ))}

                        {estoques.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    Nenhum estoque encontrado para este produto.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}