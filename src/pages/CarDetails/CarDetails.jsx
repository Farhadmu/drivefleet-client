import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosSecure from "../../utils/axiosSecure";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner/Spinner";
import {
  MdLocationOn, MdPeople, MdStar, MdCheck, MdClose
} from "react-icons/md";
import { FiCalendar, FiX } from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const BookingModal = ({ car, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [driverNeeded, setDriverNeeded] = useState("No");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await axiosSecure.post("/bookings", {
        carId: car._id,
        carName: car.carName,
        carImage: car.carImage,
        dailyRentPrice: car.dailyRentPrice,
        carType: car.carType,
        pickupLocation: car.pickupLocation,
        driverNeeded,
        specialNote: note,
        userEmail: user.email,
        userName: user.displayName,
      });
      toast.success("Car booked successfully!");
      onSuccess();
    } catch {
      toast.error("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-dark-card border border-dark-border w-full max-w-md p-6 animate-slide-up">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="font-heading text-2xl text-white tracking-wider">BOOK CAR</h2>
            <p className="text-gray-400 text-sm mt-1">{car.carName}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <FiX size={24} />
          </button>
        </div>

        {/* Car Summary */}
        <div className="flex gap-4 bg-dark border border-dark-border p-3 mb-6">
          <img src={car.carImage} alt={car.carName} className="w-24 h-16 object-cover flex-shrink-0" />
          <div>
            <p className="text-white font-semibold text-sm">{car.carName}</p>
            <p className="text-primary font-heading text-lg">${car.dailyRentPrice}<span className="text-gray-400 text-xs">/day</span></p>
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <MdLocationOn size={12} className="text-primary" />
              {car.pickupLocation}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">
              Driver Needed?
            </label>
            <div className="flex gap-3">
              {["Yes", "No"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setDriverNeeded(opt)}
                  className={`flex-1 py-2.5 text-sm font-semibold uppercase tracking-wider border transition-all duration-200 ${
                    driverNeeded === opt
                      ? "bg-primary border-primary text-white"
                      : "border-dark-border text-gray-400 hover:border-primary/50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">
              Special Note (Optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Any special requirements..."
              className="input-field resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="btn-outline flex-1">Cancel</button>
            <button
              onClick={handleBook}
              disabled={loading}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Book Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/cars/${id}`)
      .then((res) => setCar(res.data))
      .catch(() => navigate("/explore-cars"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (!car) return null;

  const features = [
    `${car.seatCapacity} Seat Capacity`,
    `${car.carType} Type`,
    car.availability,
    `Pickup: ${car.pickupLocation}`,
  ];

  const handleBookClick = () => {
    if (!user) {
      toast.error("Please login to book a car");
      navigate("/login");
      return;
    }
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div>
            <div className="relative overflow-hidden">
              <img
                src={car.carImage}
                alt={car.carName}
                className="w-full h-72 sm:h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
                    car.availability === "Available" ? "bg-green-500" : "bg-gray-600"
                  } text-white`}
                >
                  {car.availability}
                </span>
              </div>
            </div>
            {/* Stats bar */}
            <div className="grid grid-cols-3 border border-dark-border mt-4">
              {[
                { label: "Daily Rate", value: `$${car.dailyRentPrice}` },
                { label: "Total Bookings", value: car.bookingCount || 0 },
                { label: "Seats", value: car.seatCapacity },
              ].map((stat, i) => (
                <div key={stat.label} className={`p-4 text-center ${i < 2 ? "border-r border-dark-border" : ""}`}>
                  <p className="font-heading text-2xl text-primary">{stat.value}</p>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">{car.carType}</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl text-white tracking-wider mb-4">{car.carName}</h1>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <MdStar key={i} className={i < 4 ? "text-yellow-400" : "text-gray-600"} size={20} />
              ))}
              <span className="text-gray-400 text-sm ml-2">(4.8 out of 5)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-heading text-5xl text-primary">${car.dailyRentPrice}</span>
              <span className="text-gray-400">/ day</span>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-6">{car.description}</p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-3">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                    <MdCheck className="text-primary flex-shrink-0" size={16} />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-400 mb-8 pb-6 border-b border-dark-border">
              <MdLocationOn className="text-primary" size={20} />
              <span>Pickup from: <strong className="text-white">{car.pickupLocation}</strong></span>
            </div>

            {/* CTA */}
            <button
              onClick={handleBookClick}
              disabled={car.availability !== "Available"}
              className={`btn-primary w-full text-center text-base py-4 ${
                car.availability !== "Available" ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {car.availability === "Available" ? "Book Now" : "Currently Unavailable"}
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <BookingModal
          car={car}
          onClose={() => setShowModal(false)}
          onSuccess={() => { setShowModal(false); navigate("/my-bookings"); }}
        />
      )}
    </div>
  );
};

export default CarDetails;
