
let myLibrary = [];

function Book(title,author,pages,read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}


function loadBooks() {
    const bookList = JSON.parse(localStorage.getItem('books'));
    myLibrary = bookList;
    const main = document.querySelector('.main')
    main.innerHTML = ''

    if (localStorage.getItem('books') === null) {
        myLibrary = [];
    } else {
        for (let i = 0; i < myLibrary.length; i++) {
            let div = document.createElement('div')
            div.classList.add('card')
            let h3 = document.createElement('h3')
            h3.textContent = myLibrary[i].title
            let p = document.createElement('p')
            p.innerHTML = `author: ${myLibrary[i].author} <br>
                             pages: ${myLibrary[i].pages} <br>
                             read: ${myLibrary[i].read}`
        
            let remove = document.createElement('button')
            remove.textContent = 'remove'
            remove.classList.add('remove')
            remove.value = i;
            div.appendChild(h3)
            div.appendChild(p)
            div.appendChild(remove)
            main.appendChild(div)
    }
   
}}

function addBook(title, author, pages, read) {
    const newBook = new Book(title,author,pages, read)
    myLibrary.push(newBook)
    localStorage.setItem('books', JSON.stringify(myLibrary))
    createBook(newBook);
}

function createBook(book) {
    const main = document.querySelector('.main')
    let div = document.createElement('div')
    div.classList.add('card')
    let h3 = document.createElement('h3')
    h3.textContent = book.title
    let p = document.createElement('p')
    p.innerHTML = `author: ${book.author} <br>
                    pages: ${book.pages} <br>
                    read: ${book.read}`

    let remove = document.createElement('button')
    remove.textContent = 'remove'
    remove.classList.add('remove')
    div.appendChild(h3)
    div.appendChild(p)
    div.appendChild(remove)
    main.appendChild(div)
}   

window.addEventListener('click', (e) => {
    if (e.target.className === 'remove') {
        console.log(e.target.value)
        const butt = document.querySelectorAll('.remove')
        butt.forEach(b => {
            if (b.value === e.target.value) {
                let newLib = myLibrary.slice(e.target.value,1)
                localStorage.setItem('books', JSON.stringify(newLib))
            }
            loadBooks()
        })
       
    }
})


loadBooks()