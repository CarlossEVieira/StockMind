import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

import api from "../../services/api";
import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal";
import TituloPagina from "../../components/TituloPagina/TituloPagina";
import MensagemSistema from "../../components/MensagemSistema/MensagemSistema";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [alertas, setAlertas] = useState([]);
    const [movimentacoes, setMovimentacoes] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("sucesso");

    useEffect(() => {
        carregarDashboard();
    }, []);

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

    const alertasPendentes = useMemo(() => {
        return alertas.filter((alerta) => !alerta.resolvido);
    }, [alertas]);

    const totalAlertasEstoqueBaixo = useMemo(() => {
        return alertasPendentes.filter((alerta) => alerta.tipoAlerta === "EstoqueBaixo").length;
    }, [alertasPendentes]);

    const totalAlertasDemandaAlta = useMemo(() => {
        return alertasPendentes.filter((alerta) => alerta.tipoAlerta === "DemandaAlta").length;
    }, [alertasPendentes]);

    const alertasRecentes = useMemo(() => {
        return alertasPendentes.slice(0, 3);
    }, [alertasPendentes]);

    const sugestoesIa = useMemo(() => {
        return alertasPendentes
            .filter((alerta) => alerta.sugestaoReposicaoIa)
            .slice(0, 3);
    }, [alertasPendentes]);

    const movimentacoesRecentes = useMemo(() => {
        return movimentacoes.slice(0, 5);
    }, [movimentacoes]);

    const totalEntradas = useMemo(() => {
        return movimentacoes
            .filter((movimentacao) => movimentacao.tipoMovimentacao === "Entrada")
            .reduce((total, movimentacao) => total + movimentacao.quantidade, 0);
    }, [movimentacoes]);

    const totalSaidas = useMemo(() => {
        return movimentacoes
            .filter((movimentacao) => movimentacao.tipoMovimentacao === "Saida")
            .reduce((total, movimentacao) => total + movimentacao.quantidade, 0);
    }, [movimentacoes]);

    const dadosGraficoEntradasSaidas = {
        labels: ["Entradas", "Saídas"],
        datasets: [
            {
                label: "Quantidade",
                data: [totalEntradas, totalSaidas],
                borderWidth: 1
            }
        ]
    };

    const opcoesGraficoEntradasSaidas = {
        responsive: true,
        plugins: {
            legend: {
                position: "top"
            },
            title: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    function obterClasseTipoMovimentacao(tipoMovimentacao) {
        return tipoMovimentacao === "Entrada"
            ? "badge bg-success"
            : "badge bg-danger";
    }

    function obterClasseTipoAlerta(tipoAlerta) {
        if (tipoAlerta === "DemandaAlta") {
            return "badge bg-warning text-dark";
        }

        if (tipoAlerta === "EstoqueBaixo") {
            return "badge bg-danger";
        }

        return "badge bg-secondary";
    }

    function obterTextoTipoAlerta(tipoAlerta) {
        if (tipoAlerta === "DemandaAlta") {
            return "Demanda alta";
        }

        if (tipoAlerta === "EstoqueBaixo") {
            return "Estoque baixo";
        }

        return tipoAlerta || "Não informado";
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
                            ⚠️ Você possui {dashboard.alertasPendentes} alertas pendentes no estoque.
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
                            <small className="text-muted">
                                🔴 {totalAlertasEstoqueBaixo} estoque baixo | 🟡 {totalAlertasDemandaAlta} demanda alta
                            </small>
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
                            <p className="text-muted">Estoque baixo, demanda alta e IA</p>
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
                                    <div
                                        key={alerta.id}
                                        className="border-start border-4 ps-3 py-2 mb-2 bg-light"
                                    >
                                        <div className="mb-1">
                                            <span className={obterClasseTipoAlerta(alerta.tipoAlerta)}>
                                                {obterTextoTipoAlerta(alerta.tipoAlerta)}
                                            </span>
                                        </div>

                                        <div className="fw-bold">
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
                                        <div className="mb-1">
                                            <span className={obterClasseTipoAlerta(alerta.tipoAlerta)}>
                                                {obterTextoTipoAlerta(alerta.tipoAlerta)}
                                            </span>
                                        </div>

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

                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card p-3">
                            <h5>📈 Entradas x Saídas</h5>
                            <p className="text-muted">
                                Comparativo geral das movimentações registradas no estoque.
                            </p>

                            <div style={{ height: "320px" }}>
                                <Bar
                                    data={dadosGraficoEntradasSaidas}
                                    options={{
                                        ...opcoesGraficoEntradasSaidas,
                                        maintainAspectRatio: false
                                    }}
                                />
                            </div>
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