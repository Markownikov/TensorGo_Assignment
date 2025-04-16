import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 px-6 py-8 text-center">
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.displayName}
                className="w-32 h-32 rounded-full border-4 border-white mx-auto mb-4"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-blue-800 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                {user.displayName.charAt(0)}
              </div>
            )}
            <h1 className="text-3xl font-bold text-white">
              {user.displayName}
            </h1>
            <p className="text-blue-100">{user.email}</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Personal Information
                </h2>
                <div className="space-y-3">
                  <p>
                    <span className="font-medium text-gray-600">
                      First Name:
                    </span>{" "}
                    {user.firstName || "Not provided"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">
                      Last Name:
                    </span>{" "}
                    {user.lastName || "Not provided"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">
                      Display Name:
                    </span>{" "}
                    {user.displayName}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Email:</span>{" "}
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Account Information
                </h2>
                <div className="space-y-3">
                  <p>
                    <span className="font-medium text-gray-600">
                      Account ID:
                    </span>{" "}
                    {user._id}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">Created:</span>{" "}
                    {new Date(user.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">
                      Last Updated:
                    </span>{" "}
                    {new Date(user.updatedAt).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium text-gray-600">
                      Authentication Method:
                    </span>{" "}
                    Google
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
