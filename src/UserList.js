import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [listOfUser, setListOfUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setListOfUser(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      });
  }, []);

  // Filtrer la liste en fonction du terme de recherche (nom)
  const filteredUsers = listOfUser.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2>Liste des utilisateurs</h2>

      {/* Input recherche */}
      <input
        type="text"
        placeholder="Rechercher un utilisateur..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={styles.input}
      />

      <ul style={styles.list}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <li key={user.id} style={styles.listItem}>
              <strong>{user.name}</strong> — {user.email}
            </li>
          ))
        ) : (
          <li>Aucun utilisateur trouvé.</li>
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    padding: '0.5rem',
    borderBottom: '1px solid #ccc',
  },
};

export default UserList;
