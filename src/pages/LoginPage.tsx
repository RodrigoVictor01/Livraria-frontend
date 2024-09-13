import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import BooksCatalog from '../components/Catalog/BooksCatalog';
import Swal from 'sweetalert2';

const loginSuccess = () => {
    Swal.fire({
        title: "Login bem sucesido!",
        icon: "success"
    });
}



const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const urlLogin = `${apiUrl}login/`;

        const loginData = {
            email,
            password,
        };

        try {
            const response = await fetch(urlLogin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.access

                if (token) {
                    localStorage.setItem('token', token);
                    loginSuccess();
                    navigate('/carrinho');
                }
                else {
                    console.log('Token não gerado');
                }
            }
            else {
                console.error('Credenciais inválidas');
            }

        }
        catch (error) {
            console.error('Erro ao logar');
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
                    <Card style={{ width: '25rem', padding: '2rem' }}>
                        <h3 className="text-center mb-4">Fazer login</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 mb-3">
                                Continuar
                            </Button>
                            <hr />

                            <div className="text-center mt-3">
                                <small>
                                    Não tem uma conta?{' '}
                                    <span
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => navigate('/register')}
                                    >
                                        Cadastre-se
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

export default Login;
