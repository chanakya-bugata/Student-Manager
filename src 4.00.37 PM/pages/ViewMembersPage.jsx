import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewMembersPage() {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/members');
        setMembers(response.data);
      } catch (err) {
        setError('Failed to fetch members');
      }
    };
    fetchMembers();
  }, []);

  // Function to delete a member
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await axios.delete(`http://localhost:5001/api/members/${id}`);
        setMembers(members.filter((member) => member._id !== id)); // Remove the member from the UI
      } catch (err) {
        setError('Failed to delete member');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900 py-12 px-6">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white animate-slideInDown">
          Meet Our Team
        </h2>
        <p className="mt-4 text-lg md:text-xl text-purple-200 animate-fadeInUp delay-200">
          Explore the profiles of our talented team members.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-center text-red-400 text-lg mb-8 animate-fadeIn delay-400">
          {error}
        </p>
      )}

      {/* Members Grid */}
      <div className="max-w-7xl mx-auto">
        {members.length === 0 ? (
          <p className="text-center text-purple-200 text-lg animate-fadeInUp delay-600">
            No members found. Add some members to get started!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <div
                key={member._id}
                className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-purple-500/50 animate-fadeInUp"
                style={{ animationDelay: `${400 + index * 150}ms` }}
              >
                <img
                  src={
                    member.image
                      ? `http://localhost:5001/uploads/${member.image}`
                      : 'https://via.placeholder.com/300?text=No+Image'
                  }
                  alt={member.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-purple-200 text-lg mb-4">{member.role}</p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/member/${member._id}`}
                    className="block text-center bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600 hover:scale-110 transform transition-all duration-300"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={() => handleDelete(member._id)} // Call delete handler
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewMembersPage;
