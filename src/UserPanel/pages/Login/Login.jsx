import React, { useState } from "react";
import loginbg from "../../../assets/images/bg.png";
import { MainContent } from "../../../constants/mainContent";
import Button from "../../../Component/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Routers } from "../../../constants/Routes";
import InputField from "../../../Component/InputField";
import Swal from "sweetalert2";
import { userLogin } from "../../../api/user.api";
import { loginSuccess } from "../../../Redux/Reducer/authReducer";
import { franchiseLogin } from "../../../api/franchise.api";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [franchiseSubmit, setfranchiseSubmit] = useState(false);
  const [validationError, setValidationError] = useState({});
  const [payload, setPayload] = useState({
    username: "",
    password: "",
  });

  const [franchisepayload, setFranchisePayload] = useState({
    franchiseID: "",
    franchisePassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPayload({ ...payload, [name]: type === "checkbox" ? checked : value });
    setValidationError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleChange1 = (e) => {
    const { name, value, type, checked } = e.target;
    setFranchisePayload({ ...franchisepayload, [name]: type === "checkbox" ? checked : value });
    setValidationError((prev) => ({ ...prev, [name]: "" }));
  };

  const navigateToUserPanel = () => {
    navigate(Routers.UserPanel);
  };
  const navigateToFranchisePanel = () => {
    navigate(Routers.FranchisePanel);
  };

  const handleSubmit = async () => {
    let errors = {};
    if (!payload.username) errors.username = "Please enter your User ID.";
    if (!payload.password) errors.password = "Please enter your password.";

    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
      return;
    }

    try {
      setSubmitting(true);
      const data = await userLogin(payload);
      console.log("Login response:", data);
      if (data?.success) {
        dispatch(
          loginSuccess({
            token: data?.token,
            role: data?.role,
            user: data?.data,
          })
        );
      }
      if (data?.success) {
        Swal.fire({
          icon: "success",
          title: data?.message,
          text: data?.message || "Login Successfully",
        }).then(() => {
          navigateToUserPanel();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
          text: data?.message || "Login failed. Try again.",
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      setValidationError({ form: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit1 = async () => {
    let errors = {};
    if (!franchisepayload.franchiseID) errors.franchiseID = "Please enter your Franchise ID.";
    if (!franchisepayload.franchisePassword) errors.franchisePassword = "Please enter your franchisePassword.";

    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
      return;
    }

    try {
      setfranchiseSubmit(true);
      const data = await franchiseLogin(franchisepayload);
      console.log("Franchise Login response:", data);
      if (data?.success) {
        dispatch(
          loginSuccess({
            token: data?.token,
            role: data?.role,
            user: data?.data,
          })
        );
      }
      if (data?.success) {
        Swal.fire({
          icon: "success",
          title: data?.message,
          text: "Franchise Login Successfully",
        }).then(() => {
          navigateToFranchisePanel();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: data?.message,
          text: data?.message || "Login failed. Try again.",
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      setValidationError({ form: "Something went wrong. Please try again." });
    } finally {
      setfranchiseSubmit(false);
    }
  };

  return (
  <div
  style={{
    backgroundImage: `url(${loginbg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
  className="min-h-screen w-full bg-cover bg-center flex items-center justify-center px-4 py-10"
>
  <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-8">
    {/* <img
      src={MainContent.logo1}
      className="h-40x` object-contain"
      alt="Logo"
    /> */}

    <div className="w-full grid md:grid-cols-2 gap-8">
      {/* User Login */}
      <div className="bg-white/70 backdrop-blur-md border rounded-2xl p-8 shadow-xl flex flex-col gap-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">User Login</h2>
        <div className="flex flex-col gap-4">
          <InputField
            type="text"
            name="username"
            label="User ID"
            value={payload.username}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          {validationError.username && (
            <p className="text-sm text-red-500">{validationError.username}</p>
          )}

          <InputField
            type="password"
            name="password"
            label="Password"
            value={payload.password}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          {validationError.password && (
            <p className="text-sm text-red-500">{validationError.password}</p>
          )}

          {validationError.form && (
            <p className="text-sm text-red-500">{validationError.form}</p>
          )}

          <Button
            title={submitting ? "Logging in..." : "Login"}
            disabled={submitting}
            className="bg-green-500 px-4 py-3 text-sm  rounded-md text-white text-center w-full disabled:opacity-50"
            onClick={handleSubmit}
          />

          <div className="flex justify-between text-sm text-blue-600 underline">
            <Link to={Routers.forgotPassword}>Forgot Password?</Link>
            <Link to={Routers.register}>Register Now</Link>
          </div>
        </div>
      </div>

      {/* Franchise Login */}
      <div className="bg-white/70 backdrop-blur-md border rounded-2xl p-8 shadow-xl flex flex-col gap-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Franchise Login</h2>
        <div className="flex flex-col gap-4">
          <InputField
            type="text"
            name="franchiseID"
            label="Franchise ID"
            value={franchisepayload.franchiseID}
            onChange={handleChange1}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit1();
              }
            }}
          />
          {validationError.franchiseID && (
            <p className="text-sm text-red-500">{validationError.franchiseID}</p>
          )}

          <InputField
            type="password"
            name="franchisePassword"
            label="Franchise Password"
            value={franchisepayload.franchisePassword}
            onChange={handleChange1}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit1();
              }
            }}
          />
          {validationError.franchisePassword && (
            <p className="text-sm text-red-500">{validationError.franchisePassword}</p>
          )}

          {validationError.form && (
            <p className="text-sm text-red-500">{validationError.form}</p>
          )}

          <Button
            title={franchiseSubmit ? "Logging in..." : "Franchise Login"}
            disabled={franchiseSubmit}
            className="bg-green-500 px-4 py-3 text-sm  rounded-md text-white text-center w-full disabled:opacity-50"
            onClick={handleSubmit1}
          />
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Login;
