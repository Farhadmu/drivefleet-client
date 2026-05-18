import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CarCard from "../../components/CarCard/CarCard";
import {
  MdSpeed, MdSecurity, MdSupportAgent, MdVerified,
  MdDirectionsCar, MdLocationOn, MdCardTravel, MdStar
} from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ── Banner ──────────────────────────────────────────────────────────────
const Banner = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-dark via-secondary/20 to-dark z-0" />
    <div
      className="absolute inset-0 opacity-20 z-0"
      style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&auto=format)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
    <div
      className="absolute inset-0 z-0 opacity-5"
      style={{
        backgroundImage: "linear-gradient(rgba(230,57,70,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(230,57,70,0.5) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />
    {/* w-full fixes the centering issue */}
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-px w-12 bg-primary" />
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Premium Car Rental</span>
        </div>
        <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl text-white leading-none tracking-wider mb-6">
          DRIVE<br />
          <span className="text-primary">YOUR</span><br />
          DREAM
        </h1>
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
          Choose from hundreds of premium vehicles. Whether it's a weekend getaway or a cross-country adventure, DriveFleet has the perfect car for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/explore-cars" className="btn-primary flex items-center gap-2 justify-center sm:justify-start w-full sm:w-auto">
            Explore Cars <FiArrowRight />
          </Link>
          <Link to="/register" className="btn-outline flex items-center gap-2 justify-center sm:justify-start w-full sm:w-auto">
            Get Started
          </Link>
        </div>
        <div className="flex gap-8 mt-12">
          {[
            { label: "Cars Available", value: "200+" },
            { label: "Happy Clients", value: "5K+" },
            { label: "Cities", value: "12" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-3xl text-primary">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block z-0">
      <div className="absolute inset-0 bg-gradient-to-r from-dark to-transparent z-10" />
      <img
        src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format"
        alt="luxury car"
        className="w-full h-full object-cover opacity-40"
      />
    </div>
  </section>
);

// ── Available Cars ───────────────────────────────────────────────────────
const AvailableCars = ({ cars, loading }) => (
  <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-end justify-between mb-12">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px w-8 bg-primary" />
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Fleet</span>
        </div>
        <h2 className="section-title">AVAILABLE CARS</h2>
      </div>
      <Link to="/explore-cars" className="hidden sm:flex items-center gap-2 text-primary hover:text-white transition-colors font-semibold text-sm uppercase tracking-wider">
        View All <FiArrowRight />
      </Link>
    </div>

    {loading ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card h-80 skeleton" />
        ))}
      </div>
    ) : cars.length === 0 ? (
      <div className="text-center py-16 border border-dark-border">
        <MdDirectionsCar className="text-dark-border mx-auto mb-4" size={64} />
        <p className="font-heading text-3xl text-dark-border mb-2">NO CARS YET</p>
        <p className="text-gray-500 text-sm">Cars will appear here once added to the system.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.slice(0, 6).map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    )}

    <div className="mt-8 text-center sm:hidden">
      <Link to="/explore-cars" className="btn-outline">View All Cars</Link>
    </div>
  </section>
);

// ── Why Choose Us (Extra Static Section 1) ───────────────────────────────
const WhyChooseUs = () => {
  const features = [
    { icon: <MdSpeed size={32} />, title: "Instant Booking", desc: "Book your car in seconds. No paperwork, no waiting. Just pick and drive." },
    { icon: <MdSecurity size={32} />, title: "Fully Insured", desc: "Every vehicle comes with comprehensive insurance coverage for your peace of mind." },
    { icon: <MdSupportAgent size={32} />, title: "24/7 Support", desc: "Our dedicated support team is always available to assist you anytime, anywhere." },
    { icon: <MdVerified size={32} />, title: "Verified Fleet", desc: "All cars are regularly serviced and inspected to meet our high quality standards." },
  ];

  return (
    <section className="py-20 bg-dark-card border-y border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Benefits</span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="section-title">WHY CHOOSE DRIVEFLEET</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="p-6 border border-dark-border hover:border-primary/50 transition-all duration-300 group">
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{f.icon}</div>
              <h3 className="font-heading text-xl text-white tracking-wide mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── How It Works (Extra Static Section 2) ────────────────────────────────
const HowItWorks = () => {
  const steps = [
    { icon: <MdDirectionsCar size={28} />, step: "01", title: "Choose Your Car", desc: "Browse our fleet and pick the perfect vehicle for your trip." },
    { icon: <MdLocationOn size={28} />, step: "02", title: "Set Pickup Location", desc: "Select a convenient pickup point from our available locations." },
    { icon: <MdCardTravel size={28} />, step: "03", title: "Hit the Road", desc: "Complete booking and enjoy your journey with DriveFleet." },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="h-px w-8 bg-primary" />
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Process</span>
          <div className="h-px w-8 bg-primary" />
        </div>
        <h2 className="section-title">HOW IT WORKS</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <div className="hidden md:block absolute top-1/3 left-1/4 right-1/4 h-px bg-primary/30" />
        {steps.map((s, i) => (
          <div key={s.step} className="flex flex-col items-center text-center p-6 relative">
            <div className="w-16 h-16 bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-4 relative">
              {s.icon}
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center">{i + 1}</span>
            </div>
            <span className="font-heading text-5xl text-dark-border select-none mb-2">{s.step}</span>
            <h3 className="font-heading text-xl text-white tracking-wide mb-2">{s.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ── Testimonials (Extra Static Section 3) ────────────────────────────────
const Testimonials = () => {
  const reviews = [
    { name: "Rahul Ahmed", location: "Dhaka", text: "DriveFleet made my business trip so easy. The car was clean, on time, and exactly as described. Highly recommend!", rating: 5, avatar: "RA" },
    { name: "Nadia Islam", location: "Chittagong", text: "Amazing service! Booked a luxury car for our wedding and it was perfect. The team was super helpful throughout.", rating: 5, avatar: "NI" },
    { name: "Karim Hassan", location: "Sylhet", text: "Best car rental in Bangladesh. Great prices, great cars, no hidden charges. Will definitely use again.", rating: 4, avatar: "KH" },
  ];

  return (
    <section className="py-20 bg-dark-card border-y border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Testimonials</span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="section-title">WHAT CLIENTS SAY</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="p-6 border border-dark-border hover:border-primary/30 transition-all duration-300">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <MdStar key={i} size={18} className={i < r.rating ? "text-yellow-400" : "text-gray-600"} />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{r.avatar}</div>
                <div>
                  <p className="text-white font-semibold text-sm">{r.name}</p>
                  <p className="text-gray-500 text-xs">{r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Main Home Component ──────────────────────────────────────────────────
const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/cars`)
      .then((res) => setCars(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Banner />
      <AvailableCars cars={cars} loading={loading} />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
    </>
  );
};

export default Home;
