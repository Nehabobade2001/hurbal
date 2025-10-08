import React, { useState, useEffect } from "react";
import InputField from "../../../Component/InputField";
import SelectComponent from "../../../Component/SelectComponent";
import Button from "../../../Component/Button";
import Swal from "sweetalert2";
import PageLoader from "../../../Component/PageLoader";
import { Routers } from "../../../constants/Routes";
import { MainContent } from "../../../constants/mainContent";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  emailValidator,
  nameValidator,
  phoneValidator,
  panValidator,
  pincodeValidator,
  fieldValidator,
} from "../../../utils/inputValidator";
import {
  genderOptions,
  stateOptions,
  cityNameOptions,
  legOptions,
} from "../../../utils/registration-content";
import {
  requestEmailVerifyOtp,
  requestResendOtp,
  verifyOtpAndRegister,
} from "../../../api/user.api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../Redux/Reducer/authReducer";
import OtpVerificationPopup from "../../../Component/OtpVerificationPopup";
import { findUserDetails } from "../../../api/franchise.api";

const DistributorRegister = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    sponsorId: "",
    sponsorName: "",
    leg: "",
    firstName: "",
    middleName: "",
    lastName: "",
    relationName: "",
    dob: "",
    mobileNo: "",
    email: "",
    gender: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    panNo: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    if (search) {
      const params = new URLSearchParams(search);
      const referral = params.get("referral") || "";
      const username = params.get("username") || "";
      setFormData((prev) => ({
        ...prev,
        sponsorId:referral || "",
        sponsorName: username || "",
      }));
    }
  }, [search]);
  

  const validateField = (field, value) => {
    switch (field) {
      case "firstName":
      case "lastName":
        return nameValidator(value);
      case "relationName":
      case "dob":
      case "gender":
      case "state":
      case "city":
      case "address":
        return fieldValidator(value);
      case "email":
        return emailValidator(value);
      case "mobileNo":
        return phoneValidator(value);
      case "panNo":
        return panValidator(value);
      case "pincode":
        return pincodeValidator(value);
      case "sponsorId":
        return value ? "" : "Sponsor ID can't be empty";
      case "leg":
        return value ? "" : "Please select a leg.";
      case "terms":
        return value ? "" : "You must accept the terms.";
      default:
        return "";
    }
  };

  const validate = () => {
    const errs = {};
    let valid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) valid = false;
      errs[key] = error;
    });

    setErrors(errs);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue) }));
  };

  const fetchSponsorDetails = async (sponsorId) => {
    if (!sponsorId) return;
    
    try {
      setLoading(true);
      const response = await findUserDetails({ distributorId: sponsorId });
      console.log(response);
      
      if (response?.success === true) {
        const distributorName = response.data.distributorName || '';
        
        setFormData(prev => ({
          ...prev,
          sponsorName: distributorName
        }));
        // Clear any previous error
        setErrors(prev => ({
          ...prev,
          sponsorId: ''
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          sponsorName: ''
        }));
        setErrors(prev => ({
          ...prev,
          sponsorId: 'Invalid Sponsor ID'
        }));
      }
    } catch (error) {
      console.error('Error fetching sponsor details:', error);
      setFormData(prev => ({
        ...prev,
        sponsorName: ''
      }));
      setErrors(prev => ({
        ...prev,
        sponsorId: 'Invalid Sponsor ID'
      }));
    } finally {
      setLoading(false);
    }
  };

  const sendVerifyEmailHandler = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await requestEmailVerifyOtp(formData);
      setShowOtpModal(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text:
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  console.log(formData.panNo);

  const handleVerifyOtpAndRegister = async (otp) => {
    setLoading(true);
    try {
      const res = await verifyOtpAndRegister({
        email: formData.email,
        panNo:formData.panNo,
        otp: otp?.emailOtp,
      });
      console.log(res);
      if (res.success) {
        dispatch(
          loginSuccess({
            token: res?.token,
            role: res?.role,
            user: res?.data,
          })
        );
        Swal.fire({
          icon: "success",
          title: "Registered",
          text: res?.message || "You have registered successfully.",
        }).then(() => {
          navigate("/user-dashboard");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: res?.message || "Something went wrong.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      {showOtpModal && (
        <OtpVerificationPopup
          otpSubmitHandler={handleVerifyOtpAndRegister}
          show={showOtpModal}
          onHide={() => setShowOtpModal(false)}
          payload={formData}
          resendOtpHandler={() => requestResendOtp({ email: formData.email })}
        />
      )}

      <div className="bg-white p-6 rounded-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center">
          Distributor Registration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <InputField
                label="Sponsor ID"
                name="sponsorId"
                value={formData.sponsorId}
                onChange={handleChange}
                error={errors.sponsorId}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    fetchSponsorDetails(formData.sponsorId);
                  }
                }}
              />
            </div>
            <Button
              title="Search"
              onClick={() => fetchSponsorDetails(formData.sponsorId)}
              className="bg-green-600 text-white px-4 py-2 rounded h-[38px]"
            />
          </div>
          <InputField
            label="Sponsor Name"
            name="sponsorName"
            value={formData.sponsorName}
            onChange={handleChange}
            error={errors.sponsorName}
            disabled={true}
          />
          <SelectComponent
            label="Leg"
            name="leg"
            value={formData.leg}
            onChange={handleChange}
            options={legOptions}
            placeholder="Select Leg"
            error={errors.leg}
          />
          <InputField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
          <InputField
            label="Middle Name"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
          />
          <InputField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
          <InputField
            label="Father's/Husband's Name"
            name="relationName"
            value={formData.relationName}
            onChange={handleChange}
            error={errors.relationName}
          />
          <InputField
            type="date"
            label="Date of Birth"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            error={errors.dob}
          />
          <InputField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            label="Mobile Number"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            error={errors.mobileNo}
            type="tel"
          />
          <InputField
            label="PAN Number"
            name="panNo"
            value={formData.panNo}
            onChange={handleChange}
            error={errors.panNo}
          />
          <SelectComponent
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={genderOptions}
            placeholder="Select Gender"
            error={errors.gender}
          />
          <SelectComponent
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            options={stateOptions}
            placeholder="Select State"
            error={errors.state}
          />
          <SelectComponent
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            options={cityNameOptions[formData.state] || []}
            placeholder="Select City"
            error={errors.city}
          />
          <InputField
            label="Pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            error={errors.pincode}
            type="number"
          />
          <InputField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
          />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          <span>
            I agree to the <strong>{MainContent.name}</strong> Terms of Service
          </span>
        </div>
        {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

        <div className="mt-6 flex flex-col items-center space-y-3 w-fit mx-auto">
          <Button
            title="Register"
            onClick={sendVerifyEmailHandler}
            className="bg-green-600 text-white px-6 py-2 rounded"
          />
          <Link to={Routers.Login} className="text-sm underline text-blue-500">
            Login Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default DistributorRegister;
