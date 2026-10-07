import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';

import Contact from './pages/Contact';
import BookAppointment from './pages/BookAppointment';
import SplashScreen from './components/SplashScreen';

// Admin Imports
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminPatients from './pages/admin/AdminPatients';
import AdminServices from './pages/admin/AdminServices';
import AdminReviews from './pages/admin/AdminReviews';
import AdminReminders from './pages/admin/AdminReminders';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <SplashScreen />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="contact" element={<Contact />} />
            <Route path="book-appointment" element={<BookAppointment />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="patients" element={<AdminPatients />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="reminders" element={<AdminReminders />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
