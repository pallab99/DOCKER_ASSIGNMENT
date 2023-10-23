import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Button from "../../../../components/ui/button/button.component";

/* eslint-disable react/prop-types */
export default function AllUserButtonGroup({
  onEditClick,
  btnClicked,
  onDeleteClick,
  row,
}) {
  return (
    <>
      <Button
        className={"normal-btn"}
        text={<AiFillEdit />}
        handleButtonClick={() => onEditClick(row.original._id, row.original)}
      >
        Edit
      </Button>
      <Button
        className={"normal-btn"}
        text={<AiFillDelete />}
        disabled={btnClicked}
        handleButtonClick={() => onDeleteClick(row.original._id)}
      >
        Delete
      </Button>
    </>
  );
}
