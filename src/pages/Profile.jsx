import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's current details from the API
    axios.get('http://localhost:8000/profile-user')  // Replace with your actual endpoint
      .then(response => {
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhoneNumber(response.data.phone_number);
        setAddress(response.data.shipping_address); // Assuming address data is here
      })
      .catch(error => {
        console.error("There was an error fetching the user data", error);
      });
  }, []);

  const handleProfileUpdate = async () => {
    try {
      const res = await axios.put('http://localhost:8000/user', {
        name,
        email,
        phone_number: phoneNumber,
        shipping_address: address, // Include the address when updating
      });
      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error("There was an error updating the profile", error);
      alert('Failed to update profile!');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/reset-password', {
        oldPassword,
        newPassword,
      });
      alert(res.data.message || 'Password updated successfully');
    } catch (error) {
      alert(error.response?.data?.message || 'Password change failed');
    }
  };

  return (
    <div className="profile-page">
      {user ? (
        <div className="profile-container">
          <div className="profile-header">
            <h2>Your Profile</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="edit-button"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>

          <div className="profile-info">
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label>Phone Number:</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="shipping-address">
            <h3>Shipping Address</h3>
            <div>
              <label>Street:</label>
              <input
                type="text"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label>City:</label>
              <input
                type="text"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label>State:</label>
              <input
                type="text"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label>Zip Code:</label>
              <input
                type="text"
                value={address.zip}
                onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          {isEditing && (
            <div className="actions">
              <button onClick={handleProfileUpdate} className="save-button">
                Save Changes
              </button>
            </div>
          )}

          <div className="password-change">
            <h3>Change Password</h3>
            <form onSubmit={handlePasswordChange}>
              <div>
                <label>Old Password:</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>New Password:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="change-password-button">
                Change Password
              </button>
            </form>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
