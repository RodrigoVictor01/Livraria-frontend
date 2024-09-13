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

