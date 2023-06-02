const express = require('express')
const router = express.Router()
const Rota  = require('../models/rota')

router.post('/', async(req, res) => {
    try{
        const rota = await new Rota(req.body).save()
        res.json({rota})
    }catch (err){
        res.json({error:true, message:err.message})
    }
})

router.get('/:id', async(req, res) => {
    try{
        const rota = await Rota.findById(req.params.id)
        res.json({rota})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

router.get('/', async(req, res) => {
    try{
        const rota = await Rota.find()
        res.json({error:false, rota:rota})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

router.put('/:id', async(req, res) =>{
    try{
        await Rota.findByIdAndUpdate(req.params.id, req.body)
        let upRota = await Rota.findById(req.params.id)
        res.json({error:false, upd:upRota})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

router.delete('/:id', async(req, res) =>{
    try{
        await Rota.findByIdAndDelete(req.params.id)
        res.json({error:false})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

router.post('/filter', async(req, res) =>{
    try{
        const rota = await Rota.find(req.body)
        res.json({rota})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

module.exports = router