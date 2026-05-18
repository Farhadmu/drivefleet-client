import { Link } from "react-router-dom";
import { MdLocationOn, MdPeople, MdStar } from "react-icons/md";
import { FiCalendar } from "react-icons/fi";

const CarCard = ({ car }) => {
  const {
    _id,
    carName,
    carImage,
    dailyRentPrice,
    carType,
    seatCapacity,
    pickupLocation,
    availability,
    bookingCount,
  } = car;

  return (
    <div className="card group flex flex-col">
      <div className="relative overflow-hidden h-48">
        <img
          src={carImage}
          alt={carName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format";
          }}
        />
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-1 text-xs font-bold uppercase tracking-wider ${
              availability === "Available"
                ? "bg-green-500 text-white"
                : "bg-gray-600 text-gray-200"
            }`}
          >
            {availability}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-dark/80 backdrop-blur px-2 py-1">
          <span className="text-primary font-heading text-lg">${dailyRentPrice}</span>
          <span className="text-gray-400 text-xs">/day</span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading text-xl text-white tracking-wide leading-tight">
            {carName}
          </h3>
          <span className="text-xs text-primary border border-primary/50 px-2 py-0.5 ml-2 flex-shrink-0">
            {carType}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3 mb-4">
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <MdPeople className="text-primary" size={16} />
            <span>{seatCapacity} Seats</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <MdLocationOn className="text-primary" size={16} />
            <span className="truncate">{pickupLocation}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <FiCalendar className="text-primary" size={14} />
            <span>{bookingCount || 0} bookings</span>
          </div>
          <div className="flex items-center gap-1.5 text-yellow-400 text-sm">
            <MdStar size={16} />
            <span>4.{(_id?.charCodeAt(0) % 5) + 5}</span>
          </div>
        </div>

        <div className="mt-auto">
          <Link
            to={`/cars/${_id}`}
            className="btn-primary w-full text-center block text-sm py-2.5"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;