const book = {
    isbn: '978-3-16-148410-0',
    author: 'Steven Halim',
    name: 'Competitive Programming',
    keywords: ['programming', 'algorithm', 'contest'],
    borrowed: []
};
const student = {
    name: 'John',
    email: 'john@mum.edu',
    phoneNumber: '+1(302)123-4567',
    borrowedBooks: [
        {
            book: book,
            returnDate: new Date('2018-04-20')
        }
    ],
};