import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import CarCard from "../../components/CarCard/CarCard";
import { FiSearch } from "react-icons/fi";
import { MdFilterList } from "react-icons/md";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CAR_TYPES = ["All", "SUV", "Sedan", "Hatchback", "Luxury", "Convertible", "Electric", "Pickup"];

const ExploreCars = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [type, setType] = useState(searchParams.get("type") || "All");
  const [sort, setSort] = useState("newest");

  const fetchCars = () => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (type && type !== "All") params.type = type;
    if (sort) params.sort = sort;

    axios
      .get(`${API_URL}/cars`, { params })
      .then((res) => setCars(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCars();
  }, [type, sort]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCars();
    const params = {};
    if (search) params.search = search;
    if (type !== "All") params.type = type;
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Browse</span>
          </div>
          <h1 className="section-title">EXPLORE ALL CARS</h1>
          <p className="text-gray-400 mt-2">{cars.length} vehicles available</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-dark-card border border-dark-border p-4 sm:p-6 mb-8 flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by car name..."
                className="input-field pl-10"
              />
            </div>
            <button type="submit" className="btn-primary px-5">Search</button>
          </form>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <MdFilterList className="text-primary" size={20} />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-field py-2.5 pr-8"
              style={{ width: "auto" }}
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Car Type Filter Tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CAR_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-widest border transition-all duration-200 ${
                type === t
                  ? "bg-primary border-primary text-white"
                  : "border-dark-border text-gray-400 hover:border-primary/50 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Cars Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card h-80 skeleton" />
            ))}
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-heading text-4xl text-dark-border mb-4">NO CARS FOUND</p>
            <p className="text-gray-500">Try a different search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreCars;
