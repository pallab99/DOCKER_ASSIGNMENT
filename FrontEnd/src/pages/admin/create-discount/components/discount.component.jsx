import { Controller, useForm } from 'react-hook-form';
import TextInput from '../../../../components/form/text-input/textInput.component';
import './discount.style.scss';
import { containsSpecialChars } from '../../../../helper/isContainSpecialCharacters';
import Button from '../../../../components/ui/button/button.component';
import Loader from '../../../../components/ui/loader/loader';
import { useEffect, useState } from 'react';
import discountApi from './../../../../api/DiscountApi';
import { ToastContainer, toast } from 'react-toastify';
import { alertConfigs } from '../../../../utils/alertConfig';
import { useNavigate } from 'react-router-dom';
import MultiSelect from '../../../../components/form/multi-select/multiSelect';
import SideBar from '../../dashboard/components/sideBar/sideBar.components';
import useGetAllBooksAdmin from '../../../../hooks/book/useGetAllBooksAdmin';
import ButtonLoader from '../../../../components/ui/button-loader';

const Discount = () => {
  const navigate = useNavigate();
  const { data, loading } = useGetAllBooksAdmin();
  const [bookIds, setBookIds] = useState([]);
  const [btnClicked, setBtnClicked] = useState(false);
  useEffect(() => {
    if (data) {
      const mappedBookIds = data.map((book) => ({
        value: book._id,
        label: book.title,
      }));
      setBookIds(mappedBookIds);
    }
  }, [data]);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      discount: '',
      bookId: '',
      startDate: '',
      endDate: '',
      country: '',
    },
  });

  const country = [
    { value: 'BD', label: 'BD' },
    { value: 'IND', label: 'IND' },
    { value: 'US', label: 'US' },
  ];

  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
      setTimeout(() => {
        navigate('/discount/all');
      }, 2000);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const handleAddDiscount = async (data) => {
    setBtnClicked(true);
    try {
      const bookId = data?.bookId?.map((ele) => ele?.value);
      const country = data?.country?.map((ele) => ele?.value);
      const discountData = {
        discountPercentage: Number(data?.discount),
        bookId,
        startDate: data?.startDate,
        endDate: data?.endDate,
        country,
      };
      const res = await discountApi.addNewDiscount(discountData);
      showAlert(res.data);
    } catch (error) {
      showAlert(error.response);
      setBtnClicked(false);
    } finally {
      setBtnClicked(false);
    }
  };
  return (
    <div className="admin-sidebar-alignment">
      <SideBar></SideBar>
      {loading ? (
        <Loader />
      ) : (
        <div className="discount-container width-94">
          <p className="form-title">Add Discount </p>
          <form
            className="discount-form"
            onSubmit={handleSubmit(handleAddDiscount)}
          >
            <div className="discount-input input-container">
              <p className="font-18 font-bold mb-5">Discount Percentage</p>

              <Controller
                name="discount"
                control={control}
                rules={{
                  required: 'Discount price is required',
                  valueAsNumber: true,
                  min: {
                    value: 5,
                    message: 'Discount Percentage can not be less than 5',
                  },
                  max: {
                    value: 40,
                    message: 'Discount Percentage can not be greater than 40',
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    placeholder={'Enter discount as number.Ex : 20'}
                    fieldValues={field}
                    className={'text-input'}
                    type={'number'}
                  />
                )}
              />
              <span className="error-message">
                {errors?.discount && errors?.discount?.message}
              </span>
            </div>

            <div className="discount-input input-container">
              <p className="font-18 font-bold mb-5">Select Discount Books</p>

              <Controller
                name="bookId"
                control={control}
                rules={{
                  required: 'bookId price is required',
                }}
                render={({ field }) => (
                  <MultiSelect options={bookIds} field={field}></MultiSelect>
                )}
              />
              <span className="error-message">
                {errors?.bookId && errors?.bookId?.message}
              </span>
            </div>

            <div className="discount-input input-container">
              <p className="font-18 font-bold mb-5">Discount Start Date</p>

              <Controller
                name="startDate"
                control={control}
                rules={{
                  required: 'startDate is required',
                  validate: (value) => {
                    if (containsSpecialChars(value)) {
                      return 'Invalid value provided';
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    placeholder={'Enter Your startDate'}
                    fieldValues={field}
                    className={'text-input'}
                    type="date"
                  />
                )}
              />
              <span className="error-message mt-5 mb-5">
                {errors?.startDate && errors?.startDate?.message}
              </span>
            </div>

            <div className="discount-input input-container">
              <p className="font-18 font-bold mb-5">Discount End Date</p>

              <Controller
                name="endDate"
                control={control}
                rules={{
                  required: 'endDate is required',
                  validate: (value) => {
                    if (containsSpecialChars(value)) {
                      return 'Invalid value provided';
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    placeholder={'Enter Your endDate'}
                    fieldValues={field}
                    className={'text-input'}
                    type="date"
                  />
                )}
              />
              <span className="error-message mt-5 mb-5">
                {errors?.endDate && errors?.endDate?.message}
              </span>
            </div>

            <div className="discount-input input-container">
              <p className="font-18 font-bold mb-5">Select Discount Region</p>

              <Controller
                name="country"
                control={control}
                rules={{
                  required: 'country is required',
                }}
                render={({ field }) => (
                  <MultiSelect options={country} field={field}></MultiSelect>
                )}
              />
              <span className="error-message">
                {errors?.country && errors?.country?.message}
              </span>
            </div>
            <div className="discount-btn-div mt-20">
              {btnClicked ? (
                <ButtonLoader />
              ) : (
                <Button className={'add-discount-btn'} text={'Submit'}></Button>
              )}
            </div>
          </form>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default Discount;
