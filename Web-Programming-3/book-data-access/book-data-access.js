const baseURL = "http://localhost:8080/books/";

export function getAllBooks(){
    return axios.get(baseURL).then(resp => resp.data).catch(errorHandler);
}

export function getBookById(id){
    return axios.get(baseURL + id).then(resp => resp.data).catch(errorHandler);
}

export function insertBook(book){
    return axios.post(baseURL, book).then(resp => resp.data).catch(errorHandler);
}

export function updateBook(book){
    return axios.put(baseURL + book.id, book).then(resp => resp.data).catch(errorHandler);
}

export function deleteBook(id){
    return axios.delete(baseURL + id).then(resp => resp.data).catch(errorHandler);
}

function errorHandler(err){
    console.log("ERROR (in book-data-access):", err.message);
    throw err;
}