// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let newbook = book();

     res.render('books/details', {
         title: 'Add a new Item',
         books: newbook
     })      

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let bookToAdd = book({
      _id: req.body.id,
      Title: req.body.title,
      Description: req.body.description,
      Price: req.body.price,
      Author: req.body.author,
      Genre: req.body.genre
  });

  book.create(bookToAdd, (err, item) =>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          console.log(item);
          res.redirect('/books');
      }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id;

     book.findById(id, (err, bookToEdit) => {
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             res.render('books/details', {
                 title: 'Edit Item', 
                 books: bookToEdit
             })
         }
     });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id

     book.findByIdAndUpdate(req.params.id, {
      Title: req.body.title,
      Description: req.body.description,
      Price: req.body.price,
      Author: req.body.author,
      Genre: req.body.genre
      }, { new: true }, (err, data) => {
      
      if (!err) {
      res.redirect('/books');
      } else {
      res.end(err);
      }
      })

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id;

     book.remove({_id: id}, (err) => {
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             res.redirect('/books');
         }
     });
});


module.exports = router;
