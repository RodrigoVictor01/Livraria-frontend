import { useState, useEffect } from 'react';
import { Container, ListGroup, Button, Image } from 'react-bootstrap';
import formatPrice from '../functions/formatPrice'; // Supondo que você tenha uma função para formatar o preço
import { CartBook } from '../components/BookDetails/BookDetails';


const Checkout = () => {
    const [cart, setCart] = useState<CartBook[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const totalCart = () => {
        return cart.reduce((total, book) => {
            const price = book.saleInfo?.listPrice?.amount || 0;
            const quantity = book.quantity || 1;
            return total + price * quantity;
        }, 0);
    };

    const total = totalCart();

    const handlePurchase = async () => {
        console.log('Compra realizada com sucesso!');
        const apiUrl = import.meta.env.VITE_API_URL;

        const purchaseData = {
            total_purchase: total,
            book_purchases: cart.map((book) => ({
                book_id: book.id,
                title: book.volumeInfo.title,
                quantity: book.quantity,
                authors: book.volumeInfo.authors,
                list_price: book.saleInfo.listPrice?.amount,
            }))
        };

        try {
            const response = await fetch(`${apiUrl}purchases/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(purchaseData)

            });

            if (response.ok) {
                setCart([]);
                localStorage.removeItem('cart');
            }
            else {
                console.error('Erro ao realizar compra');
            }

        }
        catch (error) {
            console.error('Erro ao realizar compra', error);
        }
        // console.log('Compra realizada com sucesso!', purchaseData);
    }



    return (
        <Container className="mt-5">
            <h1 className="text-center text-secondary m-5">Checkout</h1>
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
                                            <p>Quantidade: {book.quantity || 1}</p>
                                        </div>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <div className="text-end mt-3">
                        <h4>Total: R$ {formatPrice(total)}</h4>
                    </div>

                    <div className="text-end mt-3 mb-5">
                        <Button variant="success border-0" onClick={handlePurchase}>
                            Finalizar pedido
                        </Button>
                    </div>
                </>
            )}
        </Container>
    );
};

export default Checkout;
