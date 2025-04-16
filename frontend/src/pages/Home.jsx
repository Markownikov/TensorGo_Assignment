import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-12 px-4">
        {user ? (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Welcome, {user.displayName}!
            </h1>
            <div className="flex items-center space-x-6 mb-8">
              {user.profilePicture && (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-4 border-blue-600"
                />
              )}
              <div>
                <p className="text-lg">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Name:</span> {user.firstName}{" "}
                  {user.lastName}
                </p>
                <p className="text-gray-500 text-sm">
                  Account created:{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">
                Your Account Details
              </h2>
              <p className="text-blue-700">
                You're successfully logged in with Google. You now have access
                to all features of Tensor Go.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              Welcome to Tensor Go
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Sign in with your Google account to access all features and
              personalized content.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex flex-col items-center">
                <svg
                  className="w-16 h-16 mb-4"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.8,10.4l-8-2.3c-0.2-0.1-0.4-0.1-0.7,0l-8,2.3C4.5,10.5,4,11.2,4,11.9v8.3c0,0.8,0.5,1.5,1.2,1.7l8,2.3 c0.1,0,0.2,0.1,0.3,0.1c0.1,0,0.2,0,0.3-0.1l8-2.3c0.7-0.2,1.2-0.9,1.2-1.7v-8.3C23,11.2,22.5,10.5,21.8,10.4z"
                    fill="#4285F4"
                  />
                  <path
                    d="M9.9,15.7v2.5l3.9,2.5l3.9-2.5v-2.5l-3.9,1.7L9.9,15.7z"
                    fill="#FFFFFF"
                  />
                  <path
                    d="M9.9,13.2v2.5l3.9,1.7l3.9-1.7v-2.5l-3.9-1.7L9.9,13.2z"
                    fill="#FFFFFF"
                  />
                  <path d="M13.8,14.9L13.8,14.9L13.8,14.9z" fill="#A1A1A1" />
                  <path
                    d="M9.9,13.2l3.9,1.7l3.9-1.7l-3.9-2.5L9.9,13.2z"
                    fill="#FFFFFF"
                  />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Login Required
                </h2>
                <p className="text-gray-600 mb-6">
                  Please sign in with Google to access your account and
                  features.
                </p>
                <button
                  onClick={() =>
                    (window.location.href = "http://localhost:8000/auth/google")
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition duration-300 flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.6644 10.2045H12V13.8636H17.0727C16.6273 16.0045 14.7136 17.4545 12 17.4545C8.8364 17.4545 6.27273 14.8909 6.27273 11.7273C6.27273 8.56364 8.8364 6 12 6C13.5091 6 14.8909 6.56364 15.9273 7.47273L18.6391 4.76364C16.9727 3.23182 14.6182 2.27273 12 2.27273C6.81818 2.27273 2.58182 6.50909 2.58182 11.7273C2.58182 16.9455 6.81818 21.1818 12 21.1818C16.8 21.1818 21 17.7273 21 11.7273C21 11.2364 20.8909 10.7182 20.6644 10.2045Z"
                      fill="white"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
