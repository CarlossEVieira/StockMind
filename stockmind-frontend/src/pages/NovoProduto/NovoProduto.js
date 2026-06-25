import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal";
import TituloPagina from "../../components/TituloPagina/TituloPagina";
import BotaoVoltar from "../../components/BotaoVoltar/BotaoVoltar";

export default function NovoProduto() {


const navigate = useNavigate();

const [nome, setNome] = useState("");
const [descricao, setDescricao] = useState("");
const [categoria, setCategoria] = useState("");
const [localizacao, setLocalizacao] = useState("");

const [tamanhoPP, setTamanhoPP] = useState(0);
const [tamanhoP, setTamanhoP] = useState(0);
const [tamanhoM, setTamanhoM] = useState(0);
const [tamanhoG, setTamanhoG] = useState(0);
const [tamanhoGG, setTamanhoGG] = useState(0);

async function salvarProduto(evento) {

    evento.preventDefault();

    const produto = {
        nome,
        descricao,
        categoria,
        localizacao,
        tamanhos: [
            {
                tamanho: "PP",
                quantidade: Number(tamanhoPP),
                quantidadeMinimaAlerta: 10
            },
            {
                tamanho: "P",
                quantidade: Number(tamanhoP),
                quantidadeMinimaAlerta: 10
            },
            {
                tamanho: "M",
                quantidade: Number(tamanhoM),
                quantidadeMinimaAlerta: 10
            },
            {
                tamanho: "G",
                quantidade: Number(tamanhoG),
                quantidadeMinimaAlerta: 10
            },
            {
                tamanho: "GG",
                quantidade: Number(tamanhoGG),
                quantidadeMinimaAlerta: 10
            }
        ]
    };

    try {

        await api.post(
            "/produtos",
            produto
        );

        navigate("/produtos");

    }
    catch (erro) {

        console.error(
            "Erro ao salvar produto:",
            erro
        );

        alert(
            "Erro ao salvar produto."
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
                titulo="Novo Produto"
                subtitulo="Cadastre um novo produto com os tamanhos"
            />

            <div
                className="
                    d-flex
                    justify-content-between
                    align-items-center
                    mb-3
                "
            >
                <BotaoVoltar />
            </div>

            <div
                className="
                    card
                    shadow-sm
                "
            >

                <div className="card-body">

                    <form
                        onSubmit={salvarProduto}
                    >

                        <div className="mb-3">

                            <label className="form-label">
                                Nome
                            </label>

                            <input
                                className="form-control"
                                value={nome}
                                onChange={(evento) =>
                                    setNome(
                                        evento.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Descrição
                            </label>

                            <input
                                className="form-control"
                                value={descricao}
                                onChange={(evento) =>
                                    setDescricao(
                                        evento.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Categoria
                            </label>

                            <input
                                className="form-control"
                                value={categoria}
                                onChange={(evento) =>
                                    setCategoria(
                                        evento.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="mb-4">

                            <label className="form-label">
                                Localização
                            </label>

                            <input
                                className="form-control"
                                value={localizacao}
                                onChange={(evento) =>
                                    setLocalizacao(
                                        evento.target.value
                                    )
                                }
                            />

                        </div>

                        <hr />

                        <h5 className="mb-3">
                            Quantidade por Tamanho
                        </h5>

                        <div className="row">

                            <div className="col-md-2 mb-3">

                                <label className="form-label">
                                    PP
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={tamanhoPP}
                                    onChange={(evento) =>
                                        setTamanhoPP(
                                            evento.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="col-md-2 mb-3">

                                <label className="form-label">
                                    P
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={tamanhoP}
                                    onChange={(evento) =>
                                        setTamanhoP(
                                            evento.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="col-md-2 mb-3">

                                <label className="form-label">
                                    M
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={tamanhoM}
                                    onChange={(evento) =>
                                        setTamanhoM(
                                            evento.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="col-md-2 mb-3">

                                <label className="form-label">
                                    G
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={tamanhoG}
                                    onChange={(evento) =>
                                        setTamanhoG(
                                            evento.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="col-md-2 mb-3">

                                <label className="form-label">
                                    GG
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={tamanhoGG}
                                    onChange={(evento) =>
                                        setTamanhoGG(
                                            evento.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>

                        <button
                            className="btn btn-success"
                            type="submit"
                        >
                            Salvar Produto
                        </button>

                    </form>

                </div>

            </div>

        </div>
    </>
);


}
