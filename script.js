

function Book(title,author,pages,read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

let myLibrary = [];

// form control
const NAMEBOOK = document.querySelector('#bookname')
const AUTHOR = document.querySelector('#author')
const PAGES = document.querySelector('#pages')
const READ = document.querySelector('#read')
const err = document.querySelector('#err')

function formControl() {
    if (NAMEBOOK.value === '') err.innerHTML = 'Missing Book Name'
    else if (AUTHOR.value === '') err.innerHTML = 'Missing Author'
    else if (PAGES.value === '') err.innerHTML = 'How Many Pages?'
    else {
        const formData = Object.fromEntries(new FormData(form).entries())
        addBook(formData.bookname, formData.author, formData.pages, formData.read)
        document.querySelector('#bookname').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#pages').value = ''
        err.innerHTML = ''
    }

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
            remove.textContent = 'Remove'
            remove.classList.add('remove')
            let update = document.createElement('button')
            update.classList.add('update')
            update.textContent = "Read it!";
            update.value = i;
            let holder = document.createElement('div')
            holder.classList.add('holder')
            holder.appendChild(remove)
            holder.appendChild(update)
            remove.value = i;
            div.appendChild(h3)
            div.appendChild(p)
            div.appendChild(holder)
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
    const div = document.createElement('div')
    div.classList.add('card')
    const h3 = document.createElement('h3')
    h3.textContent = book.title
    const p = document.createElement('p')
    p.innerHTML = `author: ${book.author} <br>
                    pages: ${book.pages} <br>
                    read: ${book.read}`

    const remove = document.createElement('button')
    remove.textContent = 'Remove'
    remove.classList.add('remove')
    remove.value = myLibrary.length -1
    const update = document.createElement('button')
    update.textContent = 'Read it!'
    update.classList.add('update')
    update.value = myLibrary.length -1
    const buttonHold = document.createElement('div')
    buttonHold.classList.add('holder')
    buttonHold.appendChild(remove)
    buttonHold.appendChild(update)
    div.appendChild(h3)
    div.appendChild(p)
    div.appendChild(buttonHold)
    main.appendChild(div)
}   

window.addEventListener('click', (e) => {
    // remove targeted book
    if (e.target.className === 'remove') {
        const butt = document.querySelectorAll('.remove')
        butt.forEach(b => {           
            if (b.value === e.target.value) {
                const num = b.value
                myLibrary.splice(num,1)
                localStorage.setItem('books', JSON.stringify(myLibrary))
            }
            loadBooks()
        })
    }
    // update read status
    if (e.target.className === 'update') {
        const update = document.querySelectorAll('.update')
        update.forEach(b => {
            if (b.value === e.target.value) {
                const num = b.value
                if (myLibrary[num].read === 'read') myLibrary[num].read = 'unread'
                else if (myLibrary[num].read === 'unread') myLibrary[num].read = 'read'
                localStorage.setItem('books', JSON.stringify(myLibrary))
            }
            loadBooks()
        })
    }
})


loadBooks()