import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData';

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchModel(`/user/${userId}`);
        setUser(data);
      } catch (err) {
        setError('Error loading user details');
        console.error(err);
      }
    };

    fetchUser();
  }, [userId]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-detail">
      <h2>{user.first_name} {user.last_name}</h2>
      <div className="user-info">
        <p><strong>Location:</strong> {user.location}</p>
        <p><strong>Occupation:</strong> {user.occupation}</p>
        <p><strong>Description:</strong> {user.description}</p>
      </div>
    </div>
  );
};

export default UserDetail; 