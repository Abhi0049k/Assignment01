const axios = require('axios');
const express = require('express');
const connection = require('./configs/db');
const { repoModel } = require('./models/repo.model');
require('dotenv').config();
const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send({msg: "Welcome"})
})

app.post('/github', async(req, res)=>{
    try{
        const {url} = req.body;
        const result = await axios.get(url);
        for(let repo of result.data){
            const owner = {
                id: repo.owner.id,
                avatar_url: repo.owner.avatar_url,
                html_url: repo.owner.html_url,
                type: repo.owner.type,
                site_admin: repo.owner.site_admin
            }
            const newRepo = await repoModel({id: repo.id, name: repo.name, html_url: repo.html_url, description: repo.description, created_at: repo.created_at, open_issues: repo.open_issues, watchers: repo.watchers, owner});
            await newRepo.save();
        }
        res.status(200).send({msg: 'Done'});
    }catch(err){
        console.log(err);
        res.status(500).send({msg: err.message});
    }
})

app.get('/github/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const repo = await repoModel.findOne({id});
        res.status(200).send(repo);
    }catch(err){
        console.log(err);
        res.status(500).send({msg: err.message});
    }
})

app.listen(process.env.PORT, ()=>{
    connection();
    console.log(`App is running on port: ${process.env.PORT}`);
});