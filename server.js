const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(express.json());

const PORT = 3000;   

let Books = [{
    id: 1,
    title: "Power of Subconcious Mind",
    author: "Joseph Murphy"
},
    {
     id:2,
     title: "Monk Who Sold His Ferrari",
     author: "Robin Sharma"   
    },

    {
        id:3,
        title: "The Subtle Art of Not Giving a F**k",
        author: "Mark Manson"
    },
    {
        id:4,
        title: "Attitude is Everything",
        author: "Jeff Keller"
    },
    {
        id:5,
        title:"Why i killed Gandhi",
        author: "Nathuram Godse"
    }
]

app.get("/api/books",(req,res)=>{
    res.json(Books);
})

app.get("/api/books/:id",(req,res)=>{
    const book = Books.find((b) => b.id === parseInt(req.params.id))
    if(!book){
        return res.status(404).json({
            Message: "Book Not Found"
        })
    }else{
        res.json(book);
        console.log(book);
    }
})

app.post("/api/books", (req,res)=>{
    const newBook = {
        id: Books.length+1,
        title: req.body.title,
        author: req.body.author
    }
    Books.push(newBook);
    res.status(201).json(newBook);
})

app.put("/api/books/:id", (req,res)=>{
    const book = Books.find((b)=>b.id === req.params.id)
    if(!book){
        return res.status(404).json({
            Message: "Book not found"
        })
    }else{
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
    }
    res.json(book);
})



app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
})