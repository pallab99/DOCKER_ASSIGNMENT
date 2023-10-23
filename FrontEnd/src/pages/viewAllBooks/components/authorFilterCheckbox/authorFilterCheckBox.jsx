/* eslint-disable react/prop-types */
import Loader from "../../../../components/ui/loader/loader";
import useGetAllAuthors from "../../../../hooks/book/useGetAllAuthors";

const AuthorFilterCheckbox = (props) => {
  const { data, loading } = useGetAllAuthors();
  console.log("authors", data);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {data?.map((ele, index) => {
            return (
              <form key={index} noValidate>
                <input
                  type="checkbox"
                  id={ele}
                  name={ele}
                  value={ele}
                  onClick={props.handleCheckboxChange}
                  {...props.register(ele)}
                />
                <label htmlFor={ele}> {ele}</label>
                <br />
                <br />
              </form>
            );
          })}
        </>
      )}
    </div>
  );
};

export default AuthorFilterCheckbox;
