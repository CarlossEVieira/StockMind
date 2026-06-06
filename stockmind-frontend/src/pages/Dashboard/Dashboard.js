import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal";
import TituloPagina from "../../components/TituloPagina/TituloPagina";
import MensagemSistema from "../../components/MensagemSistema/MensagemSistema";

export default function Dashboard() {
    // Dados principais dos cards
    const [dashboard, setDashboard] = useState(null);

    // Alertas usados nos blocos de alertas e IA
    const [alertas, setAlertas] = useState([]);

    // Movimentações recentes do estoque
    const [movimentacoes, setMovimentacoes] = useState([]);

    // Mensagens visuais do sistema
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("sucesso");

    // Carrega os dados quando a tela abre
    useEffect(() => {
        carregarDashboard();
    }, []);

    // Busca dados do backend
    async function carregarDashboard() {
        try {
            const respostaDashboard = await api.get("/dashboard");
            setDashboard(respostaDashboard.data);

            const respostaAlertas = await api.get("/alertas");
            setAlertas(respostaAlertas.data);

            const respostaMovimentacoes = await api.get("/movimentacoes");
            setMovimentacoes(respostaMovimentacoes.data);
        } catch (erro) {
            console.error("Erro ao carregar dashboard:", erro);
            setTipoMensagem("erro");
            setMensagem("Erro ao carregar os dados do dashboard.");
        }
    }

    // Apenas alertas pendentes
    const alertasPendentes = useMemo(() => {
        return alertas.filter((alerta) => !alerta.resolvido);
    }, [alertas]);

    // Últimos 3 alertas pendentes
    const alertasRecentes = useMemo(() => {
        return alertasPendentes.slice(0, 3);
    }, [alertasPendentes]);

    // Últimas 3 sugestões de IA
    const sugestoesIa = useMemo(() => {
        return alertasPendentes
            .filter((alerta) => alerta.sugestaoReposicaoIa)
            .slice(0, 3);
    }, [alertasPendentes]);

    // Últimas 5 movimentações
    const movimentacoesRecentes = useMemo(() => {
        return movimentacoes.slice(0, 5);
    }, [movimentacoes]);

    // Define cor do tipo de movimentação
    function obterClasseTipoMovimentacao(tipoMovimentacao) {
        return tipoMovimentacao === "Entrada"
            ? "badge bg-success"
            : "badge bg-danger";
    }

    return (
        <>
            <MenuPrincipal />

            <div className="container">
                <TituloPagina
                    titulo="StockMind"
                    subtitulo="Painel de controle do estoque"
                />

                <MensagemSistema
                    tipo={tipoMensagem}
                    texto={mensagem}
                    onFechar={() => setMensagem("")}
                />

                {dashboard?.alertasPendentes > 0 && (
                    <div className="alert alert-danger d-flex justify-content-between align-items-center">
                        <span>
                            ⚠️ Você possui {dashboard.alertasPendentes} alertas de estoque baixo.
                        </span>
                        <Link to="/alertas" className="btn btn-light btn-sm">
                            Ver alertas
                        </Link>
                    </div>
                )}

                <div className="row g-4">
                    <div className="col-md-3">
                        <div className="card p-3 shadow-sm h-100">
                            <h6>Total de Produtos</h6>
                            <h2 className="text-primary">
                                {dashboard?.totalProdutos ?? 0}
                            </h2>
                            <small className="text-muted">Produtos ativos cadastrados</small>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card p-3 shadow-sm h-100">
                            <h6>Total em Estoque</h6>
                            <h2 className="text-success">
                                {dashboard?.totalEstoque ?? 0}
                            </h2>
                            <small className="text-muted">Soma de todas as peças</small>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card p-3 shadow-sm h-100">
                            <h6>Alertas Pendentes</h6>
                            <h2 className={(dashboard?.alertasPendentes ?? 0) > 0 ? "text-danger" : "text-success"}>
                                {dashboard?.alertasPendentes ?? 0}
                            </h2>
                            <small className="text-muted">Itens abaixo do mínimo</small>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card p-3 shadow-sm h-100">
                            <h6>Menor Estoque</h6>
                            <h2 className="text-warning">
                                {dashboard?.menorEstoque?.quantidade ?? 0}
                            </h2>

                            {dashboard?.menorEstoque ? (
                                <small className="text-muted">
                                    {dashboard.menorEstoque.nomeProduto} ({dashboard.menorEstoque.tamanho})
                                </small>
                            ) : (
                                <small className="text-muted">Nenhum item encontrado</small>
                            )}
                        </div>
                    </div>
                </div>

                <div className="row g-4 mt-3">
                    <div className="col-md-3">
                        <div className="card p-3 h-100">
                            <h5>📦 Produtos</h5>
                            <p className="text-muted">Gerencie seus produtos</p>
                            <Link to="/produtos" className="btn btn-primary">
                                Acessar
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card p-3 h-100">
                            <h5>➕ Novo Produto</h5>
                            <p className="text-muted">Cadastre novos itens</p>
                            <Link to="/produtos/novo" className="btn btn-success">
                                Cadastrar
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card p-3 h-100">
                            <h5>📥 Entrada</h5>
                            <p className="text-muted">Reposição de estoque</p>
                            <Link to="/estoque/entrada" className="btn btn-warning">
                                Registrar
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card p-3 h-100">
                            <h5>⚠️ Alertas</h5>
                            <p className="text-muted">Estoque baixo e IA</p>
                            <Link to="/alertas" className="btn btn-danger">
                                Ver
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row mt-4 g-4">
                    <div className="col-md-6">
                        <div className="card p-3 h-100">
                            <h5>🚨 Alertas Recentes</h5>

                            {alertasRecentes.length > 0 ? (
                                alertasRecentes.map((alerta) => (
                                    <div key={alerta.id} className="border-start border-danger border-4 ps-3 py-2 mb-2 bg-light">
                                        <div className="fw-bold text-danger">
                                            {alerta.mensagem}
                                        </div>
                                        <small className="text-muted">
                                            Quantidade atual: {alerta.quantidadeAtual}
                                        </small>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted mb-0">Nenhum alerta pendente.</p>
                            )}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card p-3 h-100">
                            <h5>🤖 Sugestões da IA</h5>

                            {sugestoesIa.length > 0 ? (
                                sugestoesIa.map((alerta) => (
                                    <div key={alerta.id} className="border rounded p-2 mb-2 bg-light">
                                        <div className="fw-bold mb-1">
                                            {alerta.mensagem}
                                        </div>
                                        <small>{alerta.sugestaoReposicaoIa}</small>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted mb-0">Sem sugestões no momento.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="row mt-4 mb-4">
                    <div className="col-12">
                        <div className="card p-3">
                            <h5>📊 Movimentações Recentes</h5>

                            {movimentacoesRecentes.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-sm table-bordered align-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th>Tipo</th>
                                                <th>Origem</th>
                                                <th>Produto</th>
                                                <th>Tamanho</th>
                                                <th>Quantidade</th>
                                                <th>Observação</th>
                                                <th>Data</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {movimentacoesRecentes.map((movimentacao) => (
                                                <tr key={movimentacao.id}>
                                                    <td>
                                                        <span className={obterClasseTipoMovimentacao(movimentacao.tipoMovimentacao)}>
                                                            {movimentacao.tipoMovimentacao}
                                                        </span>
                                                    </td>
                                                    <td>{movimentacao.origemMovimentacao}</td>
                                                    <td>{movimentacao.produto?.nome || "-"}</td>
                                                    <td>{movimentacao.produtoEstoque?.tamanho || "-"}</td>
                                                    <td>{movimentacao.quantidade}</td>
                                                    <td>{movimentacao.observacao || "-"}</td>
                                                    <td>
                                                        {movimentacao.dataMovimentacao
                                                            ? new Date(movimentacao.dataMovimentacao).toLocaleString("pt-BR")
                                                            : "-"}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-muted mb-0">Nenhuma movimentação recente encontrada.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}