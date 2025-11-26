import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Context
import { AuthProvider, AuthContext } from './components/context/AuthContext';

// Common Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Background from './components/common/Background';

// Auth Components
import AdminLogin from './components/Auth/AdminLogin';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

// Admin Components
import AdminDashboard from './components/Admin/AdminDashboard';
import AllocateResources from './components/Admin/AllocateResources';
import ManageStaff from './components/Admin/ManageStaff';
import PostAppointments from './components/Admin/PostAppointments';
import ViewAppointments from './components/Admin/ViewAppointments';
import ManageDoctors from './components/Admin/ManageDoctors';


// Doctor Components
import DoctorDashboard from './components/Doctors/DoctorDashboard';
import ManagePrescriptions from './components/Doctors/ManagePrescriptions';
import ScheduleConsultation from './components/Doctors/ScheduleConsultation';
import DoctorsSection from './components/Doctors/DoctorsSection';

// Patient Components
import UserProfile from './components/Patient/UserProfile';
import BookAppointment from './components/Patient/BookAppointment';
import Payment from './components/Patient/Payment';
import ViewBooking from './components/Patient/ViewBooking';

// Pages
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';

// Protected Route using AuthContext
// Protected Route using AuthContext (Debug Mode)
const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  console.log("🔐 ProtectedRoute Check:");
  console.log("User:", user);

  if (!user) {
    console.warn("🚫 Access Denied — No user found. Redirecting to /login");
    return <Navigate to="/login" />;
  }

  console.log("✅ Access Granted for role:", user.role);
  return element;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          {/* Optional Background */}
          {/* <Background /> */}

          <Header />

          <main className="app-main-content">
            <Routes>
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/home" />} />

              {/* Public Routes */}
              <Route path="/home" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/doctors" element={<DoctorsSection />} />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={<ProtectedRoute element={<AdminDashboard />} />}
              />
              <Route
                path="/admin/allocate-resources"
                element={<ProtectedRoute element={<AllocateResources />} />}
              />
              <Route
                path="/admin/manage-staff"
                element={<ProtectedRoute element={<ManageStaff />} />}
              />
              <Route
                path="/admin/post-appointments"
                element={<ProtectedRoute element={<PostAppointments />} />}
              />
              <Route
                path="/admin/view-appointments"
                element={<ProtectedRoute element={<ViewAppointments />} />}
              />
              <Route 
                path="/admin/manage-doctors" 
                element={<ProtectedRoute element={<ManageDoctors />} />} 
              />


              {/* Doctor Routes */}
              <Route
                path="/doctor/dashboard"
                element={<ProtectedRoute element={<DoctorDashboard />} />}
              />
              <Route
                path="/doctor/manage-prescriptions"
                element={<ProtectedRoute element={<ManagePrescriptions />} />}
              />
              <Route
                path="/doctor/schedule-consultation"
                element={<ProtectedRoute element={<ScheduleConsultation />} />}
              />

              {/* Patient Routes */}
              <Route
                path="/user-profile"
                element={<ProtectedRoute element={<UserProfile />} />}
              />
              <Route
                path="/book-appointment"
                element={<ProtectedRoute element={<BookAppointment />} />}
              />
              <Route
                path="/payment"
                element={<ProtectedRoute element={<Payment />} />}
              />
              <Route
                path="/view-booking"
                element={<ProtectedRoute element={<ViewBooking />} />}
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
