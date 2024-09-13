
import Header from '../components/Header/Header';
import { useState } from 'react';
import { useSearch } from '../context/SearchContext';
import { useEffect } from 'react';
import BooksCatalog from '../components/Catalog/BooksCatalog';



const Catalog = () => {

    const { searchBooks, setSearchTerm } = useSearch();
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        if (!hasSearched) {
            const queryDefalut = 'Python e Django';
            searchBooks(queryDefalut).finally(() => {
                setHasSearched(true);
            });
        }
        setSearchTerm('');
    }, [hasSearched]);



    return (
        <>
            <Header />
            <h2 className='text-center text-secondary m-5'>
                Catálogo de Livros
            </h2>
            <BooksCatalog />
            {/* {isSearchTriggered ? <BooksCatalog /> : 'catalogo de livros'} */}
        </>
    );
};

export default Catalog;