import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosSecure from "../../utils/axiosSecure";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { MdDirectionsCar } from "react-icons/md";

const CAR_TYPES = ["SUV", "Sedan", "Hatchback", "Luxury", "Convertible", "Electric", "Pickup"];

const AddCar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const carData = {
      carName: form.carName.value,
      dailyRentPrice: Number(form.dailyRentPrice.value),
      carType: form.carType.value,
      carImage: form.carImage.value,
      seatCapacity: Number(form.seatCapacity.value),
      pickupLocation: form.pickupLocation.value,
      description: form.description.value,
      availability: form.availability.value,
      ownerEmail: user.email,
      ownerName: user.displayName,
    };

    try {
      await axiosSecure.post("/cars", carData);
      toast.success("Car listed successfully!");
      navigate("/my-added-cars");
    } catch {
      toast.error("Failed to add car. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">List a Vehicle</span>
          </div>
          <h1 className="section-title">ADD A CAR</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-dark-card border border-dark-border p-6 sm:p-8 space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">Car Name *</label>
              <input type="text" name="carName" required placeholder="e.g. Toyota RAV4" className="input-field" />
            </div>
            <div>
              <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">Daily Rent Price ($) *</label>
              <input type="number" name="dailyRentPrice" required min="1" placeholder="e.g. 80" className="input-field" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">Car Type *</label>
              <select name="carType" required className="input-field">
                <option value="">Select type</option>
                {CAR_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">Seat Capacity *</label>
              <input type="number" name="seatCapacity" required min="2" max="12" placeholder="e.g. 5" className="input-field" />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">Pickup Location *</label>
              <input type="text" name="pickupLocation" required placeholder="e.g. Dhaka Airport" className="input-field" />
            </div>
            <div>
              <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">Availability *</label>
              <select name="availability" required className="input-field">
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">Car Image URL *</label>
            <input
              type="url"
              name="carImage"
              required
              placeholder="https://i.postimg.cc/... or https://i.ibb.co/..."
              className="input-field"
            />
            <p className="text-gray-500 text-xs mt-1">Use imgbb.com or postimage.org to upload and get URL</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">Description *</label>
            <textarea
              name="description"
              required
              rows={4}
              placeholder="Describe the car, its condition, features, etc."
              className="input-field resize-none"
            />
          </div>

          {/* Owner info (read-only) */}
          <div className="flex items-center gap-3 p-4 bg-dark border border-dark-border">
            <img
              src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=E63946&color=fff`}
              className="w-10 h-10 rounded-full border-2 border-primary"
              alt=""
            />
            <div>
              <p className="text-white text-sm font-semibold">{user?.displayName}</p>
              <p className="text-gray-400 text-xs">{user?.email}</p>
            </div>
            <span className="ml-auto text-xs text-primary border border-primary/30 px-2 py-1">Owner</span>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-4">
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <MdDirectionsCar size={20} />
                List My Car
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
