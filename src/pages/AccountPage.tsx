import { useEffect, useState } from 'react';
import { getUserData, getPurchases } from '../services/RequestsService';
import { useNavigate } from 'react-router-dom';
import formatPrice from '../functions/formatPrice';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import formatDateISO from '../functions/formatDateISO';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

type User = {
    id: string;
    name: string;
    email: string;
    address: string;
};


type BookPurchase = {
    book_id: string;
    title: string;
    quantity: number;
    authors: string[];
    list_price: string;
};

type Purchase = {
    user: string;
    total_purchase: number;
    created_at: string;
    book_purchases: BookPurchase[];
};

const getFirstName = (fullName: string): string => {
    const nameParts = fullName.trim().split(' ');
    return nameParts[0] || '';
};

const generatePDF = (purchases: Purchase[]) => {


    const docDefinition = {
        content: [
            { text: 'Histórico de Compras', style: 'header' },
            {
                table: {
                    headerRows: 1,
                    widths: ['*', '*', '*'],
                    body: [
                        ['Data da Compra', 'Livros Comprados', 'Total da Compra'],
                        ...purchases.map(purchase => [
                            formatDateISO(purchase.created_at),
                            purchase.book_purchases.map(book => `${book.title} - (${book.quantity}x)`).join('; \n'),
                            formatPrice(purchase.total_purchase)
                        ])
                    ]
                },
                layout: 'lightHorizontalLines',
            }
        ],

        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10] as [number, number, number, number],
            }
        }
    };

    pdfMake.createPdf(docDefinition).download('historico_compras.pdf');
};

const Account = () => {
    const [user, setUser] = useState<User | null>(null);
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        navigate('/login');
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                setError('Faça login para acessar esta página');
                setLoading(false);
                return;
            }

            try {
                const userData = await getUserData();
                setUser(userData);
            } catch (error) {
                setError('Erro ao buscar dados do usuário');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    useEffect(() => {
        const fetchPurchases = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                setError('Faça login para acessar esta página');
                setLoading(false);
                return;
            }

            try {
                const purchaseData = await getPurchases();
                setPurchases(purchaseData);
            } catch (error) {
                setError('Erro ao buscar histórico de compras');
            } finally {
                setLoading(false);
            }
        };

        fetchPurchases();
    }, [navigate]);

    if (loading) {
        return (
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <div className='spinner-border' role='status'>
                    <span className='sr-only'>Carregando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className='alert alert-danger' role='alert'>{error}</div>;
    }

    return (
        <>
            <header>
                <h1 className='text-center'>
                    <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                        Bookstore
                    </Link>
                </h1>
                <NavBar />
                <button className='btn ' onClick={handleLogout}>
                    Logout
                </button>
            </header>

            <div className='container mt-4'>
                {user ? (
                    <div>
                        <h1 className='mb-4 text-center text-secondary'>Bem-vindo, {getFirstName(user.name)}!</h1>

                        <section className='card mb-4'>
                            <div className='card-header'>
                                <h2 className='h5 mb-0'>Dados Pessoais</h2>
                            </div>
                            <div className='card-body'>
                                <p><strong>Nome completo:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Endereço:</strong> {user.address}</p>
                            </div>
                        </section>

                        <section className='card mb-4'>
                            <div className='card-header d-flex justify-content-between align-items-center'>
                                <h2 className='h5 mb-0'>Histórico de Compras</h2>
                                <button
                                    className='btn btn-primary'
                                    onClick={() => generatePDF(purchases)}
                                >
                                    Imprimir PDF
                                </button>
                            </div>
                            <div className='card-body'>
                                {purchases.length > 0 ? (
                                    <ul className='list-group'>
                                        {purchases.map((purchase, index) => (
                                            <li key={index} className='list-group-item'>
                                                <h5>Livros comprados:</h5>
                                                <ul>
                                                    {purchase.book_purchases.map((book, idx) => (
                                                        <li key={idx}>
                                                            <strong>{book.title}</strong> (Quantidade: {book.quantity})<br />
                                                            <em>Autores: {book.authors.join(', ')}</em><br />
                                                            Preço: R$ {formatPrice(book.list_price)}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className='mt-3'>
                                                    <p><strong>Data da compra:</strong> {formatDateISO(purchase.created_at)}</p>
                                                    <p><strong>Total da compra:</strong> R$ {formatPrice(purchase.total_purchase)}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Não há histórico de compras disponível</p>
                                )}
                            </div>
                        </section>
                    </div>
                ) : (
                    <p>Não há informações disponíveis</p>
                )}
            </div>
        </>
    );
};

export default Account;
