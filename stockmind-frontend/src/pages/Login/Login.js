import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MensagemSistema from "../../components/MensagemSistema/MensagemSistema";

export default function Login() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("erro");

    const navigate = useNavigate();

    function entrar(evento) {
        evento.preventDefault();

        const usuarioCorreto = "admin";
        const senhaCorreta = "123456";

        if (usuario === usuarioCorreto && senha === senhaCorreta) {
            localStorage.setItem("stockmind_usuario_logado", "true");
            localStorage.setItem("stockmind_nome_usuario", "Administrador");

            navigate("/");
            return;
        }

        setTipoMensagem("erro");
        setMensagem("Usuário ou senha inválidos.");
    }

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #111827, #1f2937)"
            }}
        >
            <div className="card p-4 shadow-lg border-0" style={{ width: "100%", maxWidth: "430px" }}>
                <div className="text-center mb-4">
                    <div style={{ fontSize: "3rem" }}>📦</div>
                    <h2 className="fw-bold mb-1">StockMind</h2>
                    <p className="text-muted mb-0">
                        Sistema inteligente de gestão de estoque
                    </p>
                </div>

                <MensagemSistema
                    tipo={tipoMensagem}
                    texto={mensagem}
                    onFechar={() => setMensagem("")}
                />

                <form onSubmit={entrar}>
                    <div className="mb-3">
                        <label className="form-label">Usuário</label>
                        <input
                            className="form-control"
                            value={usuario}
                            onChange={(evento) => setUsuario(evento.target.value)}
                            placeholder="Digite o usuário"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            value={senha}
                            onChange={(evento) => setSenha(evento.target.value)}
                            placeholder="Digite a senha"
                        />
                    </div>

                    <button className="btn btn-dark w-100" type="submit">
                        Entrar
                    </button>
                </form>

                <div className="text-center mt-3">
                    <small className="text-muted">
                        Usuário: admin | Senha: 123456
                    </small>
                </div>
            </div>
        </div>
    );
}