const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

//GEt posts
router.get('/', async (req, res) => {
    const post = await loadTasksCollection()
    res.send(await post.find({}).toArray())
})

//Add Post
router.post('/', async (req,res) => {
    const post = await loadTasksCollection()
    await post.insertOne({
        task: req.body.task,
        dateCreated: new Date()
    })
    res.status(201).send()
})

//Delete Post
router.delete('/:id', async (req, res) => {
    const post = await loadTasksCollection()
    await post.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
    res.status(200).send()
})

async function loadTasksCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://doung-ratanaksambat:1234@cluster0.0v6vk.mongodb.net/doung-ratanaksambat?retryWrites=true&w=majority',
    {  
        useNewUrlParser: true
    })

    return client.db('doung-ratanaksambat').collection('mytasks')
}



module.exports = router