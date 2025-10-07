import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { userNewPassword } from '../../../api/user.api';
import { Routers } from '../../../constants/Routes';
import Button from '../../../Component/Button';
import InputField from '../../../Component/InputField';
import PageLoader from '../../../Component/PageLoader';

const ChangePassword1 = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState({});
  const [payload, setPayload] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
    setValidationError((prev) => ({ ...prev, [name]: '' }));
  };

  const navigateToHomePage = () => {
    navigate(Routers.Login);
  };

  const handleSubmit = async () => {
    const errors = {};
    if (!payload.password) errors.password = 'Please enter your current password.';
    if (!payload.newPassword) errors.newPassword = 'Please enter a new password.';
    if (!payload.confirmPassword) errors.confirmPassword = 'Please confirm your new password.';
    if (payload.newPassword && payload.confirmPassword && payload.newPassword !== payload.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
      return;
    }

    try {
      setSubmitting(true);
      const data = await userNewPassword({
        password: payload.password,
        newPassword: payload.newPassword,
      });
      console.log(data);
      

      if (data?.success) {
        Swal.fire({
          icon: 'success',
          title: data?.message,
          text: data?.message || 'Password changed successfully.',
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: data?.message || 'Password change failed. Try again.',
        });
      }
    } catch (error) {
      console.error('Change Password failed:', error);
      setValidationError({ form: 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full p-4 md:py-10 bg-white rounded-lg">
        <div className="max-w-md mx-auto p-5 flex flex-col gap-5 rounded-xl border bg-[#ffffff6e] backdrop-blur-md">
          <h1 className="text-base md:text-xl text-center">Change Password</h1>
          <div className="flex flex-col gap-4">
            <InputField
              type="password"
              name="password"
              label="Current Password"
              value={payload.password}
              onChange={handleChange}
            />
            {validationError.password && (
              <p className="text-red-500 text-sm mt-1">{validationError.password}</p>
            )}

            <InputField
              type="password"
              name="newPassword"
              label="New Password"
              value={payload.newPassword}
              onChange={handleChange}
            />
            {validationError.newPassword && (
              <p className="text-red-500 text-sm mt-1">{validationError.newPassword}</p>
            )}

            <InputField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              value={payload.confirmPassword}
              onChange={handleChange}
            />
            {validationError.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{validationError.confirmPassword}</p>
            )}

            {validationError.form && (
              <p className="text-red-500 text-sm mt-1">{validationError.form}</p>
            )}

            <Button
              title={'Change Password'}
              disabled={submitting}
              className="bg-bg-color px-4 py-3 text-sm rounded-md text-white text-center w-full disabled:opacity-50"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>

      {submitting  && (
        <div>
          <PageLoader/>
        </div>
      )}
    </div>
  );
};

export default ChangePassword1;
