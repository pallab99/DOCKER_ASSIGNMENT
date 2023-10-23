import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import Button from "../../../../../components/ui/button/button.component";

/* eslint-disable react/prop-types */
export default function AllBooksActionButtonGroup({
  onOpenClick,
  onEditClick,
  onDeleteClick,
  row,
}) {
  return (
    <div className="flex">
      <Button
        className={"normal-btn"}
        text={<AiFillEye />}
        handleButtonClick={() => onOpenClick(row.original._id)}
      ></Button>
      <Button
        className={"normal-btn"}
        text={<AiFillEdit />}
        handleButtonClick={() => onEditClick(row.original._id)}
      ></Button>
      <Button
        className={"normal-btn"}
        text={<AiFillDelete />}
        handleButtonClick={() => onDeleteClick(row.original._id)}
      ></Button>
    </div>
  );
}
