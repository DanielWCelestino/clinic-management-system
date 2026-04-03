import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const app = express()
app.use(express.json())


app.delete('/pacientes/:id', async (req, res) => {
    await prisma.patient.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(204).send
})


app.put('/pacientes/:id', async (req, res) => {
    try {
        await prisma.patient.update({
            where: {
                id: req.params.id
            },
            data: {
                nome: req.body.nome,
                telefone: req.body.telefone,
                idade: req.body.idade,
                email: req.body.email,
                observacoes: req.body.observacoes
            }
        })


        res.status(200).json(req.body)
    }
    catch (error) {
        res.status(400).json({ message: 'paciente não encontrado' })
    }
})


app.post('/pacientes', async (req, res) => {
    try {
        const paciente = await prisma.patient.create({
            data: {
                nome: req.body.nome,
                telefone: req.body.telefone,
                idade: req.body.idade,
                email: req.body.email,
                observacoes: req.body.observacoes
            }
        })
        res.status(201).json(paciente)
    } catch (error) {
        res.status(400).json({ message: 'paciente não encontrado' })
     }

})


app.get('/pacientes', async (req, res) => {

    const patiente = await prisma.patient.findMany()

    res.status(201).json(patiente)
})


app.listen(3000)