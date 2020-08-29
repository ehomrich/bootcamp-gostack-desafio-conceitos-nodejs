const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => response.json(repositories));

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(repository);

  return response.json(repository);
});

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const index = repositories.findIndex(repository => repository.id === id);

  if (index < 0) {
    return response.status(404).json({ error: "Repository not found." });
  }

  const repository = { ...repositories[index], title, url, techs };
  repositories[index] = repository;

  return response.json(repository);
});

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex(repository => repository.id === id);

  if (index < 0) {
    return response.status(404).json({ error: "Repository not found." });
  }

  const repository = repositories[index];
  repositories.splice(index, 1);

  return response.json(repository);
});

app.post('/repositories/:id/like', (request, response) => {
  // TODO
});

module.exports = app;
