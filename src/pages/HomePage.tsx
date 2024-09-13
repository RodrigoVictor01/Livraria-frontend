import Header from '../components/Header/Header';
import { useState } from 'react';
import BooksCatalog from '../components/Catalog/BooksCatalog';


const Home = () => {

    const [isSearchTriggered, setIsSearchTriggered] = useState(false);

    const handleSearchTriggered = () => {
        setIsSearchTriggered(true);
    };

    return (
        <>
            <Header onSearch={handleSearchTriggered} />
            {isSearchTriggered ? <BooksCatalog /> : 'pagina inicial'}
            {/* <BooksCatalog /> */}
        </>
    );
};

export default Home;