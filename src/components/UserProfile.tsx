import React from "react";
import { useDispatch } from "react-redux";
import { setName, setEmail } from "../store/slices/userSlice";

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();

  const updateUserInfo = () => {
    dispatch(setName("John Doe"));
    dispatch(setEmail("john.doe@example.com"));
  };

  return (
    <div>
      <h2>User Profile</h2>
      <button onClick={updateUserInfo}>Update User Info</button>
    </div>
  );
};

export default UserProfile;
