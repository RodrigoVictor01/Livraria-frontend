import React, { useState } from 'react';
import Header from '../components/Header/Header';
import BookDetails from '../components/BookDetails/BookDetails';
import BooksCatalog from '../components/Catalog/BooksCatalog';

const BookDetailsPage: React.FC = () => {

    const [isSearchTriggered, setIsSearchTriggered] = useState(false);

    const handleSearchTriggered = () => {
        setIsSearchTriggered(true);
    };

    return (
        <>
            <Header onSearch={handleSearchTriggered} />
            {isSearchTriggered ? <BooksCatalog /> : <BookDetails />}
        </>
    );
};

export default BookDetailsPage;