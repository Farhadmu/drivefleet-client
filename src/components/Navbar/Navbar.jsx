import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { MdDirectionsCar } from "react-icons/md";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
      setDropdownOpen(false);
      setMenuOpen(false);
    } catch {
      toast.error("Failed to logout");
    }
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold uppercase tracking-widest transition-colors duration-200 ${
      isActive ? "text-primary" : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-dark/95 backdrop-blur border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-primary flex items-center justify-center">
              <MdDirectionsCar className="text-white text-xl" />
            </div>
            <span className="font-heading text-2xl text-white tracking-widest group-hover:text-primary transition-colors">
              DRIVEFLEET
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            <NavLink to="/explore-cars" className={navLinkClass}>Explore Cars</NavLink>
            {user && (
              <NavLink to="/add-car" className={navLinkClass}>Add Car</NavLink>
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=E63946&color=fff`}
                    alt={user.displayName}
                    className="w-9 h-9 rounded-full border-2 border-primary object-cover"
                  />
                  <FiChevronDown className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-12 w-52 bg-dark-card border border-dark-border rounded-lg shadow-xl overflow-hidden animate-fade-in">
                    <div className="px-4 py-3 border-b border-dark-border">
                      <p className="text-white font-semibold text-sm truncate">{user.displayName}</p>
                      <p className="text-gray-400 text-xs truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/my-bookings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:bg-dark hover:text-white text-sm transition-colors"
                    >
                      My Bookings
                    </Link>
                    <Link
                      to="/my-added-cars"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:bg-dark hover:text-white text-sm transition-colors"
                    >
                      My Added Cars
                    </Link>
                    <Link
                      to="/add-car"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:bg-dark hover:text-white text-sm transition-colors"
                    >
                      Add Car
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-primary hover:bg-dark text-sm font-semibold transition-colors border-t border-dark-border"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm px-5 py-2.5">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-card border-t border-dark-border animate-slide-up">
          <div className="px-4 py-4 flex flex-col gap-4">
            <NavLink to="/" end className={navLinkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/explore-cars" className={navLinkClass} onClick={() => setMenuOpen(false)}>Explore Cars</NavLink>
            {user ? (
              <>
                <NavLink to="/add-car" className={navLinkClass} onClick={() => setMenuOpen(false)}>Add Car</NavLink>
                <NavLink to="/my-bookings" className={navLinkClass} onClick={() => setMenuOpen(false)}>My Bookings</NavLink>
                <NavLink to="/my-added-cars" className={navLinkClass} onClick={() => setMenuOpen(false)}>My Added Cars</NavLink>
                <div className="flex items-center gap-3 pt-2 border-t border-dark-border">
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=E63946&color=fff`}
                    className="w-8 h-8 rounded-full border border-primary"
                    alt=""
                  />
                  <span className="text-gray-300 text-sm truncate">{user.displayName}</span>
                </div>
                <button onClick={handleLogout} className="btn-primary w-full text-center">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary text-center" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
