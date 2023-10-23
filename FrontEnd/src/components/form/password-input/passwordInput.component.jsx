/* eslint-disable react/prop-types */
import { useState } from "react";
import "./passwordInput.style.scss";
const PasswordInput = ({ placeholder, filedValues, className }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="input-wrapper">
      <input
        className={className}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        {...filedValues}
      />
      <p></p>
      <button
        className="toggle-button-password"
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
  );
};

export default PasswordInput;
