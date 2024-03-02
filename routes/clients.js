import express from 'express';
import { createClient, deleteClient, getClientByUser, getClients, updateClient } from '../controllers/clients.js';


const router=express.Router();

router.get('/',getClients)
router.get('/user',getClientByUser)
router.post('/',createClient)
router.put('/:id',updateClient)
router.delete('/:id',deleteClient)

const clientRouter= router
export {clientRouter}