export default function MensagemSistema({ tipo, texto, onFechar }) {
    if (!texto) {
        return null;
    }

    const classeMensagem =
        tipo === "erro"
            ? "alert alert-danger alert-dismissible fade show"
            : "alert alert-success alert-dismissible fade show";

    return (
        <div className={classeMensagem} role="alert">
            {texto}
            <button
                type="button"
                className="btn-close"
                onClick={onFechar}
            ></button>
        </div>
    );
}