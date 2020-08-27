const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;

  const repositorie = {
    id: uuid(),
    title, 
    url, 
    techs,
    likes: 0,
  };

  repositories.push(repositorie);

  return response.json(repositorie);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const findRepositoriyIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(findRepositoriyIndex === -1) {
    return response.status(400).json({ error: 'Repository does not exist.'});
  }

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes: repositories[findRepositoriyIndex].likes,
  }

  repositories[findRepositoriyIndex] = repositorie;

  return response.json(repositorie);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieIndex >= 0) {
    repositorie.splice(repositorieIndex, 1);
  } else {
    return response.status(400).json({ error: 'Repository does not exist.' })
  }
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(findRepositoriyIndex === -1) {
    return response.status(400).json({ error: 'Repository does not exist.'});
  }

  repositories[findRepositoriyIndex].likes += 1;

  return response.json(repositories[findRepositoriyIndex]);

});

module.exports = app;
