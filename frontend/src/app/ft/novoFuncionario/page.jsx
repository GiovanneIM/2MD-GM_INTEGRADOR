export default function novoFunc() {
    return (
        <>
            <div className="container mt-5 d-flex justify-content-center align-item-center">
                <div className="col-lg-6 shadow-sm rounded justify-content-center bg-white p-3 ">
                    <h3 className="card-title text-center mb-4">Solicitar registro</h3>
                    <form id="registrationForm">
                        {/* Nome */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label border-bottom border-primary-subtle">
                                Nome completo
                            </label>
                            <input type="text" className="form-control" id="name" placeholder="Digite o nome completo" required />
                        </div>

                        {/* E-mail */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label border-bottom border-primary-subtle">
                                E-mail
                            </label>
                            <input type="email" className="form-control" id="email" placeholder="Digite o e-mail corporativo" required />
                        </div>

                        {/* Telefone */}
                        <div className="mb-3">
                            <label htmlFor="telefone" className="form-label border-bottom border-primary-subtle">
                                Telefone
                            </label>
                            <input type="email" className="form-control" id="telefone" placeholder="Digite o telefone" required />
                        </div>

                        {/* Botão */}
                        <div className="text-center">
                            <button type="submit" className="btn btn-azulGM">
                                Solicitar registro
                            </button>
                            <div id="formFeedback" className="mt-3" />
                        </div>
                    </form>
                </div>
            </div>

        </>
    )


}