import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { ModalConfirmacaoEmail } from '../../components/Modal/Modal';
import { useNavigate } from 'react-router-dom';

import './styles.css'

import api from '../../service/api';

function CadastroUsuario() {

    const [showConfirmacaoEmail, setShowConfirmacaoEmail] = useState(false);

    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [userName, setUserName] = useState('')
    const [fullName, setFullName] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    function handleShowModal() {
        setShowConfirmacaoEmail(true);
    }

    function handleCloseModal() {
        setShowConfirmacaoEmail(false);
    }

    async function createUser(e) {
        e.preventDefault()

        const data = {
            userName,
            fullName,
            password,
        }

        try {
            const response = await api.post('/auth/signup', data)
            alert('Usuário Cadastrado com sucesso!')
        } catch (error) {
            alert('Erro durante a gravação do usuário, tente novamente')
        }


        // handleShowModal(true)
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
                        <form onSubmit={createUser} className="form-cadastro">

                            <div className="col-12">

                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={userName}
                                        id="email"
                                        fullName='fullName'
                                        aria-describedby="fullName"
                                        onChange={(text) => { setUserName(text.target.value) }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label">Nome Completo:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={fullName}
                                        id="fullName"
                                        fullName='fullName'
                                        aria-describedby="fullName"
                                        onChange={(text) => { setFullName(text.target.value) }}
                                    />
                                </div>


                                <div className=" mb-3">
                                    <label htmlFor="password" className="form-label">Senha:</label>
                                    <div className="input-group">

                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="form-control"
                                            value={password}
                                            id="password"
                                            fullName='password'
                                            aria-describedby="password"
                                            onChange={(text) => { setPassword(text.target.value) }}
                                        />
                                        <button type='button' className='btn btn-outline-secondary' onClick={togglePasswordVisibility}>
                                            {showPassword ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                                </svg>
                                            }<i class="fas fa-lock"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="passwordConfirm" className="form-label">Confirmar senha:</label>
                                    <div className="input-group has-validation">
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={passwordConfirm}
                                            id="passwordConfirm"
                                            fullName='passwordConfirm'
                                            aria-describedby="passwordConfirm"
                                            onChange={(text) => {
                                                setPasswordConfirm(text.target.value)
                                            }}
                                        />
                                        {passwordConfirm !== '' && password !== passwordConfirm && (
                                            <div style={{ display: 'block' }} className="invalid-feedback">
                                                Senhas diferentes
                                            </div>
                                        )}

                                    </div>
                                </div>

                                <div className="d-grid mt-5 gap-3">
                                    <button className="btn btn-primary" type='submit'>Salvar</button>
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