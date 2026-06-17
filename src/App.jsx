/**
 * App.jsx — TD Nutrition
 * Raíz de la aplicación con providers, rutas y layout global
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider }  from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider }  from './context/AuthContext';

import Navbar         from './components/Navbar/Navbar';
import Footer         from './components/Footer/Footer';
import ToastContainer from './components/Toast/Toast';
import ScrollToTop    from './components/ScrollToTop/ScrollToTop';

import Home     from './pages/Home/Home';
import Products from './pages/Products/Products';
import About    from './pages/About/About';
import Contact  from './pages/Contact/Contact';
import Login    from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <BrowserRouter>
              {/* ── Global UI ── */}
              <Navbar />
              <ToastContainer />
              <ScrollToTop />

              {/* ── Page Routes ── */}
              <Routes>
                <Route path="/"         element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about"    element={<About />} />
                <Route path="/contact"  element={<Contact />} />
                <Route path="/login"    element={<Login />} />
                <Route path="*"         element={<NotFound />} />
              </Routes>

              {/* ── Footer (no se muestra en login) ── */}
              <Footer />
            </BrowserRouter>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
