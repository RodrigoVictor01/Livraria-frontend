import React, { useState } from 'react';
import { useSearch } from '../../context/SearchContext';
import NavBar from '../NavBar/NavBar';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

type HeaderProps = {
    onSearch?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const { setSearchTerm, searchBooks } = useSearch();
    const [inputValue, setInputValue] = useState('');


    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        if (inputValue.trim()) {

            setSearchTerm(inputValue);
            await searchBooks(inputValue);
            if (onSearch) return onSearch();

        }
    };

    return (
        <header>
            <h1 className='text-center'>
                <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                    Bookstore
                </Link>
            </h1>

            <Form className='input' onSubmit={handleSearch}>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Busque por título, categoria ou autor'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button className='btn btn-primary' type='submit'>
                    Buscar
                </button>
            </Form>


            <div>
                <NavBar />
            </div>
        </header>
    );
};

export default Header;


// import React, { useState } from 'react';
// import { useSearch } from '../../context/SearchContext';
// import NavBar from '../NavBar/NavBar';
// import { Form } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import './Header.css';

// type HeaderProps = {
//     onSearch?: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ onSearch }) => {
//     const { setSearchTerm, searchBooks } = useSearch();

//     // const [inputValue, setInputValue] = useState(() => {
//     //     return localStorage.getItem('lastSearchTerm') || '';
//     // });

//     const [inputValue, setInputValue] = useState('');

//     const lastSearchTerm = localStorage.getItem('lastSearchTerm');


//     const navigate = useNavigate();

//     const handleSearch = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (inputValue.trim()) {
//             setSearchTerm(inputValue);
//             localStorage.setItem('lastSearchTerm', inputValue);
//             await searchBooks(inputValue);
//             navigate(`/busca?query=${encodeURIComponent(inputValue)}`);
//             if (onSearch) onSearch();

//             if (lastSearchTerm !== inputValue) {
//                 localStorage.removeItem('lastSearchTerm');
//             }
//         }



//     };

//     return (
//         <header>
//             <h1 className='text-center'>Bookstore</h1>

//             <Form className='input' onSubmit={handleSearch}>
//                 <input
//                     type='text'
//                     className='form-control'
//                     placeholder='Busque por título, categoria ou autor'
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                 />
//                 <button className='btn btn-primary' type='submit'>
//                     Buscar
//                 </button>
//             </Form>

//             <div>
//                 <NavBar />
//             </div>
//         </header>
//     );
// };

// export default Header;




