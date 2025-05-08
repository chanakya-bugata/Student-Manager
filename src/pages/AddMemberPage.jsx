import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddMemberPage() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    registrationNo: '',  // Added registrationNo to formData
    image: null,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.email || !formData.registrationNo || !formData.image) {
      setError('All fields are required');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('role', formData.role);
    data.append('email', formData.email);
    data.append('registrationNo', formData.registrationNo);  // Append registrationNo to form data
    data.append('image', formData.image);

    try {
      await axios.post('http://localhost:5001/api/members', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/view-members');
    } catch (err) {
      setError('Failed to add member');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900 flex items-center justify-center px-6 py-12">
      {/* Form Card */}
      <div className="max-w-lg w-full bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-purple-500/50">
        <h2 className="text-4xl font-bold text-white text-center mb-8">
          Add New Member
        </h2>

        {/* Error Message */}
        {error && (
          <p className="text-red-400 text-center mb-6">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-purple-200 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-purple-300 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
              placeholder="Enter member's name"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-purple-200 mb-2">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-purple-300 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
              placeholder="Enter member's role"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-purple-200 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-purple-300 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
              placeholder="Enter member's email"
              required
            />
          </div>

          {/* Registration Number Field */}
          <div>
            <label className="block text-lg font-medium text-purple-200 mb-2">
              Registration No
            </label>
            <input
              type="text"
              name="registrationNo"
              value={formData.registrationNo}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-purple-300 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
              placeholder="Enter member's registration number"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-purple-200 mb-2">
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-purple-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 transition-all duration-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-600 hover:scale-105 transform transition-all duration-300 ease-out"
          >
            Add Member
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMemberPage;
