const form = document.querySelector('#form')
const author = document.querySelector('#author')
const book = document.querySelector('#bookname')
const read = document.querySelector('#read')
const pages = document.querySelector('#pages')


form.addEventListener('submit', e => {
    e.preventDefault();
    if (!book.validity.valid) showError()
    else if (!author.validity.valid) showError()
    else if (read.value === "") read.setCustomValidity('PICK AN OPTION')
    else if (!pages.validity.valid) showError()
    else new formControl().form;
})

function showError() {
    if (book.validity.tooShort) book.setCustomValidity('TOO SHORT')
    else if (author.validity.tooShort) author.setCustomValidity('TOO SHORT')
    else if (pages.validity.rangeOverflow) pages.setCustomValidity('TOO MANY')
    else if (!read.validity.valid) read.setCustomValidity('PLEASE CHOOSE AN OPTION')
}