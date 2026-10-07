import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>
      {isHome && (
        <div className="w-full overflow-hidden leading-none">
          <iframe 
            src="/footer_banner.html" 
            title="Footer Banner"
            className="w-full border-none m-0 p-0 block"
            style={{ aspectRatio: '2048/768' }}
            scrolling="no"
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MainLayout;
