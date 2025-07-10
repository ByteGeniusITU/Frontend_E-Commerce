import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="text-center my-3">
        <img
          src={user.picture}
          alt={user.name}
          className="rounded-circle mb-2"
          style={{ width: 80 }}
        />
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;