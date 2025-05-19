import express from 'express';
import { Book } from '../models/bookModel.js';
const router=express.Router()
router.post('/',async(req,res)=>{
    try{
        if(!req.body.title||
           !req.body.author||
           !req.body.publishYear||
           !req.body.image||
           !req.body.context
        ){
            return res.status(400).send({message:"Please Provide All required fields"});
        }
        const newBook={
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,
            image:req.body.image,
            context:req.body.context
        };
        const book=await Book.create(newBook);
        return res.status(201).send(book);
    }
    catch(error){
        return res.status(500).send({message:error.message})
    }
})
router.get('/',async(req,res)=>{
    try{
        const books=await Book.find({})
        return res.status(200).json({count:books.length,data:books});
    }
    catch(error){
        res.status(500).send({message:error.message});
    }
})
router.get('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const books=await Book.findById(id)
        return res.status(200).json(books);
    }
    catch(error){
        res.status(500).send({message:error.message});
    }
})
router.put('/:id',async(req,res)=>{
    try{
        if(!req.body.title||
           !req.body.author||
           !req.body.publishYear||
           !req.body.image||
           !req.body.context
        ){
            return res.status(400).send({message:"Please fill all fields"});
        }
        const {id}=req.params;
        const result=await Book.findByIdAndUpdate(id,req.body);
        if(!result){
            return res.status(404).json("Book not found");
        }
        return res.status(200).send({message:"Book updated successfully"});

    }
    catch(error){
        return res.status(500).send({message:error.message});
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const result=await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message:'Book not found'})
        }
        return res.status(200).send({message:"Book deleted successfully"})
    }
    catch(error){
        return res.status(500).send({message:error.message})
    }
})
export default router;