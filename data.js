const storage_key = "Daftar Buku";

let books = [];

// Cek browser bisa storage atau tidak
function isCanStorage(){
    if(typeof(Storage) === undefined){
        alert("Browsermu gk bisa mas/mba");
        return false;
    }

    return true;
}

// Untuk save data
function saveData(){
    const parsed = JSON.stringify(books);
    localStorage.setItem(storage_key, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

// untuk load data
function loadData(){
    const getData = localStorage.getItem(storage_key);
    let data = JSON.parse(getData);

    if(data !== null){
        books = data;
    }

    document.dispatchEvent(new Event("ondataloaded"));
}

// Update data
function updateData(){
    if(isCanStorage()){saveData();}
}

// Membuat JSON
function createObject(title, author, year, isComplete){
    return{
        id: + new Date(),
        title,
        author,
        year,
        isComplete
    }
}

// Mencari buku
function findBook(book_id){
    let count = 0;
    for(book of books){
        if(book_id === book.id){return book;}
        count++;
    }

    return null;
}

function findBookIndex(book_id){
    let count = 0;
    for (book of books) {
        if(book_id === book.id){return count;}
        count++;
    }

    return -1;
}
