import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const Protected = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      return;
    } else {
      navigate("/sign-in");
    }
  }, []);
  return isAuthenticated && <Outlet />;
};

export default Protected;
