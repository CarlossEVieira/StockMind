import { useEffect, useState } from "react";

import api from "../../services/api";

import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal";
import TituloPagina from "../../components/TituloPagina/TituloPagina";
import BotaoVoltar from "../../components/BotaoVoltar/BotaoVoltar";
import MensagemSistema from "../../components/MensagemSistema/MensagemSistema";

export default function Vendas() {
    const [produtos, setProdutos] = useState([]);
    const [estoquesProduto, setEstoquesProduto] = useState([]);

    const [produtoId, setProdutoId] = useState("");
    const [tamanho, setTamanho] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [observacao, setObservacao] = useState("");

    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("sucesso");

    useEffect(() => {
        carregarProdutos();
    }, []);

    useEffect(() => {
        if (produtoId) {
            carregarEstoquesProduto(produtoId);
        } else {
            setEstoquesProduto([]);
            setTamanho("");
        }
    }, [produtoId]);

    async function carregarProdutos() {
        try {
            const resposta = await api.get("/produtos");
            setProdutos(resposta.data);
        } catch (erro) {
            console.error("Erro ao carregar produtos:", erro);
            setTipoMensagem("erro");
            setMensagem("Erro ao carregar produtos.");
        }
    }

    async function carregarEstoquesProduto(idProduto) {
        try {
            const resposta = await api.get(`/estoques/produto/${idProduto}`);
            setEstoquesProduto(resposta.data);
            setTamanho("");
        } catch (erro) {
            console.error("Erro ao carregar tamanhos do produto:", erro);
            setTipoMensagem("erro");
            setMensagem("Erro ao carregar tamanhos do produto.");
        }
    }

    async function registrarVenda(evento) {
        evento.preventDefault();

        const venda = {
            observacao,
            itensVenda: [
                {
                    produtoId: Number(produtoId),
                    tamanho,
                    quantidade: Number(quantidade)
                }
            ]
        };

        try {
            const resposta = await api.post("/vendas", venda);

            setTipoMensagem("sucesso");
            setMensagem(resposta.data || "Venda registrada com sucesso.");

            setProdutoId("");
            setTamanho("");
            setQuantidade("");
            setObservacao("");
            setEstoquesProduto([]);
        } catch (erro) {
            console.error("Erro ao registrar venda:", erro);
            setTipoMensagem("erro");

            if (erro.response && erro.response.data) {
                setMensagem(erro.response.data);
            } else {
                setMensagem("Erro ao registrar venda.");
            }
        }
    }

    const estoqueSelecionado = estoquesProduto.find(
        (estoque) => estoque.tamanho === tamanho
    );

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
                    titulo="Registrar Venda"
                    subtitulo="Baixa automática do estoque"
                />

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <BotaoVoltar />
                </div>

                <MensagemSistema
                    tipo={tipoMensagem}
                    texto={mensagem}
                    onFechar={() => setMensagem("")}
                />

                <div className="card shadow-sm">
                    <div className="card-body">
                        <form onSubmit={registrarVenda}>
                            <div className="mb-3">
                                <label className="form-label">Produto</label>
                                <select
                                    className="form-control"
                                    value={produtoId}
                                    onChange={(evento) =>
                                        setProdutoId(evento.target.value)
                                    }
                                >
                                    <option value="">Selecione um produto</option>

                                    {produtos.map((produto) => (
                                        <option key={produto.id} value={produto.id}>
                                            {produto.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Tamanho</label>
                                <select
                                    className="form-control"
                                    value={tamanho}
                                    onChange={(evento) =>
                                        setTamanho(evento.target.value)
                                    }
                                    disabled={!produtoId}
                                >
                                    <option value="">Selecione um tamanho</option>

                                    {estoquesProduto.map((estoque) => (
                                        <option key={estoque.id} value={estoque.tamanho}>
                                            {estoque.tamanho}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {estoqueSelecionado && (
                                <div className="alert alert-info">
                                    Estoque disponível:{" "}
                                    <strong>{estoqueSelecionado.quantidade}</strong>
                                </div>
                            )}

                            <div className="mb-3">
                                <label className="form-label">Quantidade</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={quantidade}
                                    onChange={(evento) =>
                                        setQuantidade(evento.target.value)
                                    }
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Observação</label>

                                <input
                                    className="form-control"
                                    value={observacao}
                                    onChange={(evento) =>
                                        setObservacao(evento.target.value)
                                    }
                                />
                            </div>

                            <button className="btn btn-dark" type="submit">
                                Registrar Venda
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}