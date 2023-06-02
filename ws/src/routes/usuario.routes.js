const express = require('express')
const router = express.Router()
const Usuario = require('../models/usuario')

router.post('/', async(req, res) => {
    try{
        const usuario = await new Usuario(req.body).save()
        res.json({usuario})
    }catch (err){
        res.json({error:true, message:err.message})
    }
})

router.get('/:id', async(req, res) => {
    try{
        const usuario = await Usuario.findById(req.params.id)
        res.json({usuario})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

router.get('/', async(req, res) => {
    try{
        const usuario = await Usuario.find()
        res.json({error:false, usuario:usuario})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

router.put('/:id', async(req, res) =>{
    try{
        await Usuario.findByIdAndUpdate(req.params.id, req.body)
        let upUsuario = await Usuario.findById(req.params.id)
        res.json({error:false, usuario:upUsuario})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

router.delete('/:id', async(req, res) =>{
    try{
        await Usuario.findByIdAndDelete(req.params.id)
        res.json({error:false})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

router.post('/filter', async(req, res) =>{
    try{
        const usuario = await Usuario.find(req.body)
        res.json(usuario)
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

module.exports = router