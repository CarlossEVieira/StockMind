import { useNavigate } from "react-router-dom";

export default function BotaoVoltar() {
    const navigate = useNavigate();

    function voltarParaInicio() {
        navigate("/");
    }

    return (
        <button
            className="btn btn-secondary"
            onClick={voltarParaInicio}
        >
            ← Voltar
        </button>
    );
}