import Swal from 'sweetalert2';
export const query = '';

export const getBooks = async (query?: string) => {

    const API_KEY = import.meta.env.VITE_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`;


    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
    }
}


export const getBookDetails = async (id: string) => {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
    }
};


const errorRequest = (errorMessage: string) => {
    Swal.fire({
        icon: 'error',
        title: errorMessage,
        footer: '<a href="/login">Fazer login</a>'
    });
}

export const getUserData = async () => {

    const apiUrl = import.meta.env.VITE_API_URL;

    const token = localStorage.getItem('token');

    if (!token) {
        errorRequest('Faça login para finalizar a compra');
        throw new Error('Faça login para acessar esta página');
    }

    try {
        const response = await fetch(`${apiUrl}user-detail/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            errorRequest('Faça login para acessar esta página');
            throw new Error('Erro ao buscar token e dados do usuário');
        }

        const data = await response.json();

        return data.user;
    }
    catch (error) {
        console.error('Error:', error);
    }
}

export const getPurchases = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Faça login para acessar esta página');
    }

    try {
        const response = await fetch(`${apiUrl}purchase/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar compras');
        }
        const data = await response.json();

        return data;
    }
    catch (error) {
        console.error('Error:', error);
    }
}



