// src/components/PhotoList/PhotoList.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from '../../redux/photos';

function PhotoList() {
  const dispatch = useDispatch();
  const photos = useSelector((state) => Object.values(state.photos));

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  if (!photos.length) return <div>No photos yet</div>;

  return (
    <div>
      {photos.map((photo) => (
        <div key={photo.id}>
          <img src={photo.image_url} alt="user-upload" />
          <p>{photo.caption}</p>
        </div>
      ))}
    </div>
  );
}

export default PhotoList;
