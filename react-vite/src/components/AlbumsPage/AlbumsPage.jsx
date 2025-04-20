import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAlbums } from '../../redux/albums';
import OpenModalButton from '../OpenModalButton';
import CreateAlbumModal from './CreateAlbumModal';
import './AlbumPage.css';

export default function AlbumsPage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const albums = useSelector(state => state.albums.userAlbums || []);

    useEffect(() => {
        if (user) {
            dispatch(getUserAlbums(user.id));
        }
    }, [dispatch, user]);

    return (
        <div className="albums-page">
            <div className="albums-hero">
                <h1>Your Photo Albums</h1>
                <p>Organize and showcase your photos in beautiful collections</p>
                <OpenModalButton
                    buttonText="Create New Album"
                    modalComponent={<CreateAlbumModal />}
                    className="create-album-button"
                />
            </div>

            <div className="albums-container">
                {albums.length > 0 ? (
                    <div className="albums-grid">
                        {albums.map(album => (
                            <div key={album.id} className="album-card">
                                <div className="album-image">
                                    {album.cover_photo_url ? (
                                        <img src={album.cover_photo_url} alt={album.name} />
                                    ) : (
                                        <div className="album-placeholder">
                                            <span className="material-symbols-outlined">photo_album</span>
                                        </div>
                                    )}
                                </div>
                                <div className="album-info">
                                    <h3>{album.name}</h3>
                                    <p>{album.description || 'No description'}</p>
                                    <p className="photo-count">{album.photo_count || 0} photos</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-albums">
                        <div className="empty-albums-icon">
                            <span className="material-symbols-outlined">photo_album</span>
                        </div>
                        <h2>No Albums Yet</h2>
                        <p>Start organizing your photos into collections</p>
                        <OpenModalButton
                            buttonText="Create Your First Album"
                            modalComponent={<CreateAlbumModal />}
                            className="create-album-button"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
