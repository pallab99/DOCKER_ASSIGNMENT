/* eslint-disable react/prop-types */
export default function CateGoryFilterCheckbox(props) {
  return (
    <form noValidate>
      <input
        type="checkbox"
        id="classic"
        name="classic"
        value="Classic"
        onClick={props.handleCheckboxChange}
        {...props.register('classic')}
      />
      <label htmlFor="classic"> Classic</label>
      <br />
      <br />
      <input
        type="checkbox"
        id="fantasy"
        name="fantasy"
        value="Fantasy"
        onClick={props.handleCheckboxChange}
        {...props.register('fantasy')}
      />
      <label htmlFor="fantasy"> Fantasy</label>
      <br />
      <br />
      <input
        type="checkbox"
        id="novel"
        name="novel"
        value="Novel"
        onClick={props.handleCheckboxChange}
        {...props.register('novel')}
      />
      <label htmlFor="novel"> Novel</label>
      <br />
      <br />
      <input
        type="checkbox"
        id="poem"
        name="poem"
        value="Poem"
        onClick={props.handleCheckboxChange}
        {...props.register('poem')}
      />
      <label htmlFor="poem"> Poem</label>
      <br />
      <br />
    </form>
  );
}
