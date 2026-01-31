import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Signup = () => {

  const navigate = useNavigate();

  /* ---------------- STATE ---------------- */
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    altEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [showSuccess, setShowSuccess] = useState(false);


  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile must be 10 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  /* ---------------- HANDLE SUBMIT ---------------- */
  const handleSubmit = (e) => {
  e.preventDefault();

  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {

    // SAVE TO LOCAL STORAGE
    localStorage.setItem(
  "flightUser",
  JSON.stringify({
    ...formData,
    isLoggedIn: false,
    bookings: []
  })
)

    // SHOW SUCCESS ALERT
    setShowSuccess(true);

    // RESET FORM
    setFormData({
      fullName: "",
      email: "",
      mobile: "",
      altEmail: "",
      password: "",
      confirmPassword: "",
    });
-
    // AUTO CLOSE ALERT
    setTimeout(() => {
      setShowSuccess(false);
    }, 2500);
  }
};


  return (
    <div className="w-screen h-screen relative overflow-hidden">

      {/* BACKGROUND VIDEO */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="https://res.cloudinary.com/dttbwsozv/video/upload/v1769268268/62116-502737914_medium_cmffmg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50" />

      {/* BACK BUTTON */}
    <div
     onClick={() => navigate("/")}
     className="absolute top-4 left-4 z-20 flex items-center gap-2 text-white cursor-pointer hover:opacity-80 transition"
     >      
       <ArrowLeft size={22} />
        <span>Back</span>
      </div>

      <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center">

        {/* LEFT TEXT */}
        <div className="w-full lg:w-1/2 flex justify-center px-6 py-10 text-center">
          <motion.h1
            whileHover={{ scale: 1.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white"
          >
            Views from a plane
            <br />
            <span className="text-cyan-300">are truly something else</span>
          </motion.h1>
        </div>

        {/* FORM */}
        <div className="w-full lg:w-1/2 px-6 sm:px-12 lg:px-20">
          <h2 className="text-3xl font-extrabold text-white mb-6">
            Preparing for Flight ✈️
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* FULL NAME */}
            <div>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="regInput"
                placeholder="Full Name"
              />
              {errors.fullName && <p className="error">{errors.fullName}</p>}
            </div>

            {/* EMAIL */}
            <div>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="regInput"
                placeholder="Email"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            {/* MOBILE */}
            <div>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="regInput"
                placeholder="Mobile Number"
              />
              {errors.mobile && <p className="error">{errors.mobile}</p>}
            </div>

            {/* ALT EMAIL */}
            <div>
              <input
                name="altEmail"
                value={formData.altEmail}
                onChange={handleChange}
                className="regInput"
                placeholder="Alternate Email"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="regInput"
                placeholder="Password"
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="regInput"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="sm:col-span-2 py-4 rounded-full bg-cyan-400 font-bold hover:scale-105 transition"
            >
              Create Account ✨
            </button>
            <div
            onClick={() => navigate("/Signin")}
            className="sm:col-span-2 text-center mt-4 text-white/80 cursor-pointer hover:text-cyan-300 transition"
            >
           Oops Already have an account?{" "}
           <span className="font-semibold underline underline-offset-4">
            Signin
           </span>
           </div>

          </form>
        </div>
      </div>

      <style>{`
        .regInput {
          width: 100%;
          padding: 1rem 1.4rem;
          border-radius: 9999px;
          background: rgba(255,255,255,0.25);
          color: white;
          border: 1px solid rgba(255,255,255,0.35);
          outline: none;
        }
        .error {
          color: #fecaca;
          font-size: 0.75rem;
          margin-top: 4px;
          margin-left: 10px;
        }
      `}</style>

       {/* SUCCESS ALERT */}
     {showSuccess && (
     <motion.div
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.5, opacity: 0 }}
    className="
      fixed inset-0 z-50 flex items-center justify-center
      bg-black/60 backdrop-blur-sm
    "
  >
    <motion.div
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="
        bg-white/15 backdrop-blur-2xl
        border border-white/30
        rounded-3xl px-10 py-8
        text-center text-white
        shadow-[0_0_60px_rgba(56,189,248,0.6)]
      "
    >
      <h2 className="text-3xl font-extrabold mb-2">
        🎉 Registration Successful
      </h2>
      <p className="text-white/80 text-sm">
        Your flight journey begins now ✈️
      </p>
    </motion.div>
  </motion.div>
)}


    </div>
  );
};

export default Signup;
