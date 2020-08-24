const express = require("express");
const { uuid, isUuid } = require('uuidv4');
const cors = require("cors");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const {id, title, url, techs, likes } = request.query;

  const results = title
    ? repositories.filter(repository => repository.title.includes(title))
    : repositories

    console.log('[GET] Listed');
  return response.json(results);
});

app.post("/repositories", (request, response) => {
  const {title, techs} = request.body;
  const url = "https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs"

  const likes = 0;

  const repository = { id: uuid(), title, url, techs, likes }

  repositories.push(repository);

  console.log('[POST] Included');

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
        
    return response.status(400).json({Error: 'Repository not found'})
  }

  const likes = repositories[repositoryIndex].likes;

  const newData = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repositoryIndex] = newData;

  console.log('[PUT] Updated');

  return response.json(newData);

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
        
    return response.status(400).json({error: 'Repository not found'})
  }

  repositories.splice(repositoryIndex, 1);

  console.log('[Delete] Deleted');

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
 
  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
        
    return response.status(400).json({error: 'Repository not found'})
  }

  repositories[repositoryIndex].likes += 1;

  console.log('[POST] Like Added');
  
  return response.send(repositories[repositoryIndex]);
  
});

module.exports = app;
