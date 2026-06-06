import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal";
import TituloPagina from "../../components/TituloPagina/TituloPagina";
import BotaoVoltar from "../../components/BotaoVoltar/BotaoVoltar";
import MensagemSistema from "../../components/MensagemSistema/MensagemSistema";

export default function Alertas() {
    const [alertas, setAlertas] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("sucesso");

    const [textoBusca, setTextoBusca] = useState("");
    const [filtroStatus, setFiltroStatus] = useState("todos");

    useEffect(() => {
        carregarAlertas();
    }, []);

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

    const alertasFiltrados = useMemo(() => {
        return alertas.filter((alerta) => {
            const mensagemAlerta = alerta.mensagem?.toLowerCase() || "";
            const textoBuscaFormatado = textoBusca.toLowerCase();

            const atendeBusca = mensagemAlerta.includes(textoBuscaFormatado);

            const atendeStatus =
                filtroStatus === "todos" ||
                (filtroStatus === "pendentes" && !alerta.resolvido) ||
                (filtroStatus === "resolvidos" && alerta.resolvido);

            return atendeBusca && atendeStatus;
        });
    }, [alertas, textoBusca, filtroStatus]);

    function obterClasseStatus(resolvido) {
        return resolvido ? "badge bg-success" : "badge bg-danger";
    }

    function obterTextoStatus(resolvido) {
        return resolvido ? "Resolvido" : "Pendente";
    }

    return (
        <>
            <MenuPrincipal />

            <div className="container">
                <TituloPagina
                    titulo="Alertas"
                    subtitulo="Alertas de estoque baixo"
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
                    <div className="col-md-6">
                        <label className="form-label">Buscar por mensagem</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Digite parte da mensagem"
                            value={textoBusca}
                            onChange={(evento) => setTextoBusca(evento.target.value)}
                        />
                    </div>

                    <div className="col-md-6">
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
                </div>

                <table className="table table-bordered table-striped align-middle">
                    <thead>
                        <tr>
                            <th>Id</th>
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
                                <td colSpan="6" className="text-center">
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