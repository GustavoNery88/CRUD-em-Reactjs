import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Formulario() {

    function regarregarPagina(){
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://api-do-crud.vercel.app/users', {
                nome,
                email,
                idade
            });
            console.log(response.data);
            setNome('');
            setEmail('');
            setIdade('');
            regarregarPagina();
            toast.success('Usuário cadastrado com sucesso!', {
                autoClose: 2000
            });     
        } catch (error) {
            toast.error('Erro ao cadastrar usuário. Por favor, tente novamente.');
            console.error('Error ao cadastrar usuário', error);
        }
    };
    return (
        <div>
            <div className='container-butao-cadastar'>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
                    Cadastrar usuários <i className="bi bi-plus-lg"></i>
                </button>
                
            </div>

            <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Cadastro de Usuário</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="nome" className="form-label">Nome</label>
                                    <input type="text" className="form-control" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="email" className="form-label">E-mail</label>
                                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="inputIdade">
                                    <label htmlFor="idade" className="form-label">Idade</label>
                                    <input type="text" className="form-control" id="idade" value={idade} onChange={(e) => setIdade(e.target.value)} required />
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary">Salvar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Formulario;
