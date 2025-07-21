import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import OnboardingForm from "../Pages/OnboardingForm";
import Protected from "../Routes/Protected";

const Navigations = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<Login />} />
      <Route path="/onboarding/form" element={<Protected />}>
        <Route index element={<OnboardingForm />} />
      </Route>
    </Routes>
  );
};

export default Navigations;
