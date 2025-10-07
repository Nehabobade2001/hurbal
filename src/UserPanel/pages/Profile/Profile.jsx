import React, { useEffect, useState } from "react";
import InputField from "../../../Component/InputField";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../../Component/PageLoader";
import Swal from "sweetalert2";
import { convertToBase64 } from "../../../utils/convertToBase64";
import { getProfile, profileUpdate } from "../../../api/user.api";
import { loginSuccess } from "../../../Redux/Reducer/authReducer";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userPhoto: null,
    panCardImage: null,
    aadhaarFront: null,
    aadhaarBack: null,
    addressProof: null,
    cheque: null,
    fatherName: "",
    profession: "",
    email: "",
    maritalStatus: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    nomineeName: "",
    nomineeRelation: "",
    nomineeDOB: "",
    nomineeAadhar: "",
    bankName: "",
    branchName: "",
    aadharNo: "",
    ifscCode: "",
  });

  const user = useSelector((state) => state.auth);
  const userDetails = user?.user;

  useEffect(() => {
    if (userDetails) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        distributorName:
          (userDetails?.name?.firstName && userDetails?.name?.lastName
            ? `${userDetails.name.firstName} ${userDetails.name.lastName}`
            : userDetails?.generalDetails?.distributorName) ?? "",
        distributorID: userDetails?.userId ?? "",
        email: userDetails?.email ?? "",
        gender: userDetails?.gender ?? "",
        dob: userDetails?.dob ?? "",
        mobile: userDetails?.mobileNo ?? "",
        panNo: (userDetails?.panNo || userDetails?.kycDetails?.panCard) ?? "",
        sponserID: userDetails?.sponsorId ?? "",
        sponserName: userDetails?.sponsorName ?? "",
        doj: userDetails?.createdAt
          ? new Date(userDetails.createdAt).toISOString().split("T")[0]
          : "",
        fatherName: userDetails?.relationName ?? "",
        profession: userDetails?.profession ?? "",
        maritalStatus: userDetails?.maritalStatus ?? "",
        address: userDetails?.address ?? "",
        city: userDetails?.city ?? "",

        state: userDetails?.state ?? "",
        pincode: userDetails?.pincode ?? "",
        nomineeAadhar: userDetails?.nominee?.nomineeAadhar ?? "",
        nomineeDOB: userDetails?.nominee?.nomineeDob
          ? new Date(userDetails.nominee.nomineeDob).toISOString().split("T")[0]
          : "",
        nomineeName: userDetails?.nominee?.nomineeName ?? "",
        nomineeRelation: userDetails?.nominee?.nomineeRelation ?? "",
        bankName: userDetails?.bankDetails?.bankName ?? "",
        branchName: userDetails?.bankDetails?.branchName ?? "",
        accountNo: userDetails?.bankDetails?.accountNo ?? "",
        ifscCode: userDetails?.bankDetails?.ifscCode ?? "",
        aadhaarFront: userDetails?.kycDetails?.aadhaarFront ?? "",
        aadhaarBack: userDetails?.kycDetails?.aadhaarBack ?? "",
        panCardImage: userDetails?.kycDetails?.panCard ?? "",
        userPhoto: userDetails?.picture ?? "",
        aadharNo: userDetails?.aadharNo ?? "",
        addressProof: userDetails?.kycDetails?.addressProof ?? "",
        cheque: userDetails?.kycDetails?.cheque ?? "",
      }));
    }
  }, [userDetails]);

  const disabledFields = [
    "sponserID",
    "sponserName",
    "distributorID",
    "distributorName",
    "doj",
    "gender",
    "dob",
    "mobile",
    "email",
    "panNo",
    "accountNo",
    "ifscCode",
  ];

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      try {
        const base64 = await convertToBase64(files[0]);
        setFormData({ ...formData, [name]: base64 });
      } catch (err) {
        console.error("Error converting to base64:", err);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const getUserData = async () => {
    try {
      const data = await getProfile();
      if (data) {
        dispatch(
          loginSuccess({
            token: data?.data?.token,
            role: data?.data?.role,
            user: data?.data?.data,
          })
        );
      }
    } catch (err) {
      console.error("Failed to fetch updated user profile", err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const optionalFields = [
      "nomineeName",
      "nomineeRelation",
      "nomineeDOB",
      "nomineeAadhar",
    ];

    // const requiredFields = Object.keys(formData).filter(
    //   (key) => !optionalFields.includes(key)
    // );

    // const emptyFields = requiredFields.filter(
    //   (key) => formData[key] === "" || formData[key] === null
    // );

    // if (emptyFields.length > 0) {
    //   Swal.fire({
    //     toast: true,
    //     icon: "error",
    //     title: "Please fill all required fields before submitting.",
    //     position: "top-end",
    //     showConfirmButton: false,
    //     timer: 3000,
    //     timerProgressBar: true,
    //     customClass: {
    //       popup: "swal2-toast",
    //     },
    //   });
    //   return;
    // }
    // console.log("Form submitted:", formData);

    try {
      setLoading(true);
      const response = await profileUpdate(formData);

      if (response?.success) {
        // dispatch(
        //   loginSuccess({
        //     token: response?.token,
        //     role: response?.role,
        //     user: response?.data,
        //   })
        // );
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "user verify successfully",
        });
        setFormData({
          userPhoto: null,
          panCardImage: null,
          aadhaarFront: null,
          aadhaarBack: null,
          addressProof: null,
          cheque: null,
          fatherName: "",
          profession: "",
          maritalStatus: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          nomineeName: "",
          nomineeRelation: "",
          nomineeDOB: "",
          nomineeAadhar: "",
          bankName: "",
          branchName: "",
          aadharNo: "",
        });
        await getUserData();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response?.data?.msg || "Something went wrong",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.msg || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <form
        className="space-y-6 p-4 bg-white shadow rounded-xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold">Image Upload</h2>
        <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-4 gap-4">
          {[
            "userPhoto",
            "panCardImage",
            "aadhaarFront",
            "aadhaarBack",
            "cheque",
            "addressProof",
          ].map((field) => (
            <div
              key={field}
              className="border p-2 rounded-md flex flex-col gap-2"
            >
              <label className="block font-medium text-sm capitalize">
                {field.replace(/([A-Z])/g, " $1")}:
              </label>

              {formData[field] ? (
                <img
                  src={
                    typeof formData[field] === "string"
                      ? formData[field]
                      : URL.createObjectURL(formData[field])
                  }
                  alt={field}
                  className="w-full h-32 object-cover rounded"
                />
              ) : (
                <>
                  <InputField
                    type="file"
                    name={field}
                    onChange={handleChange}
                    accept=".jpg,.jpeg,.png"
                  />
                  <p className="text-xs text-gray-500">
                    Max: 250KB | jpg/jpeg/png
                  </p>
                </>
              )}
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold">Personal Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            ["sponserID", "Sponsor ID"],
            ["sponserName", "Sponsor Name"],
            ["distributorID", "Distributor ID"],
            ["distributorName", "Distributor Name"],
            ["doj", "Date of Joining"],
            ["gender", "Gender"],
            ["fatherName", "Father's Name"],
            ["dob", "Date of Birth"],
            ["mobile", "Mobile Number"],
            ["profession", "Profession"],
            ["email", "Email ID"],
            ["aadharNo", "Aadhar No"],
            ["maritalStatus", "Marital Status"],
          ].map(([name, label]) => (
            <InputField
              label={label}
              key={name}
              type="text"
              name={name}
              value={formData[name] || ""}
              placeholder={label}
              onChange={handleChange}
              disabled={disabledFields.includes(name)}
              className="border p-2 rounded w-full"
            />
          ))}
        </div>

        <h2 className="text-xl font-bold">Permanent Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["address", "city", "state", "pincode"].map((field) => (
            <InputField
              key={field}
              type="text"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={formData[field] || ""}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              onChange={handleChange}
              disabled={disabledFields.includes(name)}
              className="border p-2 rounded w-full"
            />
          ))}
        </div>

        <h2 className="text-xl font-bold">Nominee Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            "nomineeName",
            "nomineeRelation",
            "nomineeDOB",
            "nomineeAadhar",
          ].map((field) => (
            <InputField
              key={field}
              type={field === "nomineeDOB" ? "date" : "text"}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={formData[field] || ""}
              placeholder={field.replace("nominee", "Nominee ")}
              onChange={handleChange}
              disabled={disabledFields.includes(field)}
              className="border p-2 rounded w-full"
            />
          ))}
        </div>

        <h2 className="text-xl font-bold">Bank Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["bankName", "branchName", "accountNo", "ifscCode"].map((field) => (
            <InputField
              key={field}
              type="text"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={formData[field] || ""}
              placeholder={field.replace(/([A-Z])/g, " $1")}
              onChange={handleChange}
              disabled={disabledFields.includes(name)}
              className="border p-2 rounded w-full"
            />
          ))}
        </div>

        <h2 className="text-xl font-bold">PAN Details</h2>
        <InputField
          type="text"
          name="panNo"
          value={formData.panNo || ""}
          placeholder="PAN Number"
          onChange={handleChange}
          disabled
          className="border p-2 rounded w-full"
        />

        {/* {!userDetails.status && (
          <button
            type="submit"
            className="bg-bg-color text-white px-4 py-2 rounded mt-6"
          >
            Save Changes
          </button>
        )} */}

        {(userDetails?.kycDetails?.status === "REQUESTED" || userDetails?.kycDetails?.status === "REJECTED"||userDetails?.kycDetails?.status === "PENDING" ) && (
          <button
            type="submit"
            className="bg-bg-color text-white px-4 py-2 rounded mt-6"
          >
            Save Changes
          </button>
        )}
      </form>

      {loading && <PageLoader />}
    </div>
  );
};

export default ProfileForm;
