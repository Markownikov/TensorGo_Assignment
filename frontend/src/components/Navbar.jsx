import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, loading, login, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-xl font-bold">
          Tensor Go
        </a>
        <div className="flex items-center space-x-4">
          {loading ? (
            <span className="text-gray-300">Loading...</span>
          ) : user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {user.profilePicture && (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-white">{user.displayName}</span>
              </div>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={login}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300 flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
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
              Sign in with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
