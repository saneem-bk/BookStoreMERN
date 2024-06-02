import express from 'express';
import { Book } from '../models/bookModel.js';
const router = express.Router();

router.post("/",async(req,res)=>{
    try{
if (!req.body.title || !req.body.author || !req.body.publishYear){
    res.status(400).send({
        message:"send all required fields: title,author,publishYear"
  });
}else{
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear
    };
    const book = await Book.create(newBook)
    return res.status(201).send(book);
}
  }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})

// route to get books from database

router.get("/",async(req, res) => {
    try{
     const books = await Book.find({});
     if(!books){
        res.status(404).send({message:"Books not found"});
     }else{
        res.status(200).send(books);
     } 
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
});

// route to get one book

router.get("/:id",async(req,res)=>{
    try{
     const id = req.params.id;
     const books = await Book.findById(id);
     if(!books){
        res.status(404).send({message:"Books not found"});
     }else{
        res.status(200).send(books);
     }
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

// route for updating a book

router.put("/:id",async(req,res)=>{
    try{
     const id = req.params.id;
     const result = await Book.findByIdAndUpdate(id, req.body);
     if(!result){
        res.status(404).send({message:"Book not found"});
     }else{
        res.status(200).send({message:"Books updated successfully"});
     }
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
});

// route for deleting a book

router.delete("/:id",async(req,res)=>{
    try{
     const id = req.params.id;
     const result = await Book.findByIdAndDelete(id);
     if(!result){
        res.status(404).send({message:"Books not found"});
     }else{
        res.status(200).send({message:"Book deleted successfully"});
     }
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
});


export default router;