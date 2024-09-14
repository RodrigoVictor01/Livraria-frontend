import './NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const token = localStorage.getItem('token');


    return (
        <div className='navBar'>
            <nav className='navbar navbar-expand-lg navbar-light'>
                <div className='container-fluid'>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarNav'
                        aria-controls='navbarNav'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div className='collapse navbar-collapse' id='navbarNav'>
                        <ul className='navbar-nav ms-auto'>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/'>
                                    Início
                                </Link>
                            </li>

                            <li className='nav-item'>
                                <Link className='nav-link' to='/catalogo'>
                                    Catálogo
                                </Link>
                            </li>

                            <li className='nav-item'>
                                <Link className='nav-link' to='/carrinho'>
                                    Carrinho
                                </Link>
                            </li>
                            {token ? (<li className='nav-item'>
                                <Link className='nav-link' to='/conta'>
                                    Minha conta
                                </Link>
                            </li>) : (<li className='nav-item'>
                                <Link className='nav-link' to='/login'>
                                    Login
                                </Link>
                            </li>)}

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
