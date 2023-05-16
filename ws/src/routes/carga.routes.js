const express = require('express')
const router = express.Router()
const Carga  = require('../models/carga')

router.post('/', async(req, res) => {
    try{
        const carga = await new Carga(req.body).save()
        res.json({carga})
    }catch (err){
        res.json({error:true, message:err.message})
    }
})

router.get('/:id', async(req, res) => {
    try{
        const carga = await Carga.findById(req.params.id)
        res.json({carga})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

router.get('/', async(req, res) => {
    try{
        const carga = await Carga.find()
        res.json({error:false, carga:carga})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

router.put('/:id', async(req, res) =>{
    try{
        await Carga.findByIdAndUpdate(req.params.id, req.body)
        let upCarga = await Caminhao.findById(req.params.id)
        res.json({error:false, upd:upCarga})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

router.delete('/:id', async(req, res) =>{
    try{
        await Carga.findByIdAndDelete(req.params.id)
        res.json({error:false})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

module.exports = router