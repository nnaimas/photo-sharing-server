import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData';

const UserPhotos = () => {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const data = await fetchModel(`/user/photosOfUser/${userId}`);
        setPhotos(data);
      } catch (err) {
        setError('Error loading photos');
        console.error(err);
      }
    };

    fetchPhotos();
  }, [userId]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!photos.length) {
    return <div>No photos found</div>;
  }

  return (
    <div className="user-photos">
      <h2>Photos</h2>
      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo._id} className="photo-card">
            <img 
              src={`/images/${photo.file_name}`} 
              alt={`Photo by user ${photo.user_id}`}
            />
            <div className="photo-info">
              <p>Posted on: {new Date(photo.date_time).toLocaleString()}</p>
              <div className="comments">
                <h3>Comments ({photo.comments.length})</h3>
                {photo.comments.map((comment) => (
                  <div key={comment._id} className="comment">
                    <p>
                      <strong>{comment.user.first_name} {comment.user.last_name}:</strong>
                      {comment.comment}
                    </p>
                    <small>{new Date(comment.date_time).toLocaleString()}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPhotos; 