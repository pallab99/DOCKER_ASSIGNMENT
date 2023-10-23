/* eslint-disable react/prop-types */
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const MultiSelect = ({ options, field, defaultValues = [] }) => {
  console.log(defaultValues);
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultInputValue={defaultValues}
      isMulti
      options={options}
      {...field}
    />
  );
};

export default MultiSelect;
