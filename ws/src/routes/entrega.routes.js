const express = require('express')
const router = express.Router()
const Entrega  = require('../models/entrega')

router.post('/', async(req, res) => {
    try{
        const entrega = await new Entrega(req.body).save()
        res.json({entrega})
    }catch (err){
        res.json({error:true, message:err.message})
    }
})

router.get('/:id', async(req, res) => {
    try{
        const entrega = await Entrega.findById(req.params.id)
        res.json({entrega})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

router.get('/', async(req, res) => {
    try{
        const entrega = await Entrega.find()
        res.json({error:false, entregas:entrega})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

router.put('/:id', async(req, res) =>{
    try{
        await Entrega.findByIdAndUpdate(req.params.id, req.body)
        let upEntrega = await Entrega.findById(req.params.id)
        res.json({error:false, upd:upEntrega})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

router.delete('/:id', async(req, res) =>{
    try{
        await Entrega.findByIdAndDelete(req.params.id)
        res.json({error:false})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

module.exports = router