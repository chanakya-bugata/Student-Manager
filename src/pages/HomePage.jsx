import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, when: 'beforeChildren' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-700 via-purple-700 to-pink-600 relative overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm">
        <div className="absolute inset-0 particle-bg"></div>
      </div>

      {/* Header Section */}
      <motion.div
        className="relative z-10 mb-16 pt-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-pink-300">
          Student Team Hub
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-teal-100 text-center">
          Collaborate, manage, and grow your student team with ease.
        </p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto p-6 md:p-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl hover:shadow-pink-500/50 transform transition duration-500"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-center" variants={itemVariants}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
            Welcome to Our Team!
          </h2>
          <p className="text-lg md:text-xl text-teal-200 mb-10 max-w-2xl mx-auto">
            Manage your student team members efficiently. Add new members, view the team, or check individual details with just a few clicks.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          variants={itemVariants}
        >
          <Link
            to="/add-member"
            className="inline-block bg-teal-500 text-white px-8 py-4 rounded-xl shadow-md hover:bg-teal-600 hover:shadow-[0_0_15px_rgba(20,184,166,0.7)] transform transition-all duration-300 ease-out"
          >
            Add Member
          </Link>
          <Link
            to="/view-members"
            className="inline-block bg-purple-500 text-white px-8 py-4 rounded-xl shadow-md hover:bg-purple-600 hover:shadow-[0_0_15px_rgba(139,92,246,0.7)] transform transition-all duration-300 ease-out"
          >
            View Members
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="relative z-10 mt-16 text-center text-sm text-teal-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        © 2025 Student Team Hub. All rights reserved.
      </motion.footer>
    </div>
  );
}

export default HomePage;
