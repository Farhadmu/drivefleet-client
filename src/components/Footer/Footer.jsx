import { Link } from "react-router-dom";
import { MdDirectionsCar, MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaXTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-dark-card border-t border-dark-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary flex items-center justify-center">
                <MdDirectionsCar className="text-white" />
              </div>
              <span className="font-heading text-xl text-white tracking-widest">DRIVEFLEET</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium car rentals made simple. Your journey starts here with DriveFleet.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 bg-dark border border-dark-border flex items-center justify-center text-gray-400 hover:text-white hover:border-primary transition-all duration-200">
                <FaXTwitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-dark border border-dark-border flex items-center justify-center text-gray-400 hover:text-white hover:border-primary transition-all duration-200">
                <FaFacebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-dark border border-dark-border flex items-center justify-center text-gray-400 hover:text-white hover:border-primary transition-all duration-200">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-dark border border-dark-border flex items-center justify-center text-gray-400 hover:text-white hover:border-primary transition-all duration-200">
                <FaLinkedin size={16} />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-heading text-lg text-white tracking-wider mb-4">USEFUL LINKS</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "Explore Cars", path: "/explore-cars" },
                { label: "Add a Car", path: "/add-car" },
                { label: "My Bookings", path: "/my-bookings" },
                { label: "My Added Cars", path: "/my-added-cars" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary text-sm transition-colors duration-200 flex items-center gap-1"
                  >
                    <span className="text-primary">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Car Types */}
          <div>
            <h3 className="font-heading text-lg text-white tracking-wider mb-4">CAR TYPES</h3>
            <ul className="space-y-2">
              {["SUV", "Sedan", "Hatchback", "Luxury", "Convertible", "Electric"].map((type) => (
                <li key={type}>
                  <Link
                    to={`/explore-cars?type=${type}`}
                    className="text-gray-400 hover:text-primary text-sm transition-colors duration-200 flex items-center gap-1"
                  >
                    <span className="text-primary">›</span> {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg text-white tracking-wider mb-4">CONTACT US</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MdLocationOn className="text-primary mt-0.5 flex-shrink-0" size={18} />
                <span className="text-gray-400 text-sm">123 Fleet Avenue, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <MdPhone className="text-primary flex-shrink-0" size={18} />
                <a href="tel:+8801712345678" className="text-gray-400 hover:text-white text-sm transition-colors">
                  +880 171 234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MdEmail className="text-primary flex-shrink-0" size={18} />
                <a href="mailto:info@drivefleet.com" className="text-gray-400 hover:text-white text-sm transition-colors">
                  info@drivefleet.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DriveFleet. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Built with ❤️ for car enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
