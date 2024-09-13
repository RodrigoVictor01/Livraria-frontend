import React, { createContext, useState, useContext } from 'react';
import { getBooks } from '../services/RequestsService';

type SearchContextType = {
    query: string;
    setQuery: (query: string) => void;
    foundBooks: any[];
    searchBooks: (query: string) => Promise<void>;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
};

export type Book = {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[];
        categories: string[];
        publishedDate: string;
        imageLinks: {
            thumbnail: string;
        };
        description: string;
        pageCount: number;
        publisher: string;
    };
}


const SearchContext = createContext<SearchContextType | undefined>(undefined);



export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch deve ser usado dentro de um SearchProvider');
    }
    return context;
};


export const SearchProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [query, setQuery] = useState<string>('');
    const [foundBooks, setFoundBooks] = useState<Book[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const searchBooks = async (searchQuery: string) => {
        try {
            const data = await getBooks(searchQuery);
            if (data && data.items) {
                setFoundBooks(data.items);
            }
            else {
                setFoundBooks([]);
            }
        }
        catch (error) {
            console.error('Erro ao buscar livros ', error);
            setFoundBooks([]);
        }
    };

    return (
        <SearchContext.Provider value={{
            query,
            setQuery,
            foundBooks,
            searchBooks,
            searchTerm,
            setSearchTerm
        }}>
            {children}
        </SearchContext.Provider>
    );
};

