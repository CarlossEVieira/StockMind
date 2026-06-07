import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal";
import TituloPagina from "../../components/TituloPagina/TituloPagina";
import BotaoVoltar from "../../components/BotaoVoltar/BotaoVoltar";
import MensagemSistema from "../../components/MensagemSistema/MensagemSistema";

export default function Alertas() {
    // Lista de alertas vindos da API
    const [alertas, setAlertas] = useState([]);

    // Mensagem visual do sistema
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("sucesso");

    // Filtros da tela
    const [textoBusca, setTextoBusca] = useState("");
    const [filtroStatus, setFiltroStatus] = useState("todos");
    const [filtroTipoAlerta, setFiltroTipoAlerta] = useState("todos");

    // Carrega os alertas ao abrir a tela
    useEffect(() => {
        carregarAlertas();
    }, []);

    // Busca alertas no backend
    async function carregarAlertas() {
        try {
            const resposta = await api.get("/alertas");
            setAlertas(resposta.data);
        } catch (erro) {
            console.error("Erro ao carregar alertas:", erro);
            setTipoMensagem("erro");
            setMensagem("Erro ao carregar alertas.");
        }
    }

    // Resolve um alerta
    async function resolverAlerta(idAlerta) {
        try {
            const resposta = await api.put(`/alertas/${idAlerta}/resolver`);

            setTipoMensagem("sucesso");
            setMensagem(resposta.data || "Alerta resolvido com sucesso.");

            await carregarAlertas();
        } catch (erro) {
            console.error("Erro ao resolver alerta:", erro);
            setTipoMensagem("erro");

            if (erro.response && erro.response.data) {
                setMensagem(erro.response.data);
            } else {
                setMensagem("Erro ao resolver alerta.");
            }
        }
    }

    // Filtra os alertas por mensagem, status e tipo
    const alertasFiltrados = useMemo(() => {
        return alertas.filter((alerta) => {
            const mensagemAlerta = alerta.mensagem?.toLowerCase() || "";
            const textoBuscaFormatado = textoBusca.toLowerCase();

            const atendeBusca = mensagemAlerta.includes(textoBuscaFormatado);

            const atendeStatus =
                filtroStatus === "todos" ||
                (filtroStatus === "pendentes" && !alerta.resolvido) ||
                (filtroStatus === "resolvidos" && alerta.resolvido);

            const atendeTipoAlerta =
                filtroTipoAlerta === "todos" ||
                alerta.tipoAlerta === filtroTipoAlerta;

            return atendeBusca && atendeStatus && atendeTipoAlerta;
        });
    }, [alertas, textoBusca, filtroStatus, filtroTipoAlerta]);

    // Retorna a cor do status
    function obterClasseStatus(resolvido) {
        return resolvido ? "badge bg-success" : "badge bg-danger";
    }

    // Retorna o texto do status
    function obterTextoStatus(resolvido) {
        return resolvido ? "Resolvido" : "Pendente";
    }

    // Retorna a cor do tipo do alerta
    function obterClasseTipoAlerta(tipoAlerta) {
        if (tipoAlerta === "DemandaAlta") {
            return "badge bg-warning text-dark";
        }

        if (tipoAlerta === "EstoqueBaixo") {
            return "badge bg-danger";
        }

        return "badge bg-secondary";
    }

    // Retorna o texto mais bonito para o tipo do alerta
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
                    titulo="Alertas"
                    subtitulo="Alertas de estoque baixo e demanda alta"
                />

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <BotaoVoltar />
                </div>

                <MensagemSistema
                    tipo={tipoMensagem}
                    texto={mensagem}
                    onFechar={() => setMensagem("")}
                />

                <div className="row mb-3">
                    <div className="col-md-4">
                        <label className="form-label">Buscar por mensagem</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Digite parte da mensagem"
                            value={textoBusca}
                            onChange={(evento) => setTextoBusca(evento.target.value)}
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Filtrar por status</label>
                        <select
                            className="form-control"
                            value={filtroStatus}
                            onChange={(evento) => setFiltroStatus(evento.target.value)}
                        >
                            <option value="todos">Todos</option>
                            <option value="pendentes">Pendentes</option>
                            <option value="resolvidos">Resolvidos</option>
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Filtrar por tipo</label>
                        <select
                            className="form-control"
                            value={filtroTipoAlerta}
                            onChange={(evento) => setFiltroTipoAlerta(evento.target.value)}
                        >
                            <option value="todos">Todos</option>
                            <option value="EstoqueBaixo">Estoque baixo</option>
                            <option value="DemandaAlta">Demanda alta</option>
                        </select>
                    </div>
                </div>

                <table className="table table-bordered table-striped align-middle">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tipo</th>
                            <th>Mensagem</th>
                            <th>Quantidade Atual</th>
                            <th>Sugestão da IA</th>
                            <th>Status</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alertasFiltrados.map((alerta) => (
                            <tr key={alerta.id}>
                                <td>{alerta.id}</td>

                                <td>
                                    <span className={obterClasseTipoAlerta(alerta.tipoAlerta)}>
                                        {obterTextoTipoAlerta(alerta.tipoAlerta)}
                                    </span>
                                </td>

                                <td>{alerta.mensagem}</td>

                                <td>{alerta.quantidadeAtual}</td>

                                <td>
                                    {alerta.sugestaoReposicaoIa
                                        ? alerta.sugestaoReposicaoIa
                                        : "Sem sugestão gerada"}
                                </td>

                                <td>
                                    <span className={obterClasseStatus(alerta.resolvido)}>
                                        {obterTextoStatus(alerta.resolvido)}
                                    </span>
                                </td>

                                <td>
                                    {!alerta.resolvido ? (
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => resolverAlerta(alerta.id)}
                                        >
                                            Resolver
                                        </button>
                                    ) : (
                                        <span className="text-muted">Sem ação</span>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {alertasFiltrados.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    Nenhum alerta encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}