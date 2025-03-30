import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PhotoForm from "../PhotoForm/PhotoForm";
import "./UploadPage.css";

export default function UploadPage() {
    const user = useSelector(state => state.session.user);

    if (!user) {
        return (
            <div className="upload-page-container">
                <div className="login-required">
                    <h2>Login Required</h2>
                    <p>You need to be logged in to upload photos.</p>
                    <div className="login-buttons">
                        <Link to="/login" className="login-button">Log In</Link>
                        <Link to="/signup" className="signup-button">Sign Up</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="upload-page-container">
            <div className="upload-header">
                <h1>Upload Your Photos</h1>
                <p>Share your best shots with the Shutr community</p>
            </div>

            <div className="upload-form-container">
                <PhotoForm 
                    formType="create" 
                    onSuccess={() => {
                        // Redirect to photos page after successful upload
                        window.location.href = "/photos";
                    }} 
                />
            </div>

            <div className="upload-tips">
                <h3>Tips for Great Uploads</h3>
                <ul>
                    <li>Use high-resolution images for best quality</li>
                    <li>Add descriptive captions to help others find your work</li>
                    <li>Make sure you have the rights to share the images you upload</li>
                </ul>
                <Link to="/photos" className="view-photos-link">View all photos</Link>
            </div>
        </div>
    );
}