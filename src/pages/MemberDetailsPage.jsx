import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function MemberDetailsPage() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/members/${id}`);
        setMember(response.data);
      } catch (err) {
        setError('Failed to fetch member details');
      }
    };
    fetchMember();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-2xl font-semibold mb-6 animate-bounce">
            {error}
          </p>
          <Link
            to="/view-members"
            className="inline-block bg-red-600 text-white text-lg px-6 py-3 rounded-full hover:bg-red-700 transition-transform transform hover:scale-105 shadow-lg"
          >
            Back to Members
          </Link>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900 flex items-center justify-center">
        <p className="text-white text-xl animate-pulse">Loading member details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900 py-12 px-6">
      {/* Back Link */}
      <div className="max-w-5xl mx-auto mb-8">
        <Link
          to="/view-members"
          className="inline-block text-purple-300 hover:text-white transition-all duration-300 text-lg"
        >
          ← Back to Members
        </Link>
      </div>

      {/* Member Details Card */}
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-purple-500/50">
        <h2 className="text-4xl font-bold text-white text-center mb-6">
          {member.name}
        </h2>

        {/* Member Image */}
        <div className="flex justify-center mb-6">
          <img
            src={
              member.image
                ? `http://localhost:5001/uploads/${member.image}`
                : 'https://via.placeholder.com/300?text=No+Image'
            }
            alt={`Profile of ${member.name}`}
            className="w-48 h-48 object-cover rounded-full border-4 border-purple-300 shadow-lg"
          />
        </div>

        {/* Member Details */}
        <div className="text-center space-y-6">
          <p className="text-xl text-purple-200">
            <span className="font-semibold text-white">Role:</span> {member.role}
          </p>
          <p className="text-xl text-purple-200">
            <span className="font-semibold text-white">Email:</span> {member.email}
          </p>
          <p className="text-xl text-purple-200">
            <span className="font-semibold text-white">Registration No:</span> {member.registrationNo}
          </p>
          <p className="text-xl text-purple-200">
            <span className="font-semibold text-white">Joined:</span>{' '}
            {new Date(member.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MemberDetailsPage;
