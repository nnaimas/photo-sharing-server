import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchModel('/user/list');
        setUsers(data);
      } catch (err) {
        setError('Error loading users');
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="user-list">
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <Link to={`/users/${user._id}`}>
              {user.first_name} {user.last_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList; 