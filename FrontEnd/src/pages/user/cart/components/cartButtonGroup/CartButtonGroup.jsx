import Button from "../../../../../components/ui/button/button.component";
import { debounce } from "lodash";

/* eslint-disable react/prop-types */
export default function CartButtonGroup({
  handleCartItemIncrease,
  cartData,
  index,
  handleCartItemDecrease,
}) {
  const debouncedIncrease = debounce(
    () => handleCartItemIncrease(cartData[index]?.book?._id),
    500
  );
  const debouncedDecrease = debounce(
    () => handleCartItemDecrease(cartData[index]?.book?._id),
    500
  );
  return (
    <>
      <Button
        className={"plus-btn"}
        text={"+"}
        handleButtonClick={debouncedIncrease}
      ></Button>
      <span>{cartData[index]?.quantity}</span>
      <Button
        className={"minus-btn"}
        text={"-"}
        handleButtonClick={debouncedDecrease}
      ></Button>
    </>
  );
}
