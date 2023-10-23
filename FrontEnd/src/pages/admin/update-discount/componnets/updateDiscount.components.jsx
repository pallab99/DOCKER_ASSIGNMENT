/* eslint-disable react-hooks/exhaustive-deps */
import { Controller, useForm } from 'react-hook-form';
import TextInput from '../../../../components/form/text-input/textInput.component';
import './updateDiscount.style.scss';
import { containsSpecialChars } from '../../../../helper/isContainSpecialCharacters';
import Button from '../../../../components/ui/button/button.component';
import Loader from '../../../../components/ui/loader/loader';
import { useEffect, useState } from 'react';
import discountApi from './../../../../api/DiscountApi.js';
import { ToastContainer, toast } from 'react-toastify';
import { alertConfigs } from '../../../../utils/alertConfig';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGetDiscountById from '../../../../hooks/discount/useGetDiscountById';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import useGetAllBooksAdmin from '../../../../hooks/book/useGetAllBooksAdmin';
import SideBar from '../../dashboard/components/sideBar/sideBar.components';
import ButtonLoader from '../../../../components/ui/button-loader';
const animatedComponents = makeAnimated();
const UpdateDiscount = () => {
  const { discountId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log('state', state);
  const { data, loading } = useGetAllBooksAdmin();
  const [bookIds, setBookIds] = useState([]);
  const [updateDiscount, setUpdateDiscount] = useState([]);
  const { discountData, isDiscountLoading } = useGetDiscountById(discountId);
  const [defaultBookIds, setDefaultBookIds] = useState([]);
  const [defaultCountry, setDefaultCountry] = useState([]);
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
  useEffect(() => {
    if (window != undefined) {
      if (discountData) {
        setUpdateDiscountData();
      }
    }
  }, [discountData, data, state]);
  const setUpdateDiscountData = () => {
    console.log(state);
    const mappedDefaultBookIds = state?.bookIds?.map((book) => ({
      value: book._id,
      label: book.title,
    }));
    const mappedDefaultCountry = state?.counties?.map((country) => ({
      value: country,
      label: country,
    }));
    setDefaultBookIds(mappedDefaultBookIds);
    setDefaultCountry(mappedDefaultCountry);
    setUpdateDiscount({
      discount: state?.discountPercentage,
      bookId: defaultBookIds,
      startDate: state?.startDate.split('T')[0],
      endDate: state?.endDate.split('T')[0],
      country: defaultCountry,
    });
  };

  const {
    handleSubmit,
    control,
    setValue,
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

  useEffect(() => {
    if (updateDiscount) {
      for (const [key, value] of Object.entries(updateDiscount)) {
        setValue(key, value);
      }
    }
  }, [updateDiscount, setValue]);

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
        endDate: data?.endDate,
        country,
      };
      if (state.startDate != data.startDate) {
        discountData.startDate = data.startDate;
      }
      console.log('discount data', discountData);
      const res = await discountApi.updateDiscountById(
        discountId,
        discountData
      );
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
      {loading && isDiscountLoading ? (
        <Loader />
      ) : (
        <>
          {!discountId.match(/^[0-9a-fA-F]{24}$/) && navigate('/*')}
          <div className="discount-container width-600px">
            <div className="create-book-header mb-20">
              <span className="font-30 font-bold">
                Update An Existing Discount
              </span>
              <span className="font-18 mb-10 mt-5">
                Update information of a discount
              </span>
            </div>

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
                <p className="font-18 font-bold mb-5">Discounted Books </p>

                <Controller
                  name="bookId"
                  control={control}
                  rules={{
                    required: 'bookId is required',
                  }}
                  render={({ field }) => (
                    <Select
                      placeholder="Unselect the default bookId before updating"
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      defaultInputValue={defaultBookIds}
                      isMulti
                      options={bookIds}
                      {...field}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused ? 'grey' : 'royalBlue',
                        }),
                      }}
                      // key={state || defaultBookIds}
                    />
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
                <p className="font-18 font-bold mb-5">Discount Region</p>

                <Controller
                  name="country"
                  control={control}
                  rules={{
                    required: 'country is required',
                  }}
                  render={({ field }) => (
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      defaultValue={updateDiscount?.country}
                      isMulti
                      options={country}
                      {...field}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused ? 'grey' : 'royalBlue',
                        }),
                      }}
                      // key={state || defaultCountry}
                    />
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
                  <Button
                    className={'add-discount-btn'}
                    text={'Submit'}
                  ></Button>
                )}
              </div>
            </form>
            <ToastContainer />
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateDiscount;
