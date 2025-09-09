import axios from "axios";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlineEyeOff } from "react-icons/hi";
// import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import { BASE_URL } from "../../constants/constant";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import { verify } from "../../utils/verify";

console.log("Env", process.env.REACT_APP_CLIENT_ID);

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const [forget, setForget] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinnerLoader(true);
    // Dispatch login action
    // const response = await dispatch(loginUser(formData));
    // let timerInterval;
    // if (response.success === false) {
    //   setSpinnerLoader(false);
    //   Swal.fire({
    //     title: "Logged Failed",
    //     html: "Navigating you to Login <b></b>",
    //     timer: 700,
    //     timerProgressBar: true,
    //     didOpen: () => {
    //       Swal.showLoading();
    //       const timer = Swal.getPopup().querySelector("b");
    //       timerInterval = setInterval(() => {
    //         timer.textContent = `${Swal.getTimerLeft()}`;
    //       }, 1000);
    //     },
    //     willClose: () => {
    //       clearInterval(timerInterval);
    //     },
    //   });
    // } else if (response.data.Status) {
    //   const token = response?.data?.Token;
    //   handleLocalStorage("token", token || "");
    //   setCookie("token", token || "");
    //   setSpinnerLoader(false);
    //   Swal.fire({
    //     title: "Logged in Successfully",
    //     html: "We will redirect you to the dashboard <b></b>",
    //     timer: 1000,
    //     timerProgressBar: true,
    //     didOpen: () => {
    //       Swal.showLoading();
    //       const timer = Swal.getPopup().querySelector("b");
    //       timerInterval = setInterval(() => {
    //         timer.textContent = `${Swal.getTimerLeft()}`;
    //       }, 1000);
    //     },
    //     willClose: () => {
    //       clearInterval(timerInterval);
    //     },
    //   }).then((result) => {
    //     if (result.dismiss === Swal.DismissReason.timer) {
    //       navigate("/");
    //     }
    //   });
    // } else {
    //   setSpinnerLoader(false);
    //   Swal.fire({
    //     title: "Logged Failed",
    //     html: "Navigating you to Login <b></b>",
    //     timer: 700,
    //     timerProgressBar: true,
    //     didOpen: () => {
    //       Swal.showLoading();
    //       const timer = Swal.getPopup().querySelector("b");
    //       timerInterval = setInterval(() => {
    //         timer.textContent = `${Swal.getTimerLeft()}`;
    //       }, 1000);
    //     },
    //     willClose: () => {
    //       clearInterval(timerInterval);
    //     },
    //   });
    // }
  };

  const handleSuccess = async (response) => {
    // setLoading(true);
    setError(null);
    try {
      const token = response.credential || response.access_token;

      const result = (await verify(token)).data;

      let timerInterval;
      if (result?.status === true) {
        localStorage.setItem("token", result?.token || "");
        // setCookie("token", result?.token || "");
        // setSpinnerLoader(false);
        Swal.fire({
          title: "Logged in Successfully",
          html: "We will redirect you to the dashboard <b></b>",
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 1000);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });

        navigate("/onboarding/form");
      }

      // await testprotected(jwtToken);
      // saveToken(jwtToken);

      return "Login successful";
    } catch (err) {
      console.error("Authentication error:", err);
      setError("Failed to authenticate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFailure = (error) => {
    console.error("Login Failed:", error);
    setError("Login failed. Please try again.");
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/eazotel/forgot/password`, {
        email: formData.email,
      });

      if (response?.data?.Status === true) {
        Swal.fire({
          title: "Password reset successfully",
          text: "Please check your email to reset your password.",
          icon: "success",
          confirmButtonText: "OK",
        });
        setForget(false);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "There was an error sending the email. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="max-w-[1600px] mx-auto w-full grid lg:grid-cols-2">
        <div className="w-full md:h-[770px] h-auto">
          <img
            src="/LoginImage2.png"
            alt=""
            className="w-full h-full object-cover object-bottom"
          />
        </div>

        <div className="bg-[#EBF4FF] flex flex-col">
          <div
            className={`h-40 bg-contain bg-no-repeat relative hidden md:block`}
            style={{
              backgroundImage: `url('/Grid.png')`,
            }}
          >
            <div className="absolute right-4 bottom-0">
              <img
                src="/Dot.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="rounded-2xl max-w-xl w-full mx-auto flex-1 flex flex-col justify-center">
            <div>
              <div className="max-w-60 mx-auto aspect-[3/1]">
                <img
                  src="/EAZOTEL LOGO.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-4 mt-4">
                <h2 className="text-3xl font-bold text-[#0A3A75] text-center tracking-wide ">
                  Welcome Back!
                </h2>
                <p className="text-[#242424] text-center text-2xl text-primary tracking-wide">
                  Access Your Smart Hotel Dashboard Instantly!
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="space-y-6">
                <div className="w-full">
                  <GoogleOAuthProvider
                    clientId={process.env.REACT_APP_CLIENT_ID}
                  >
                    <div className="max-w-52 mx-auto py-3">
                      <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleFailure}
                        width="100%"
                        size="large"
                        useOneTap={true}
                        shape="pill"
                        theme="filled_blue"
                      />
                    </div>
                  </GoogleOAuthProvider>
                </div>
              </div>
            </form>
          </div>

          <div
            className={`h-40 bg-contain bg-no-repeat relative`}
            style={{
              backgroundImage: `url('/Grid.png')`,
            }}
          >
            <div className="absolute left-0 top-0">
              <img
                src="/Dot.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

const SignInIcon = () => {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 18.5V16.5H16V2.5H9V0.5H16C16.55 0.5 17.0208 0.695833 17.4125 1.0875C17.8042 1.47917 18 1.95 18 2.5V16.5C18 17.05 17.8042 17.5208 17.4125 17.9125C17.0208 18.3042 16.55 18.5 16 18.5H9ZM7 14.5L5.625 13.05L8.175 10.5H0V8.5H8.175L5.625 5.95L7 4.5L12 9.5L7 14.5Z"
        fill="white"
      />
    </svg>
  );
};

const GoogleLoginButton = ({ handleSuccess, handleFailure }) => {
  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handleFailure,
  });

  return (
    <div className="flex justify-center w-full">
      <button
        type="button"
        onClick={() => {
          login();
        }}
        className="w-full flex items-center justify-center gap-3 bg-white text-black border border-gray-300 px-6 py-2 rounded-md shadow hover:shadow-md transition"
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="google"
          className="w-8 h-8"
        />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};
