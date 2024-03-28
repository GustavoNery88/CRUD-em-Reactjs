import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


function ListaUsuarios() {
    
    function regarregarPagina(){
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    const [usuarios, setUsers] = useState([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState('');

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('https://api-do-crud.vercel.app/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        }

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            const response = await axios.delete(`https://api-do-crud.vercel.app/users/${userId}`);
            console.log(response.data);
            toast.success('Usuário deletado com sucesso!');
            setUsers(usuarios.filter(usuario => usuario.id !== userId));
        } catch (error) {
            toast.error('Erro ao deletar usuário!');
            console.error('Error deleting user', error);
        }
    };

    const handleEditUser = (userId) => {
        const user = usuarios.find(usuario => usuario.id === userId);
        setUsuarioSelecionado(user);
    };

    const handleSubmitEditUser = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`https://api-do-crud.vercel.app/users/${usuarioSelecionado.id}`, {
                nome,
                email,
                idade
            });
            console.log(response.data);
            regarregarPagina();
            toast.success('Usuário editado com sucesso!', {
                autoClose: 2000
            });            
            // Atualiza a lista de usuários após a edição
            const updatedUsers = usuarios.map(user =>
                user.id === usuarioSelecionado.id ? response.data : user
            );
            setUsers(updatedUsers);
        } catch (error) {
            toast.error('Erro ao editar usuário!');
            console.error('Error updating user', error);
        }
    };
    
    
    useEffect(() => {
        if (usuarioSelecionado) {
            setNome(usuarioSelecionado.nome);
            setEmail(usuarioSelecionado.email);
            setIdade(usuarioSelecionado.idade);
        }
    }, [usuarioSelecionado]);

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Idade</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.idade}</td>
                            <td>
                                <button className="butao-editar" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onClick={() => handleEditUser(usuario.id)}>
                                    <i className="bi bi-pencil-square"></i>
                                </button>
                                <button onClick={() => handleDeleteUser(usuario.id)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalEditar">Editar de Usuário</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Formulário de Edição */}
                            <form onSubmit={(event) => handleSubmitEditUser(event)} >
                                <div>
                                    <label htmlFor="nome" className="form-label">Nome</label>
                                    <input type="text" className="form-control" id="nome"  onChange={(e) => setNome(e.target.value)} required defaultValue={nome} />
                                </div>
                                <div>
                                    <label htmlFor="email" className="form-label">E-mail</label>
                                    <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} required defaultValue={email} />
                                </div>
                                <div className="inputIdade">
                                    <label htmlFor="idade" className="form-label">Idade</label>
                                    <input type="text" className="form-control" id="idade" onChange={(e) => setIdade(e.target.value)} required defaultValue={idade}/>
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

export default ListaUsuarios;
