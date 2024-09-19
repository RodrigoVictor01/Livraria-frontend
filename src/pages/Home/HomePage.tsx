import Header from '../../components/Header/Header';
import { useState } from 'react';
import BooksCatalog from '../../components/Catalog/BooksCatalog';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from 'react-bootstrap';
import Livro1 from '../../assets/got.jpg';
import Livro2 from '../../assets/maisSombio.jpeg';
import Livro3 from '../../assets/divinaComedia.jpg';
import './Home.css';

const Home = () => {
    const [isSearchTriggered, setIsSearchTriggered] = useState(false);

    const handleSearchTriggered = () => {
        setIsSearchTriggered(true);
    };

    return (
        <>
            <Header onSearch={handleSearchTriggered} />
            {isSearchTriggered ? (
                <BooksCatalog />
            ) : (
                <div className="container">
                    <div className="jumbotron jumbotron-fluid text-center bg-primary text-white">
                        <div className="container">
                            <h1 className="display-4">Bem-vindo à Nossa Livraria</h1>
                            <p className="lead">Encontre os melhores livros com descontos incríveis.</p>
                            <button className="btn btn-light btn-lg mb-3" onClick={handleSearchTriggered}>
                                Explore Agora
                            </button>
                        </div>
                    </div>

                    <div className="container mt-5 mb-5">
                        <h2 className="text-center mb-4">Promoções Especiais</h2>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card home" >
                                    <Image
                                        src={Livro1}
                                        className="card-img-top"
                                        alt="Game of Thrones"

                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">Em alta</h5>
                                        <p className="card-text">Os mais vendidos dos últimos meses!</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card home" >
                                    <Image
                                        src={Livro2}
                                        className="card-img-top"
                                        alt="Stephen King" />
                                    <div className="card-body">
                                        <h5 className="card-title">Lançamentos</h5>
                                        <p className="card-text">Confira os lançamentos mais esperados do mês.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card home">
                                    <Image src={Livro3}
                                        className="card-img-top"
                                        alt="Promoção 3" />

                                    <div className="card-body">
                                        <h5 className="card-title">Clássicos Imperdíveis</h5>
                                        <p className="card-text">Releia os grandes clássicos da literatura com desconto.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <footer>
                <div className="container">

                    <div className="footer-container">

                        <div className="nav-logo">
                            <div className="img-nav">
                                <i className="fa-solid fa-code fa-2xl"></i>
                            </div>
                            <h1>RV Slva.</h1>
                        </div>

                        <div className="links-footer">

                            <a href="https://github.com/RodrigoVictor01" target="_blank">
                                <i className="fa-brands fa-github"></i>
                            </a>

                            <a href="https://www.linkedin.com/in/rodrigo-victor-184a061b7/" target="_blank">
                                <i className="fa-brands fa-linkedin"></i>
                            </a>
                        </div>

                    </div>

                    <div className="copy">
                        <h3>Developed by Rodrigo Victor || All rights reserved</h3>
                    </div>

                </div>
            </footer>
        </>
    );
};

export default Home;
