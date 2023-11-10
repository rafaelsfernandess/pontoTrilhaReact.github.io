import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { ModalConfirmacaoEmail } from '../../components/Modal/Modal';

import './styles.css'

function CadastroUsuario() {

    const [showConfirmacaoEmail, setShowConfirmacaoEmail] = useState(false);



    function handleShowModal() {
        setShowConfirmacaoEmail(true);
    }

    function handleCloseModal() {
        setShowConfirmacaoEmail(false);
    }

    return (
        <div>
            <div className="container-fluid">

                <header className="row">
                    <div className="header-logo">
                        <div className="col-12 col-sm-12 d-flex justify-content-center align-items-center flex-column">

                            <div className="logo">
                                <img src="../../assets/T (1).png" alt="Logo ponto trilha" className="img-fluid orange-filter " />
                            </div>

                            <div className="">
                                <h1 className="text-center">
                                    Cadastre-<span className="ponto-trilha">se</span>
                                </h1>
                            </div>

                        </div>
                    </div>
                </header>

                <div className="row d-flex justify-content-center align-items-center flex-column mt-2">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
                        <form className="form-cadastro">

                            <div className="col-12">

                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nome Completo:</label>
                                    <input type="email" className="form-control" id="name" aria-describedby="name" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="bornDate" className="form-label">Data de nascimento:</label>
                                    <input type="date" className="form-control" id="bornDate" aria-describedby="bornDate" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input type="password" className="form-control" id="email" aria-describedby="email" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Senha:</label>
                                    <input type="password" className="form-control" id="password" aria-describedby="password" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="passwordConfirm" className="form-label">Confirmar senha:</label>
                                    <input type="password" className="form-control" id="passwordConfirm"
                                        aria-describedby="passwordConfirm" />
                                </div>

                                <div className="d-grid mt-5 gap-3">
                                    <Link className="btn btn-primary" onClick={() => handleShowModal(true)}>Política de privacidade</Link>
                                    <Link to="/login" className="btn btn-light">Voltar</Link>
                                </div>


                            </div>

                        </form>
                    </div>
                </div>
            </div>
            <ModalConfirmacaoEmail showModal={showConfirmacaoEmail} onClose={handleCloseModal} />



        </div>


    )
}

export default CadastroUsuario