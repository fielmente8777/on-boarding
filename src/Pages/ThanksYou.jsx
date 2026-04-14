import React, { useEffect } from "react";

const ThankYou = () => {
  const handleRedirect = () => {
    window.location.href = "https://dashboard.eazotel.com/login";
  };

//   Optional: Auto redirect after 5 seconds
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       handleRedirect();
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        
        {/* Icon */}
        <div className="text-5xl mb-4">🎉</div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-[#152547] mb-2">
          Thank You!
        </h1>

        {/* Message */}
        <p className="text-gray-700 text-lg mb-2">
          Your onboarding is <span className="font-semibold">successfully completed</span>.
        </p>

        <p className="text-gray-500 text-sm mb-6">
          Your account is being set up. You can now access your dashboard.
        </p>

        {/* Button */}
        <button
          onClick={handleRedirect}
          className="w-full bg-[#fc5f07]/90 hover:bg-[#fc5f07] text-white py-3 rounded-lg font-medium transition duration-300"
        >
          Go to Dashboard
        </button>

        {/* Auto redirect hint */}
        <p className="text-xs text-gray-400 mt-4">
          Redirecting automatically in 5 seconds...
        </p>
      </div>
    </div>
  );
};

export default ThankYou;