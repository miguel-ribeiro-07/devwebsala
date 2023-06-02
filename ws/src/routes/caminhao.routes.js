const express = require('express')
const router = express.Router()
const Caminhao  = require('../models/caminhao')

router.post('/', async(req, res) => {
    try{
        const caminhao = await new Caminhao(req.body).save()
        res.json({caminhao})
    }catch (err){
        res.json({error:true, message:err.message})
    }
})

router.get('/:id', async(req, res) => {
    try{
        const caminhao = await Caminhao.findById(req.params.id)
        res.json({caminhao})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

router.get('/', async(req, res) => {
    try{
        const caminhao = await Caminhao.find()
        res.json({error:false, caminhoes:caminhao})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

router.put('/:id', async(req, res) =>{
    try{
        await Caminhao.findByIdAndUpdate(req.params.id, req.body)
        let upCaminhao = await Caminhao.findById(req.params.id)
        res.json({error:false, upd:upCaminhao})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

router.delete('/:id', async(req, res) =>{
    try{
        await Caminhao.findByIdAndDelete(req.params.id)
        res.json({error:false})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

router.post('/filter', async(req, res) =>{
    try{
        const caminhao = await Caminhao.find(req.body)
        res.json({caminhao})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

module.exports = router