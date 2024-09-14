import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner } from 'react-bootstrap';
import { getBookDetails } from '../../services/RequestsService';
import formatDate from '../../functions/formatDate';
import { useCart } from '../../context/CartContext';
import { bookAdded } from '../Catalog/BooksCatalog';
import formatPrice from '../../functions/formatPrice';

type BookDetail = {
    title: string;
    authors: string[];
    description: string;
    pageCount: number;
    publisher: string;
    publishedDate: string;
    imageLinks: {
        thumbnail: string;
    };
    saleInfo: {
        listPrice?: {
            amount: number;
        };
        saleability: string;
    };
};


export type CartBook = {
    id: string;
    quantity: number;
    saleInfo: {
        listPrice?: {
            amount?: number;
            currencyCode?: string;
        };
        saleability: string;
    };
    volumeInfo: {
        title: string;
        authors: string[];
        description: string;
        pageCount: number;
        publisher: string;
        publishedDate: string;
        imageLinks: {
            thumbnail: string;
        };
    };
}

const BookDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<BookDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { cart, setCart } = useCart();

    useEffect(() => {
        if (!id) {
            setError('ID do livro não fornecido');
            setLoading(false);
            return;
        }

        const fetchBook = async () => {
            try {
                const data = await getBookDetails(id);

                if (data) {
                    setBook({ ...data.volumeInfo, saleInfo: data.saleInfo });
                }
                else {
                    setError('Livro não encontrado');
                }
            }
            catch (error) {
                setError('Erro ao buscar detalhes do livro');
                console.error('Erro ao buscar detalhes do livro: ', error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleAddToCart = (selectedBook: BookDetail) => {
        const newBook: CartBook = {
            id: id!,
            quantity: 1,
            saleInfo: {
                listPrice: { amount: selectedBook.saleInfo.listPrice?.amount },
                saleability: selectedBook.saleInfo.saleability
            },
            volumeInfo: {
                title: selectedBook.title,
                authors: selectedBook.authors,
                description: selectedBook.description,
                pageCount: selectedBook.pageCount,
                publisher: selectedBook.publisher,
                publishedDate: selectedBook.publishedDate,
                imageLinks: selectedBook.imageLinks
            }
        };

        bookAdded(`<strong>${newBook.volumeInfo.title}</strong> foi adicionado ao carrinho`);

        const updatedCart = cart.map((book) =>
            book.id === newBook.id
                ? { ...book, quantity: (book.quantity || 0) + 1 }
                : book
        );

        if (!cart.some((book) => book.id === newBook.id)) {
            updatedCart.push(newBook);
        }

        setCart(updatedCart);
    };

    if (loading) {
        return (
            <Container
                fluid
                className='d-flex justify-content-center align-items-center'
                style={{ height: '100vh' }}>
                <Spinner animation='border' role='status'>
                    <span className='sr-only'>Carregando...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return <p className='text-center text-danger'>{error}</p>;
    }
    if (!book) return <p>Detalhes do livro não disponíveis</p>;

    return (
        <>
            <Container className='mt-5'>
                <Row>
                    <Col md={4}>
                        <Image
                            src={book.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                            alt={book.title}
                            fluid
                        />
                    </Col>

                    <Col md={8}>
                        <h2>{book.title}</h2>
                        <p><strong>Autor(es):</strong> {book.authors?.join(', ') || 'Desconhecido'}</p>
                        <p><strong>Publicadora:</strong> {book.publisher || 'Desconhecido'}</p>
                        <p><strong>Publicado em:</strong> {formatDate(book.publishedDate) || 'Desconhecido'}</p>
                        <p><strong>Número de páginas:</strong> {book.pageCount || 'Não informado'}</p>
                        <strong>Sinopse:</strong>
                        <div dangerouslySetInnerHTML={{ __html: book.description || 'Não disponível' }} />
                        <p><strong>Preço: </strong>
                            {book.saleInfo.listPrice?.amount !== undefined ?
                                `R$ ${formatPrice(book.saleInfo.listPrice.amount)}`
                                : 'Preço não disponível'}
                        </p>
                    </Col>
                </Row>
                <Row className='m-5'>
                    <Col className='d-flex justify-content-center'>
                        {book.saleInfo.saleability === 'NOT_FOR_SALE' ?
                            <Button variant='secondary' className='m-2 disabled'>
                                Adicionar ao Carrinho
                            </Button> :
                            <Button variant='secondary' onClick={() => handleAddToCart(book)} className='m-2'>
                                Adicionar ao Carrinho
                            </Button>}
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default BookDetails;
