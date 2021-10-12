const BOOK_ITEMID = "check";

function addBook(){
    
    const title = document.querySelector("#title-book").value;
    const author = document.querySelector("#author").value;
    const year = document.querySelector("#year").value;
    const isComplete = document.querySelector("#isComplete").checked;

    const book = createBook(title, author, year, isComplete);
    const bookObject = createObject(title, author, year, isComplete);
    books.push(bookObject);

    book[BOOK_ITEMID] = bookObject.id;

    if(isComplete){
        let Read = document.querySelector("#box-baca");
        Read.appendChild(book);
    }
    else{
        let unRead = document.querySelector("#box-blmbaca");
        unRead.appendChild(book);
    }

    updateData();
}

function createBook(judul, pengarang, tahun, isComplete){
    const title = document.createElement("h3");
    title.classList.add("title");
    title.innerText = judul;

    const line = document.createElement("hr");

    const author = document.createElement("p");
    author.classList.add("author");
    author.innerText = pengarang;

    const year = document.createElement("p");
    year.classList.add("year");
    year.innerText = tahun;

    const bookText = document.createElement("div");
    bookText.classList.add("book-text");
    bookText.append(title, line, author, year);

    const bookOption = document.createElement("div");
    bookOption.classList.add("book-option");

    if(isComplete){
        bookOption.append(buttonUnread(), buttonDelete());
        console.log("Create Button : Unread and Delete");
    } else {
        bookOption.append(buttonRead(), buttonDelete());
        console.log("Create Button : Read and Delete");
    }
    
    const opRead = document.createElement("div");
    opRead.classList.add("box");

    opRead.append(bookText, bookOption);
    return opRead;
}


// Button Function
function buttonRead(){
    const button = document.createElement("button");
    button.innerText = "Sudah Dibaca";
    button.classList.add("button-read");
    button.addEventListener("click", function (event) {
        read(event.target.parentElement.parentElement);
        console.log("Do : Read");
    });

    console.log("Button : Read");
    return button;
}

function buttonDelete(){
    const button = document.createElement("button");
    button.innerText = "Hapus Buku";
    button.classList.add("button-delete");
    button.addEventListener("click", function (event) {
        deleteBook(event.target.parentElement.parentElement);
        console.log("Do : Delete");
    });

    console.log("Button : Delete");
    return button;
}

function buttonUnread(){
    const button = document.createElement("button");
    button.innerText = "Belum Dibaca";
    button.classList.add("button-unread");
    button.addEventListener("click", function (event) {
        unread(event.target.parentElement.parentElement);
        console.log("Do : Unread");
    });

    console.log("Button : Unread");
    return button;
}

// Event dari Button
function read(taskElement){
    const boxBaca = document.querySelector("#box-baca");
    const title = taskElement.querySelector(".book-text > .title").innerText;
    const author = taskElement.querySelector(".book-text > .author").innerText;
    const year = taskElement.querySelector(".book-text > .year").innerText;

    console.log("Book : " + title + " | " + author + " | " + year);

    const book = createBook(title, author, year, true);
    // Storage
    const bookpost = findBook(taskElement[BOOK_ITEMID]);
    bookpost.isComplete = true;
    book[BOOK_ITEMID] = bookpost.id;

    boxBaca.append(book);
    taskElement.remove();
    updateData();
}

function deleteBook(taskElement){
    let choice = confirm("Apakah ingin dihapus?");
    if(!choice){return ;}

    const bookPost = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPost, 1);
    taskElement.remove();
    updateData();
}

function unread(taskElement){
    const title = taskElement.querySelector(".book-text > .title").innerText;
    const author = taskElement.querySelector(".book-text > .author").innerText;
    const year = taskElement.querySelector(".book-text > .year").innerText;

    const book = createBook(title, author, year, false);
    const boxBaca = document.querySelector("#box-blmbaca");
    
    // Storage  
    const bookpost = findBook(taskElement[BOOK_ITEMID]);
    bookpost.isComplete = false;
    book[BOOK_ITEMID] = bookpost.id;

    boxBaca.append(book);
    taskElement.remove();
    updateData();
}

function refreshData() {
    const noread = document.querySelector("#box-blmbaca");
    const read = document.querySelector("#box-baca")

    for(book of books){
        const newBook = createBook(book.title, book.author, book.year, book.isComplete);
        newBook[BOOK_ITEMID] = book.id;

        if(book.isComplete){read.append(newBook);}
        else{noread.append(newBook);}
    }
}

// Menggunakan filter

function findIt() {
    findItExe(true);
    findItExe(false);
}

function findItExe(isComplete) {
    console.log("Masuk");
    let input, x, box, title, titleText;
    input = document.querySelector("#judul_buku").value.toUpperCase();

    if(isComplete){
        x = document.getElementById("box-baca");
    }
    else{
        x = document.getElementById("box-blmbaca");
    }
    box = x.getElementsByClassName('box');

    console.log(input + "||" + box.length);
    for(let i = 0; i < box.length; i++){
        title = box[i].getElementsByClassName('book-text')[0];
        title = title.getElementsByClassName('title')[0];
        console.log(title);

        titleText = title.innerText;
        console.log(titleText);
        if (titleText.toUpperCase().indexOf(input) > -1){
            box[i].style.display = "";
        }
        else{
            box[i].style.display = "none";
        }
    }
}