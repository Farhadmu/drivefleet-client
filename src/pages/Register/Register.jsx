import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiImage } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { MdDirectionsCar, MdCheckCircle, MdCancel } from "react-icons/md";

const validatePassword = (password) => {
  const errors = [];
  if (password.length < 6) errors.push("At least 6 characters");
  if (!/[A-Z]/.test(password)) errors.push("At least one uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("At least one lowercase letter");
  return errors;
};

const Register = () => {
  const { register, updateUserProfile, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [formError, setFormError] = useState("");

  const pwErrors = validatePassword(password);

  const handleRegister = async (e) => {
    e.preventDefault();
    setFormError("");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;

    if (pwErrors.length > 0) {
      setErrors(pwErrors);
      return;
    }

    setLoading(true);
    try {
      await register(email, password);
      await updateUserProfile(name, photoURL);
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      const msg =
        err.code === "auth/email-already-in-use"
          ? "This email is already registered."
          : "Registration failed. Please try again.";
      setFormError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Welcome to DriveFleet!");
      navigate("/");
    } catch {
      toast.error("Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  const checks = [
    { label: "At least 6 characters", pass: password.length >= 6 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Lowercase letter", pass: /[a-z]/.test(password) },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark/70" />
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-9 h-9 bg-primary flex items-center justify-center">
            <MdDirectionsCar className="text-white text-xl" />
          </div>
          <span className="font-heading text-2xl text-white tracking-widest">DRIVEFLEET</span>
        </div>
        <div className="relative z-10">
          <h2 className="font-heading text-5xl text-white tracking-wider mb-4">
            JOIN<br />
            <span className="text-primary">THE FLEET</span>
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Create your account and start exploring premium car rentals. Add your own cars or book a dream ride today.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center bg-dark px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="font-heading text-4xl text-white tracking-wider mb-2">REGISTER</h1>
            <p className="text-gray-400 text-sm">Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-semibold">Login here</Link>
            </p>
          </div>

          {formError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded mb-4">
              {formError}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input type="text" name="name" required placeholder="John Doe" className="input-field pl-10" />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input type="email" name="email" required placeholder="your@email.com" className="input-field pl-10" />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">Photo URL</label>
              <div className="relative">
                <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input type="url" name="photoURL" placeholder="https://..." className="input-field pl-10" />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wider">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors([]); }}
                  className="input-field pl-10 pr-10"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {/* Password strength indicator */}
              {password && (
                <div className="mt-2 space-y-1">
                  {checks.map((c) => (
                    <div key={c.label} className="flex items-center gap-2 text-xs">
                      {c.pass
                        ? <MdCheckCircle className="text-green-400" size={14} />
                        : <MdCancel className="text-red-400" size={14} />}
                      <span className={c.pass ? "text-green-400" : "text-red-400"}>{c.label}</span>
                    </div>
                  ))}
                </div>
              )}
              {errors.length > 0 && (
                <p className="text-red-400 text-xs mt-1">{errors[0]}</p>
              )}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Create Account"}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-dark px-3 text-gray-500 uppercase tracking-widest">Or</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-dark-border bg-dark-card hover:border-primary/50 text-white py-3 px-4 font-semibold text-sm uppercase tracking-wider transition-all duration-200"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
