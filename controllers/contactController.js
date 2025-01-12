import Contacts from "../models/contactModel.js"

export const getContacts = async(req,res,next)=>{
    try {
        const contacts = await Contacts.find();
        return res.status(200).json(contacts)
    } 
    catch (error) {
        next(new Error(error.message))
    }    
}

export const getContact = async(req,res,next)=>{
    try {
        const id = req.params.id;
        if(!id){
            res.status(400)
            throw new Error("Not a valid ID")
            
        }
        const contact =  await Contacts.findById(id);
        if(!contact){
            res.status(404)
           throw new Error("No Contacts found")
        }
        return res.status(200).json(contact)
    }
     catch (error) {
        next(error)    
    }
}

export const createContact = async(req,res,next)=>{
    try {
     const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All Fields are mandatory")
    }
    const contact = await Contacts.create({
        name, email, phone
    })
    return res.status(201).json(contact)
    }
     catch (error) {
        next(error)
    }
}

export const updateContact = async(req,res,next)=>{
    try {
        const id = req.params.id;
        if(!id){
            res.status(400)
            throw new Error("Not a valid ID")
        }
        const contact =  await Contacts.findById(id);
        if(!contact){
            res.status(404)
            throw new Error("No contacts found")
        }
        const updatedContact = await Contacts.findByIdAndUpdate(id, req.body,{new:true});
        return res.status(200).json(updatedContact)
    }
     catch (error) {
        next(error)   
    }
}

export const deleteContact = async(req,res,next)=>{
    try {
        const id = req.params.id;
        if(!id){
            res.status(400)
            throw new Error("Not a valid ID")
        }
        const contact =  await Contacts.findById(id);
        if(!contact){
            res.status(404)
            throw new Error("No Contacts found");
        }
        await Contacts.findByIdAndDelete(id);
        return res.status(200).json("Contact deleted")
    }
     catch (error) {
        next(error)
    }
}