import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createAlbum } from '../../redux/albums';

export default function CreateAlbumModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!name.trim()) {
            setErrors({ name: 'Album name is required' });
            return;
        }

        try {
            const result = await dispatch(createAlbum({ title: name, description }));
            if (result.errors) {
                setErrors({ form: result.errors.join(', ') });
            } else {
                closeModal();
            }
        } catch (error) {
            setErrors({ form: error.message || 'Failed to create album' });
        }
    };

    return (
        <div className="album-modal">
            <h2>Create New Album</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Album Name *</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter album name"
                        maxLength={50}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add a description for your album"
                        rows={4}
                        maxLength={500}
                    />
                </div>

                {errors.form && <div className="error-message">{errors.form}</div>}

                <div className="form-actions">
                    <button type="button" onClick={closeModal} className="cancel-button">
                        Cancel
                    </button>
                    <button type="submit" className="submit-button">
                        Create Album
                    </button>
                </div>
            </form>
        </div>
    );
}
