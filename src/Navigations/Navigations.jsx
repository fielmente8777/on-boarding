import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import OnboardingForm from "../Pages/OnboardingForm";
import Protected from "../Routes/Protected";
import ThankYou from "../Pages/ThanksYou";

const Navigations = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sign-in" replace />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/onboarding/form" element={<Protected />}>
        <Route index element={<OnboardingForm />} />
      </Route>
      <Route path="/thank-you" element={<Protected />}>
      <Route index element={<ThankYou />} />
      </Route>

    </Routes>
  );
};

export default Navigations;
