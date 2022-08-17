import { Router, Request, Response } from "express";
import {  PhotoServices } from "../services/photo-services";

export const photoRouter = Router();

photoRouter.get('/', async (req: Request, res: Response ) =>{
const results = await PhotoServices.getAllPhotos();

res.status(200).send(results);
});

photoRouter.post('/', async (req: Request, res: 
    Response) => {
const { photoUrl, description} = req.body;

if(!photoUrl) {
    res.status(400).send("PhotoUrl is required");
    return;
}

    const insertId = await PhotoServices.createPhoto({ 
        photoUrl, description });

res.status(201).send({ insertId });
});

photoRouter.patch('/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    const {likes} = req.body

    if(!likes){
        res.status(400).send("Likes are required.")
    }

    const photo = await PhotoServices.updateLikes(id, likes)

    res.status(200).json(photo)
})