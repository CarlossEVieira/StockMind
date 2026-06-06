import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal";
import TituloPagina from "../../components/TituloPagina/TituloPagina";
import BotaoVoltar from "../../components/BotaoVoltar/BotaoVoltar";
import MensagemSistema from "../../components/MensagemSistema/MensagemSistema";

export default function EditarProduto() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [localizacao, setLocalizacao] = useState("");

    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("sucesso");

    useEffect(() => {
        carregarProduto();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function carregarProduto() {
        try {
            const resposta = await api.get(`/produtos/${id}`);

            setNome(resposta.data.nome);
            setDescricao(resposta.data.descricao || "");
            setCategoria(resposta.data.categoria || "");
            setLocalizacao(resposta.data.localizacao);
        } catch (erro) {
            console.error("Erro ao carregar produto:", erro);
            setTipoMensagem("erro");
            setMensagem("Erro ao carregar produto.");
        }
    }

    async function atualizarProduto(evento) {
        evento.preventDefault();

        const produto = {
            nome,
            descricao,
            categoria,
            localizacao
        };

        try {
            const resposta = await api.put(`/produtos/${id}`, produto);

            setTipoMensagem("sucesso");
            setMensagem(resposta.data || "Produto atualizado com sucesso.");

            // volta pra lista depois de salvar
            setTimeout(() => {
                navigate("/produtos");
            }, 1500);
        } catch (erro) {
            console.error("Erro ao atualizar produto:", erro);
            setTipoMensagem("erro");

            if (erro.response && erro.response.data) {
                setMensagem(erro.response.data);
            } else {
                setMensagem("Erro ao atualizar produto.");
            }
        }
    }

    return (
        <>
            <MenuPrincipal />

            <div className="container">
                <TituloPagina
                    titulo="Editar Produto"
                    subtitulo="Atualize os dados do produto"
                />

                <div className="mb-3">
                    <BotaoVoltar />
                </div>

                <MensagemSistema
                    tipo={tipoMensagem}
                    texto={mensagem}
                    onFechar={() => setMensagem("")}
                />

                <form onSubmit={atualizarProduto}>
                    <div className="mb-3">
                        <label className="form-label">Nome</label>
                        <input
                            className="form-control"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Descrição</label>
                        <input
                            className="form-control"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Categoria</label>
                        <input
                            className="form-control"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Localização</label>
                        <input
                            className="form-control"
                            value={localizacao}
                            onChange={(e) => setLocalizacao(e.target.value)}
                        />
                    </div>

                    <button className="btn btn-warning" type="submit">
                        Atualizar Produto
                    </button>
                </form>
            </div>
        </>
    );
}