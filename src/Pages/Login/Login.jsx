import { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { verify } from "../../utils/verify";

const highlights = [
  { title: "Website in minutes", text: "A ready-to-launch hotel website built from your details." },
  { title: "Direct bookings", text: "Commission-free booking engine connected to your site." },
  { title: "14-day free trial", text: "Every app unlocked. No card required." },
];

const steps = ["Sign in with Google", "Add your property details", "Your website goes live"];

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
    <path
      fillRule="evenodd"
      d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.58l7.3-7.3a1 1 0 011.4 0z"
      clipRule="evenodd"
    />
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSuccess = async (response) => {
    setError(null);
    setLoading(true);
    try {
      const token = response.credential || response.access_token;
      const result = (await verify(token)).data;

      if (result?.status !== true) {
        setError(result?.message || "Login failed. Please try again.");
        return;
      }

      localStorage.setItem("token", result?.token || "");
      // Website created but subscription step not finished yet -> back to form.
      const pending = localStorage.getItem("onboarding-website-created");
      navigate(
        result?.onboarding === true && !pending
          ? "/thank-you"
          : "/onboarding/form",
      );
    } catch (err) {
      console.error("Authentication error:", err);
      setError("Failed to authenticate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFailure = (err) => {
    console.error("Login Failed:", err);
    setError("Google sign-in was cancelled or failed. Please try again.");
  };

  return (
    <div className="grid min-h-screen bg-[#F4F7FB] lg:grid-cols-[1.1fr_1fr]">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-[#0A3A75] lg:block">
        <img
          src="/LoginImage2.png"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A3A75]/95 via-[#0A3A75]/80 to-[#061f40]/95" />

        <div className="relative flex h-full flex-col justify-between p-12 text-white xl:p-16">
          <span className="w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-blue-100">
            Smart Hotel Platform
          </span>

          <div className="max-w-lg">
            <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
              Grow direct bookings with{" "}
              <span className="text-[#fc5f07]">one platform.</span>
            </h1>
            <p className="mt-4 text-lg text-blue-100">
              Website, booking engine, guest messaging and analytics, set up
              for your property in a few minutes.
            </p>

            <ul className="mt-10 space-y-5">
              {highlights.map((h) => (
                <li key={h.title} className="flex gap-4">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#fc5f07] text-white">
                    <CheckIcon />
                  </span>
                  <div>
                    <p className="font-semibold">{h.title}</p>
                    <p className="text-sm text-blue-200">{h.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-blue-300">
            © {new Date().getFullYear()} Eazotel. All rights reserved.
          </p>
        </div>
      </aside>

      {/* Sign-in panel */}
      <main className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <img
            src="/EAZOTEL LOGO.png"
            alt="Eazotel"
            className="mx-auto h-12 w-auto object-contain"
          />

          <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-7 shadow-xl shadow-[#0A3A75]/5 sm:p-9">
            <h2 className="text-center text-2xl font-bold text-[#0A3A75]">
              Create your hotel website
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              Sign in with Google to start your free onboarding.
            </p>

            <ol className="mt-7 space-y-3">
              {steps.map((step, i) => (
                <li key={step} className="flex items-center gap-3 text-sm text-gray-600">
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      i === 0
                        ? "bg-[#0A3A75] text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <div className="my-7 h-px bg-gray-100" />

            <div className="relative flex min-h-[44px] justify-center">
              {loading ? (
                <div className="flex items-center gap-3 text-sm font-medium text-[#0A3A75]">
                  <span className="size-5 animate-spin rounded-full border-2 border-[#0A3A75]/20 border-t-[#0A3A75]" />
                  Signing you in…
                </div>
              ) : (
                <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleFailure}
                    size="large"
                    shape="pill"
                    theme="filled_blue"
                    text="continue_with"
                    width="300"
                    useOneTap
                  />
                </GoogleOAuthProvider>
              )}
            </div>

            {error && (
              <p
                role="alert"
                className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-600"
              >
                {error}
              </p>
            )}

            <p className="mt-6 text-center text-xs text-gray-400">
              By continuing you agree to Eazotel's{" "}
              <a
                href="https://eazotel.com/privacypolicy"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-gray-600"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already a member?{" "}
            <a
              href="https://dashboard.eazotel.com"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#fc5f07] hover:underline"
            >
              Log in to dashboard
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
