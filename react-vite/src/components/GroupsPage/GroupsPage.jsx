import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGroupsThunk, joinGroupThunk, leaveGroupThunk } from "../../redux/groups";
import { FaUsers, FaUserPlus, FaUserMinus } from "react-icons/fa";

// Array of different group images
const GROUP_IMAGES = [
    'https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
];
import "./GroupsPage.css";

export default function GroupsPage() {
    // Function to get a consistent image for a group based on its ID
    const getGroupImage = (id) => {
        // Convert id to number and use modulo to get an index
        const index = (typeof id === 'number' ? id : parseInt(id, 10)) % GROUP_IMAGES.length;
        // Use a default index if parsing fails
        return GROUP_IMAGES[index >= 0 ? index : 0];
    };
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const groups = useSelector(state => state.groups.allGroups || []);
    const userGroups = useSelector(state => state.groups.userGroups || []);
    const [activeTab, setActiveTab] = useState('discover');
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [joinedGroups, setJoinedGroups] = useState([]);
    
    // Get user's group IDs for easy checking
    const userGroupIds = [...userGroups.map(group => group.id), ...joinedGroups];
    
    useEffect(() => {
        const loadGroups = async () => {
            setLoading(true);
            await dispatch(fetchGroupsThunk());
            setLoading(false);
        };
        
        if (user) {
            loadGroups();
        }
    }, [dispatch, user]);
    
    const handleJoinGroup = async (groupId, groupName) => {
        if (!user) {
            alert("Please log in to join groups");
            return;
        }
        
        try {
            // Add to local state for immediate UI feedback
            setJoinedGroups(prev => [...prev, groupId]);
            setSuccessMessage(`You've joined ${groupName}!`);
            
            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
            
            // Dispatch the action to Redux
            await dispatch(joinGroupThunk(groupId));
        } catch (error) {
            console.error("Error joining group:", error);
        }
    };
    
    const handleLeaveGroup = async (groupId, groupName) => {
        try {
            // Remove from local state for immediate UI feedback
            setJoinedGroups(prev => prev.filter(id => id !== groupId));
            setSuccessMessage(`You've left ${groupName}`);
            
            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
            
            // Dispatch the action to Redux
            await dispatch(leaveGroupThunk(groupId));
        } catch (error) {
            console.error("Error leaving group:", error);
        }
    };
    
    if (!user) {
        return (
            <div className="groups-page">
                <div className="groups-hero">
                    <div className="groups-hero__content">
                        <h1 className="groups-hero__title">Shutr Groups</h1>
                        <p className="groups-hero__subtitle">Connect with photographers who share your interests</p>
                        <div className="login-prompt">
                            <p>Please log in to view and join groups</p>
                            <Link to="/login" className="login-button">Log In</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="groups-page">
            {/* Hero section */}
            <div className="groups-hero">
                <div className="groups-hero__content">
                    <h1 className="groups-hero__title">Shutr Groups</h1>
                    <p className="groups-hero__subtitle">Connect with photographers who share your interests</p>
                </div>
            </div>
            
            {/* Content section */}
            <div className="groups-content">
                {successMessage && (
                    <div className="success-message">
                        <FaUsers className="message-icon" /> {successMessage}
                    </div>
                )}
                {/* Tabs */}
                <div className="groups-tabs">
                    <button 
                        className={`tab-button ${activeTab === 'discover' ? 'active' : ''}`}
                        onClick={() => setActiveTab('discover')}
                    >
                        Discover Groups
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'my-groups' ? 'active' : ''}`}
                        onClick={() => setActiveTab('my-groups')}
                    >
                        My Groups
                    </button>
                </div>
                
                {/* Loading state */}
                {loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading groups...</p>
                    </div>
                ) : (
                    <>
                        {/* Discover tab content */}
                        {activeTab === 'discover' && (
                            <div className="groups-grid">
                                {groups.length > 0 ? (
                                    groups.map(group => (
                                        <div key={group.id} className="group-card">
                                            <div className="group-image">
                                                <img src={group.image_url || getGroupImage(group.id)} alt={group.name} />
                                            </div>
                                            <div className="group-info">
                                                <h3 className="group-name">{group.name}</h3>
                                                <p className="group-description">{group.description}</p>
                                                <div className="group-meta">
                                                    <span className="group-members">{group.member_count || 0} members</span>
                                                    <span className="group-category">{group.category || 'Photography'}</span>
                                                </div>
                                                {userGroupIds.includes(group.id) ? (
                                                    <button 
                                                        className="leave-group-button"
                                                        onClick={() => handleLeaveGroup(group.id, group.name)}
                                                    >
                                                        <FaUserMinus className="button-icon" />
                                                        <span className="button-text">Leave Group</span>
                                                    </button>
                                                ) : (
                                                    <button 
                                                        className="join-group-button"
                                                        onClick={() => handleJoinGroup(group.id, group.name)}
                                                    >
                                                        <FaUserPlus className="button-icon" />
                                                        <span className="button-text">Join Group</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-state">
                                        <p>No groups available at the moment.</p>
                                        <p>Check back later or create your own group!</p>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {/* My Groups tab content */}
                        {activeTab === 'my-groups' && (
                            <div className="groups-grid">
                                {userGroups.length > 0 ? (
                                    userGroups.map(group => (
                                        <div key={group.id} className="group-card">
                                            <div className="group-image">
                                                <img src={group.image_url || getGroupImage(group.id)} alt={group.name} />
                                            </div>
                                            <div className="group-info">
                                                <h3 className="group-name">{group.name}</h3>
                                                <p className="group-description">{group.description}</p>
                                                <div className="group-meta">
                                                    <span className="group-members">{group.member_count || 0} members</span>
                                                    <span className="group-category">{group.category || 'Photography'}</span>
                                                </div>
                                                <button 
                                                    className="leave-group-button"
                                                    onClick={() => handleLeaveGroup(group.id, group.name)}
                                                >
                                                    <FaUserMinus className="button-icon" />
                                                    <span className="button-text">Leave Group</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-state">
                                        <p>You haven't joined any groups yet.</p>
                                        <button 
                                            className="tab-button"
                                            onClick={() => setActiveTab('discover')}
                                        >
                                            Discover Groups
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
