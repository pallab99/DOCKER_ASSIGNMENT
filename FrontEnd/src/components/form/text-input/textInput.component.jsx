/* eslint-disable react/prop-types */
import "./textInput.style.scss";
const TextInput = ({
  placeholder,
  fieldValues,
  className,
  type = "text",
  disabled = false,
}) => {
  return (
    <input
      className={className}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      {...fieldValues}
    />
  );
};

export default TextInput;
