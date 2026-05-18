import { Link } from "react-router-dom";
import { MdDirectionsCar } from "react-icons/md";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative inline-block mb-8">
          <p className="font-heading text-[180px] sm:text-[220px] text-dark-border leading-none select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MdDirectionsCar className="text-primary mx-auto mb-2" size={48} />
              <p className="font-heading text-2xl text-white tracking-widest">LOST?</p>
            </div>
          </div>
        </div>
        <h2 className="font-heading text-3xl text-white tracking-wider mb-4">
          PAGE NOT FOUND
        </h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
          The road you're looking for doesn't exist. Let's get you back on track.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <MdDirectionsCar size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
