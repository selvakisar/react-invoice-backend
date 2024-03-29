import express from 'express';

import {createInvoice, deleteInvoice, getInvoice, getInvoicesByUser, getTotalCount, updateInvoice} from '../controllers/invoices.js'
const router=express.Router();


router.get('/count',getTotalCount);
router.get('/:id',getInvoice)
router.get('/',getInvoicesByUser)
router.post('/',createInvoice)
router.put('/:id',updateInvoice)
router.delete('/:id',deleteInvoice)


const invoiceRouter=router
export {invoiceRouter}
