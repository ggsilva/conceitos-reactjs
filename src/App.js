import React, { useState, useEffect } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  const getRepositories = () => {
    api.get('repositories')
      .then(response => {
        setRepositories(response.data);
      });
  };

  useEffect(getRepositories, []);

  const handleAddRepository = async () => {
    const response = await api.post('repositories', {
      url: 'https://github.com/josepholiveira',
      title: 'Desafio ReactJS',
      techs: ['React', 'Node.js'],
    });

    setRepositories([...repositories, response.data]);
  }

  const handleRemoveRepository = async (id) => {
    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(r => {
      return r.id !== id
    }));
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
