/* eslint-disable react/prop-types */
import "./button.style.scss";
import ButtonLoader from "../button-loader";
export default function Button({
  className,
  text,
  handleButtonClick,
  btnClicked,
  disabled = false,
}) {
  return (
    <div className="btn-container">
      {btnClicked ? (
        <ButtonLoader></ButtonLoader>
      ) : (
        <button
          className={className}
          onClick={handleButtonClick}
          disabled={disabled}
        >
          {text}
        </button>
      )}
    </div>
  );
}
