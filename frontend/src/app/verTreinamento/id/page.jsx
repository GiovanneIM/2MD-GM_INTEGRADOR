export default function Treinamento() {
  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n    .contact-wrapper {\n      background: white;\n      border-radius: 20px;\n      overflow: hidden;\n      box-shadow: 0 5px 30px rgba(0,0,0,0.1);\n    }\n\n    .contact-info {\n      background: linear-gradient(135deg, #0062cc, #0096ff);\n      padding: 40px;\n      color: white;\n    }\n\n    .contact-item {\n      display: flex;\n      align-items: center;\n      margin-bottom: 25px;\n      transition: all 0.3s ease;\n    }\n\n    .contact-item:hover {\n      transform: translateX(10px);\n    }\n\n    .contact-icon {\n      width: 40px;\n      height: 40px;\n      background: rgba(255,255,255,0.2);\n      border-radius: 50%;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      margin-right: 15px;\n    }\n\n    .social-links {\n      margin-top: 30px;\n    }\n\n    .social-icon {\n      width: 35px;\n      height: 35px;\n      background: rgba(255,255,255,0.2);\n      border-radius: 50%;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      margin-right: 10px;\n      transition: all 0.3s ease;\n    }\n\n    .social-icon:hover {\n      background: white;\n      color: #0062cc;\n      transform: translateY(-3px);\n    }\n\n    .contact-form {\n      padding: 40px;\n    }\n\n    .form-control {\n      border-radius: 10px;\n      padding: 12px 15px;\n      border: 2px solid #eee;\n      transition: all 0.3s ease;\n    }\n\n    .form-control:focus {\n      border-color: #0062cc;\n      box-shadow: none;\n    }\n\n    .form-label {\n      font-weight: 500;\n      margin-bottom: 8px;\n    }\n\n    .btn-submit {\n      background: linear-gradient(135deg, #0062cc, #0096ff);\n      border: none;\n      padding: 12px 30px;\n      border-radius: 10px;\n      transition: all 0.3s ease;\n    }\n\n    .btn-submit:hover {\n      transform: translateY(-2px);\n      box-shadow: 0 5px 15px rgba(0,98,204,0.3);\n    }\n\n    .map-container {\n      height: 200px;\n      border-radius: 10px;\n      overflow: hidden;\n      margin-top: 20px;\n    }\n  "
        }}
      />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="contact-wrapper">
              <div className="row g-0">
                <div className="col-md-5">
                  <div className="contact-info h-100">
                    <h3 className="mb-4">#Nome Treinamento#</h3>
                    <p className="mb-4">
                      #Uma breve descrição do treinamento (pode ser removido esta parte)#
                    </p>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="fas fa-map-marker-alt" />
                      </div>
                      <div>
                        <h6 className="mb-0">Aplicador</h6>
                        <p className="mb-0">
                          #Nome de quem solicitou o treinamento#
                        </p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="fas fa-map-marker-alt" />
                      </div>
                      <div>
                        <h6 className="mb-0">Local</h6>
                        <p className="mb-0">
                          #Colocar o local onde será realizado (pode ter a opção de remoto)#
                        </p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="fas fa-phone" />
                      </div>
                      <div>
                        <h6 className="mb-0">Participantes</h6>
                        <ul>
                          <li>
                            <p className="mb-0">#Colocar o nome de quem irá participar (utlizar o map)#</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="contact-form">
                    <h3 className="mb-4">Realizar alterações no treinamento</h3>
                    <form>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Participantes</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="John"
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Descrição</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Local</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="How can we help?"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}