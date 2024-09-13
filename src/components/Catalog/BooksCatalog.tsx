import React from 'react';
import { useSearch } from '../../context/SearchContext';
import { useCart } from '../../context/CartContext';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import formatDate from '../../functions/formatDate';
import randomPrice from '../../functions/randomPrice';
import formatPrice from '../../functions/formatPrice';
import Swal from 'sweetalert2';
import './BooksCatalog.css';



export const bookAdded = (bookTitle: string) => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: bookTitle,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
            popup: 'smaller-swal-popup'
        }
    });
};




const BooksCatalog: React.FC = () => {
    const { foundBooks, searchTerm } = useSearch();
    const { addToCart } = useCart();


    const handleAddToCart = (book: any) => {
        addToCart(book);
        bookAdded(`<strong>${book.volumeInfo.title}</strong> foi adicionado ao carrinho`);
        console.log('Adicionar ao carrinho:', book);
    };

    return (
        <Container className='mt-5'>

            {searchTerm && foundBooks.length > 0 && (
                <h3 className='text-center text-secondary m-5'>
                    Busca por "{searchTerm}"
                </h3>
            )}

            <Row>
                {foundBooks.length > 0 ? (
                    foundBooks.map((book) => (
                        <Col key={book.id} sm={12} md={6} lg={4} className='mb-5'>
                            <Card style={{ height: '100%', display: 'flex', alignItems: 'center' }} >
                                <Card.Img
                                    className='mt-2'
                                    variant='top'
                                    src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                                    alt={book.volumeInfo.title}
                                    style={{ height: 'auto', objectFit: 'cover', width: '250px' }}
                                />
                                <Card.Body>
                                    <Card.Title>{book.volumeInfo.title}</Card.Title>
                                    <Card.Text>
                                        Autor(es): {book.volumeInfo.authors?.join(', ') || 'Desconhecido'}
                                    </Card.Text>
                                    <Card.Text>
                                        Categoria: {book.volumeInfo.categories?.join(', ') || 'Não categorizado'}
                                    </Card.Text>
                                    <Card.Text>
                                        Publicado em: {formatDate(book.volumeInfo.publishedDate) || 'Desconhecido'}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Preço: R$ {book.saleInfo.listPrice?.amount &&
                                            book.saleInfo.listPrice?.currencyCode === 'BRL' ?
                                            formatPrice(book.saleInfo.listPrice?.amount) :
                                            randomPrice()}</strong>
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>{book.saleInfo.saleability === 'NOT_FOR_SALE' ? 'Livro indisponível' : ' Livro disponível'}</strong>
                                    </Card.Text>

                                </Card.Body>
                                <Card.Footer className='text-center'>
                                    <Button variant='primary' href={`/book/${book.id}`} className='me-2'>
                                        Ver Detalhes
                                    </Button>
                                    {book.saleInfo.saleability === 'NOT_FOR_SALE' ?
                                        <Button variant='secondary ' className='m-2 disabled'>
                                            Adicionar ao Carrinho
                                        </Button> :
                                        <Button variant='secondary' onClick={() => handleAddToCart(book)} className='m-2'>
                                            Adicionar ao Carrinho
                                        </Button>}

                                </Card.Footer>
                            </Card>
                        </Col>
                    ))
                ) : (
                    ''
                )}
            </Row>
        </Container>
    );
};

export default BooksCatalog;