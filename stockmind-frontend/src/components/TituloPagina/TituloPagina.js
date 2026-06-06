export default function TituloPagina({ titulo, subtitulo }) {
    return (
        <div className="mb-4">
            <h2 className="fw-bold">{titulo}</h2>
            {subtitulo && (
                <p className="text-muted mb-0">{subtitulo}</p>
            )}
            <hr />
        </div>
    );
}