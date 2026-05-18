import { useEffect, useState } from "react";
import axiosSecure from "../../utils/axiosSecure";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner/Spinner";
import { MdLocationOn, MdCalendarToday } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    axiosSecure
      .get(`/bookings?email=${user.email}`)
      .then((res) => setBookings(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user?.email) fetchBookings();
  }, [user]);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E63946",
      cancelButtonColor: "#1D3557",
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "Keep Booking",
      background: "#111827",
      color: "#F8F9FA",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/bookings/${id}`);
          toast.success("Booking cancelled.");
          setBookings((prev) => prev.filter((b) => b._id !== id));
        } catch {
          toast.error("Failed to cancel. Try again.");
        }
      }
    });
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">History</span>
          </div>
          <h1 className="section-title">MY BOOKINGS</h1>
          <p className="text-gray-400 mt-2">{bookings.length} booking{bookings.length !== 1 ? "s" : ""} found</p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-20 border border-dark-border">
            <p className="font-heading text-4xl text-dark-border mb-4">NO BOOKINGS YET</p>
            <p className="text-gray-500 mb-6">You haven't booked any cars yet.</p>
            <a href="/explore-cars" className="btn-primary inline-block">Explore Cars</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="card flex flex-col">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={booking.carImage}
                    alt={booking.carName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 uppercase">
                      {booking.status}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-dark/80 backdrop-blur px-2 py-1">
                    <span className="text-primary font-heading text-lg">${booking.dailyRentPrice}</span>
                    <span className="text-gray-400 text-xs">/day</span>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-heading text-xl text-white tracking-wide">{booking.carName}</h3>
                    <span className="text-xs text-primary border border-primary/50 px-2 py-0.5 ml-2 flex-shrink-0">
                      {booking.carType}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <MdLocationOn className="text-primary flex-shrink-0" size={16} />
                      <span>{booking.pickupLocation}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <MdCalendarToday className="text-primary flex-shrink-0" size={16} />
                      <span>{new Date(booking.bookingDate).toLocaleDateString("en-US", {
                        year: "numeric", month: "long", day: "numeric"
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <span className="text-primary font-semibold text-xs uppercase">Driver:</span>
                      <span>{booking.driverNeeded}</span>
                    </div>
                  </div>

                  {booking.specialNote && (
                    <p className="text-gray-500 text-xs italic border-t border-dark-border pt-3 mb-3">
                      Note: {booking.specialNote}
                    </p>
                  )}

                  <div className="mt-auto">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="w-full flex items-center justify-center gap-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all duration-200"
                    >
                      <FiTrash2 size={16} />
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
