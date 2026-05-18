import { useEffect, useState } from "react";
import axiosSecure from "../../utils/axiosSecure";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner/Spinner";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";

const CAR_TYPES = ["SUV", "Sedan", "Hatchback", "Luxury", "Convertible", "Electric", "Pickup"];

const UpdateModal = ({ car, onClose, onUpdated }) => {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const updatedData = {
      dailyRentPrice: Number(form.dailyRentPrice.value),
      description: form.description.value,
      availability: form.availability.value,
      carImage: form.carImage.value,
      carType: form.carType.value,
      pickupLocation: form.pickupLocation.value,
    };
    try {
      await axiosSecure.put(`/cars/${car._id}`, updatedData);
      toast.success("Car updated successfully!");
      onUpdated();
      onClose();
    } catch {
      toast.error("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-dark-card border border-dark-border w-full max-w-lg p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl text-white tracking-wider">UPDATE CAR</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">Daily Price ($)</label>
              <input type="number" name="dailyRentPrice" defaultValue={car.dailyRentPrice} required className="input-field" />
            </div>
            <div>
              <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">Car Type</label>
              <select name="carType" defaultValue={car.carType} className="input-field">
                {CAR_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">Image URL</label>
            <input type="url" name="carImage" defaultValue={car.carImage} required className="input-field" />
          </div>

          <div>
            <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">Pickup Location</label>
            <input type="text" name="pickupLocation" defaultValue={car.pickupLocation} required className="input-field" />
          </div>

          <div>
            <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">Availability</label>
            <select name="availability" defaultValue={car.availability} className="input-field">
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">Description</label>
            <textarea name="description" defaultValue={car.description} rows={3} className="input-field resize-none" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-outline flex-1">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MyAddedCars = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);

  const fetchCars = () => {
    setLoading(true);
    axiosSecure
      .get(`/my-cars?email=${user.email}`)
      .then((res) => setCars(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user?.email) fetchCars();
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Car?",
      text: "This listing will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E63946",
      cancelButtonColor: "#1D3557",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Keep It",
      background: "#111827",
      color: "#F8F9FA",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/cars/${id}`);
          toast.success("Car deleted.");
          setCars((prev) => prev.filter((c) => c._id !== id));
        } catch {
          toast.error("Delete failed. Try again.");
        }
      }
    });
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">My Listings</span>
            </div>
            <h1 className="section-title">MY ADDED CARS</h1>
            <p className="text-gray-400 mt-2">{cars.length} car{cars.length !== 1 ? "s" : ""} listed</p>
          </div>
          <a href="/add-car" className="btn-primary hidden sm:block">+ Add Car</a>
        </div>

        {cars.length === 0 ? (
          <div className="text-center py-20 border border-dark-border">
            <p className="font-heading text-4xl text-dark-border mb-4">NO CARS LISTED</p>
            <p className="text-gray-500 mb-6">Start by listing your first vehicle.</p>
            <a href="/add-car" className="btn-primary inline-block">Add a Car</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div key={car._id} className="card flex flex-col">
                <div className="relative h-44 overflow-hidden">
                  <img src={car.carImage} alt={car.carName} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-xs font-bold uppercase ${car.availability === "Available" ? "bg-green-500" : "bg-gray-600"} text-white`}>
                      {car.availability}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-dark/80 backdrop-blur px-2 py-1">
                    <span className="text-primary font-heading text-lg">${car.dailyRentPrice}</span>
                    <span className="text-gray-400 text-xs">/day</span>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading text-xl text-white tracking-wide">{car.carName}</h3>
                    <span className="text-xs text-primary border border-primary/50 px-2 py-0.5 ml-2 flex-shrink-0">{car.carType}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <MdLocationOn className="text-primary" size={16} />
                    <span className="truncate">{car.pickupLocation}</span>
                  </div>

                  <p className="text-gray-500 text-xs mb-4 line-clamp-2">{car.description}</p>

                  <div className="text-xs text-gray-500 mb-4">
                    <span className="text-primary font-semibold">{car.bookingCount || 0}</span> total bookings
                  </div>

                  <div className="mt-auto flex gap-3">
                    <button
                      onClick={() => setSelectedCar(car)}
                      className="flex-1 flex items-center justify-center gap-1.5 border border-secondary text-blue-400 hover:bg-secondary/20 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all"
                    >
                      <FiEdit2 size={14} /> Update
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="flex-1 flex items-center justify-center gap-1.5 border border-red-500/50 text-red-400 hover:bg-red-500/10 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all"
                    >
                      <FiTrash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedCar && (
        <UpdateModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onUpdated={fetchCars}
        />
      )}
    </div>
  );
};

export default MyAddedCars;
