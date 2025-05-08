import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddMemberPage from './pages/AddMemberPage';
import ViewMembersPage from './pages/ViewMembersPage';
import MemberDetailsPage from './pages/MemberDetailsPage';
import { motion } from 'framer-motion';

function App() {
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
  };

  const pageTransition = {
    initial: { opacity: 0, x: -200 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    exit: { opacity: 0, x: 200, transition: { duration: 0.8, ease: 'easeIn' } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-900">
      {/* Navigation Bar */}
      <motion.header
        className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-md sticky top-0 z-50"
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <div className="container mx-auto p-4 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-extrabold tracking-wide">Student Team Hub</h1>

          {/* Navigation Links */}
          <nav className="flex space-x-8 text-lg">
            <Link
              to="/"
              className="hover:text-blue-200 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/add-member"
              className="hover:text-blue-200 transition-colors duration-300"
            >
              Add Member
            </Link>
            <Link
              to="/view-members"
              className="hover:text-blue-200 transition-colors duration-300"
            >
              View Members
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main
        className="container mx-auto p-6"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-member" element={<AddMemberPage />} />
          <Route path="/view-members" element={<ViewMembersPage />} />
          <Route path="/member/:id" element={<MemberDetailsPage />} />
        </Routes>
      </motion.main>
    </div>
  );
}

export default App;
