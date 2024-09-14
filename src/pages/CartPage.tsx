import { useCart } from '../context/CartContext';
import { Container, ListGroup, Button, InputGroup, FormControl, Image } from 'react-bootstrap';
import formatPrice from '../functions/formatPrice';
import Header from '../components/Header/Header';
import { useState, useEffect } from 'react';
import BooksCatalog from '../components/Catalog/BooksCatalog';
import { useNavigate } from 'react-router-dom';
import { alertError } from '../pages/CheckoutPage';

const Cart = () => {
    const { cart, setCart } = useCart();

    const navigate = useNavigate();
    const [isSearchTriggered, setIsSearchTriggered] = useState(false);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart && JSON.parse(savedCart).length > 0) {
            setCart(JSON.parse(savedCart));
        }
    }, [setCart]);


    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        else {
            localStorage.removeItem('cart');
        }
    }, [cart]);



    const totalCart = () => {
        return cart.reduce((total, book) => {
            const price = book.saleInfo?.listPrice?.amount || 0;
            const quantity = book.quantity || 1;
            return total + price * quantity;
        }, 0);
    };


    const total = totalCart();

    const handleQuantityChange = (bookId: string, quantity: number) => {
        if (quantity < 1) return;
        const updatedCart = cart.map((book) =>
            book.id === bookId ? { ...book, quantity } : book
        );
        setCart(updatedCart);
    };


    const handleRemoveBook = (bookId: string) => {
        const updatedCart = cart.filter((book) => book.id !== bookId);
        setCart(updatedCart);
    };


    const handleSearchTriggered = () => {
        setIsSearchTriggered(true);
    };


    const handleCheckout = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            alertError('Você não está logado', 'Por favor, faça login ou cadastre-se para finalizar a compra');
            navigate('/login');
            return;
        }
        navigate('/checkout');
    };

    return (
        <>
            <Header onSearch={handleSearchTriggered} />
            {isSearchTriggered ? (
                <BooksCatalog />
            ) : (
                <Container className="mt-5">
                    <h1 className="text-center text-secondary m-5">Carrinho de Compras</h1>
                    {cart.length === 0 ? (
                        <p className="text-center">Seu carrinho está vazio</p>
                    ) : (
                        <>
                            <ListGroup>
                                {cart.map((book) => (
                                    <ListGroup.Item key={book.id}>
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <Image
                                                    src={book.volumeInfo?.imageLinks?.thumbnail || '/default-thumbnail.jpg'}
                                                    alt={book.volumeInfo.title || 'Imagem não disponível'}
                                                    style={{ width: '80px', height: 'auto', marginRight: '15px' }}
                                                />
                                                <div>
                                                    <h5>{book.volumeInfo.title}</h5>
                                                    <p>Autor(es): {book.volumeInfo.authors?.join(', ') || 'Desconhecido'}</p>
                                                    <p>Preço: R$ {book.saleInfo.listPrice?.amount ? formatPrice(book.saleInfo.listPrice.amount) : 'Preço não disponível'}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <InputGroup className="me-3">
                                                    <InputGroup.Text>Quantidade</InputGroup.Text>
                                                    <FormControl
                                                        type="number"
                                                        value={book.quantity || 1}
                                                        style={{ width: '80px' }}
                                                        onChange={(e) => handleQuantityChange(book.id, parseInt(e.target.value))}
                                                    />
                                                </InputGroup>
                                                <Button variant="danger" onClick={() => handleRemoveBook(book.id)}>
                                                    Remover
                                                </Button>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                            <div className="text-end mt-3">
                                <h4>Total: R$ {formatPrice(total)}</h4>
                            </div>
                            <div className="text-end mt-3 mb-5">
                                <Button variant="success border-0" onClick={handleCheckout}>
                                    Finalizar pedido
                                </Button>
                            </div>

                        </>
                    )}
                </Container>
            )}
        </>
    );
};

export default Cart;

