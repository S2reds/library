

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}

let myLibrary = [];

// form control
const NAMEBOOK = document.querySelector('#bookname')
const AUTHOR = document.querySelector('#author')
const PAGES = document.querySelector('#pages')
const READ = document.querySelector('#read')
const err = document.querySelector('#err')

class formControl {
    get form() {
        if (NAMEBOOK.value === '') return err.innerHTML = 'Missing Book Name'
        else if (AUTHOR.value === '') return err.innerHTML = 'Missing Author'
        else if (PAGES.value === '') return err.innerHTML = 'How Many Pages?'
        else {
            const formData = Object.fromEntries(new FormData(form).entries())
            new addBook(formData.bookname, formData.author, formData.pages, formData.read).add
            document.querySelector('#bookname').value = ''
            document.querySelector('#author').value = ''
            document.querySelector('#pages').value = ''
            err.innerHTML = ''
        }
    }

}


class loadBooks {
    constructor() {
        this.load();
    }
    load() {
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
       
    }
}}

class addBook {
    constructor(title, author, pages, read) {
        this.newBook = new Book(title,author,pages, read);
    }
    get add() {  
        return (
            myLibrary.push(this.newBook),
            localStorage.setItem('books', JSON.stringify(myLibrary)),
            new createBook(this.newBook).create()
        )
    }
}

class createBook {
    constructor(book) {
        this.create();
        this.book = book;
    }
    create() {
        try {
            const main = document.querySelector('.main')
            const div = document.createElement('div')
            div.classList.add('card')
            const h3 = document.createElement('h3')
            h3.textContent = this.book.title
            const p = document.createElement('p')
            p.innerHTML = `author: ${this.book.author} <br>
                            pages: ${this.book.pages} <br>
                            read: ${this.book.read}`
        
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
        } catch(e) {
          
        }
    }
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
            new loadBooks().load()
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
            new loadBooks().load()
        })
    }
})


new loadBooks().load()