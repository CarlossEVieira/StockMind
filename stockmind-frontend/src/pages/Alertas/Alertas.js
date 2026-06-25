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
    const [filtroTipoAlerta, setFiltroTipoAlerta] = useState("todos");

    useEffect(() => {
        carregarAlertas();
    }, []);

    async function carregarAlertas() {

        try {

            const resposta =
                await api.get("/alertas");

            setAlertas(resposta.data);

        }
        catch (erro) {

            console.error(
                "Erro ao carregar alertas:",
                erro
            );

            setTipoMensagem("erro");

            setMensagem(
                "Erro ao carregar alertas."
            );
        }
    }

    async function resolverAlerta(idAlerta) {

        try {

            const resposta =
                await api.put(
                    `/alertas/${idAlerta}/resolver`
                );

            setTipoMensagem("sucesso");

            setMensagem(
                resposta.data ||
                "Alerta resolvido com sucesso."
            );

            await carregarAlertas();

        }
        catch (erro) {

            console.error(
                "Erro ao resolver alerta:",
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
                    "Erro ao resolver alerta."
                );
            }
        }
    }

    const alertasFiltrados = useMemo(() => {

        return alertas.filter((alerta) => {

            const mensagemAlerta =
                alerta.mensagem?.toLowerCase() || "";

            const atendeBusca =
                mensagemAlerta.includes(
                    textoBusca.toLowerCase()
                );

            const atendeStatus =
                filtroStatus === "todos" ||
                (filtroStatus === "pendentes" && !alerta.resolvido) ||
                (filtroStatus === "resolvidos" && alerta.resolvido);

            const atendeTipo =
                filtroTipoAlerta === "todos" ||
                alerta.tipoAlerta === filtroTipoAlerta;

            return (
                atendeBusca &&
                atendeStatus &&
                atendeTipo
            );

        });

    }, [
        alertas,
        textoBusca,
        filtroStatus,
        filtroTipoAlerta
    ]);

    function obterClasseStatus(resolvido) {

        return resolvido
            ? "badge bg-success"
            : "badge bg-danger";
    }

    function obterTextoStatus(resolvido) {

        return resolvido
            ? "Resolvido"
            : "Pendente";
    }

    function obterClasseTipo(tipoAlerta) {

        if (tipoAlerta === "EstoqueBaixo") {
            return "badge bg-danger";
        }

        if (tipoAlerta === "DemandaAlta") {
            return "badge bg-warning text-dark";
        }

        return "badge bg-secondary";
    }

    function obterTextoTipo(tipoAlerta) {

        if (tipoAlerta === "EstoqueBaixo") {
            return "Estoque baixo";
        }

        if (tipoAlerta === "DemandaAlta") {
            return "Demanda alta";
        }

        return tipoAlerta;
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
                    titulo="Alertas"
                    subtitulo="Alertas de estoque baixo e demanda alta"
                />

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <BotaoVoltar />

                </div>

                <MensagemSistema
                    tipo={tipoMensagem}
                    texto={mensagem}
                    onFechar={() =>
                        setMensagem("")
                    }
                />

                <div className="card shadow-sm">

                    <div className="card-body">

                        <div className="row mb-4">

                            <div className="col-md-4">

                                <label className="form-label">
                                    Buscar
                                </label>

                                <input
                                    className="form-control"
                                    value={textoBusca}
                                    onChange={(evento) =>
                                        setTextoBusca(
                                            evento.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="col-md-4">

                                <label className="form-label">
                                    Status
                                </label>

                                <select
                                    className="form-control"
                                    value={filtroStatus}
                                    onChange={(evento) =>
                                        setFiltroStatus(
                                            evento.target.value
                                        )
                                    }
                                >
                                    <option value="todos">Todos</option>
                                    <option value="pendentes">Pendentes</option>
                                    <option value="resolvidos">Resolvidos</option>
                                </select>

                            </div>

                            <div className="col-md-4">

                                <label className="form-label">
                                    Tipo
                                </label>

                                <select
                                    className="form-control"
                                    value={filtroTipoAlerta}
                                    onChange={(evento) =>
                                        setFiltroTipoAlerta(
                                            evento.target.value
                                        )
                                    }
                                >
                                    <option value="todos">Todos</option>
                                    <option value="EstoqueBaixo">
                                        Estoque baixo
                                    </option>
                                    <option value="DemandaAlta">
                                        Demanda alta
                                    </option>
                                </select>

                            </div>

                        </div>

                        <table className="table table-hover align-middle">

                            <thead>

                                <tr>

                                    <th>ID</th>
                                    <th>Tipo</th>
                                    <th>Mensagem</th>
                                    <th>Qtd.</th>
                                    <th>IA</th>
                                    <th>Status</th>
                                    <th>Ação</th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    alertasFiltrados.map(alerta => (

                                        <tr key={alerta.id}>

                                            <td>{alerta.id}</td>

                                            <td>

                                                <span className={obterClasseTipo(alerta.tipoAlerta)}>
                                                    {obterTextoTipo(alerta.tipoAlerta)}
                                                </span>

                                            </td>

                                            <td>{alerta.mensagem}</td>

                                            <td>{alerta.quantidadeAtual}</td>

                                            <td>

                                                {
                                                    alerta.sugestaoReposicaoIa ||
                                                    "Sem sugestão"
                                                }

                                            </td>

                                            <td>

                                                <span className={obterClasseStatus(alerta.resolvido)}>
                                                    {obterTextoStatus(alerta.resolvido)}
                                                </span>

                                            </td>

                                            <td>

                                                {
                                                    !alerta.resolvido
                                                        ?

                                                        <button
                                                            className="btn btn-success btn-sm"
                                                            onClick={() =>
                                                                resolverAlerta(alerta.id)
                                                            }
                                                        >
                                                            Resolver
                                                        </button>

                                                        :

                                                        <span className="text-muted">
                                                            —
                                                        </span>
                                                }

                                            </td>

                                        </tr>

                                    ))
                                }

                                {
                                    alertasFiltrados.length === 0 &&

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center"
                                        >
                                            Nenhum alerta encontrado.
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