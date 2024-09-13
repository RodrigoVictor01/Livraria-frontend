import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import BooksCatalog from '../components/Catalog/BooksCatalog';
import Swal from 'sweetalert2';

const registerSuccess = (successMessage: string) => {
    Swal.fire({
        title: successMessage,
        icon: "success"
    });
}

const registerFailed = (errorMessage: string) => {
    Swal.fire({
        title: errorMessage,
        icon: "error"
    });
}



const RegisterPage = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        cep: '',
        address: '',
    });

    const apiUrl = import.meta.env.VITE_API_URL;

    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    const navigate = useNavigate();
    const [cepError, setCepError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'cep') {
            const formattedCep = value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2');
            setFormData({
                ...formData,
                cep: formattedCep,
            });
        }
        else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };


    const handleCepBlur = async () => {
        const cep = formData.cep.replace(/\D/g, '');

        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    setCepError('CEP não encontrado');
                    setFormData({
                        ...formData,
                        address: '',
                    });
                }
                else {
                    setFormData({
                        ...formData,
                        address: `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`,
                    });
                    setCepError('');
                }
            }
            catch (error) {
                setCepError('Erro ao buscar o CEP');
            }
        }
        else {
            setCepError('CEP inválido');
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const urlRegister = `${apiUrl}register/`;

        const registerData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            address: formData.address
        }

        try {
            const response = await fetch(urlRegister, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });

            const result = await response.json();

            if (response.ok) {
                registerSuccess('Cadastro realizado com sucesso!');
                navigate('/login');
            }
            else {
                console.error('Erro ao cadastrar usuário', result);
                if (result.email) {
                    registerFailed('E-mail já cadastrado');
                }
            }
        }
        catch (error) {
            console.error('Erro ao cadastrar usuário');
            alert('Erro ao cadastrar usuário');
        }
    };

    const [isSearchTriggered, setIsSearchTriggered] = useState(false);

    const handleSearchTriggered = () => {
        setIsSearchTriggered(true);
    };

    return (
        <>
            <Header onSearch={handleSearchTriggered} />
            {isSearchTriggered ? (
                <BooksCatalog />
            ) : (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <Card style={{ width: '30rem', padding: '2rem' }}>
                        <h3 className="text-center mb-4">Cadastre-se</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formNome" className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Digite seu nome"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Digite seu e-mail"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formSenha" className="mb-3">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Digite sua senha"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formRepetirSenha" className="mb-3">
                                <Form.Label>Repetir Senha</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Repita sua senha"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                {password !== confirmPassword && password.length >= 4 &&
                                    <small className="text-danger">{'Senhas não correspondem'}</small>}
                            </Form.Group>

                            <Form.Group controlId="formCep" className="mb-3">
                                <Form.Label>CEP</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cep"
                                    placeholder="Digite seu CEP"
                                    value={formData.cep}
                                    onChange={handleChange}
                                    onBlur={handleCepBlur}
                                    maxLength={9}
                                    required
                                />
                                {cepError && <small className="text-danger">{cepError}</small>}
                            </Form.Group>

                            <Form.Group controlId="formEndereco" className="mb-3">
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    placeholder="Endereço será preenchido automaticamente"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 mb-3">
                                Continuar
                            </Button>

                            <div className="text-center mt-3">
                                <small>
                                    Já tem uma conta?{' '}
                                    <span
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => navigate('/login')}>
                                        Faça login
                                    </span>
                                </small>
                            </div>
                        </Form>
                    </Card>
                </div>
            )}
        </>
    );
};

export default RegisterPage;
