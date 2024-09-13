import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Book = {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        categories?: string[];
        publishedDate?: string;
        imageLinks?: {
            thumbnail?: string;
        };
    };
    saleInfo: {
        listPrice?: {
            amount?: number;
            currencyCode?: string;
        };
        saleability: string;
    };
    quantity?: number;
}

type CartContextType = {
    cart: Book[];
    setCart: (cart: Book[]) => void;
    addToCart: (book: Book) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Book[]>(() => {

        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const addToCart = (newBook: Book) => {
        setCart((prevCart) => {
            const bookInCart = prevCart.find((book) => book.id === newBook.id);

            if (bookInCart) {
                return prevCart.map((book) =>
                    book.id === newBook.id ? { ...book, quantity: (book.quantity || 1) + 1 }
                        : book
                );
            }
            else {

                return [...prevCart, { ...newBook, quantity: 1 }];
            }
        });
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, addToCart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart deve ser usado dentro de um SearchProvider');
    }
    return context;
};
