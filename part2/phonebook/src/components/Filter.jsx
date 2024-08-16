const Filter = (props) => {
  return (
    <div>
      Find number by name:{" "}
      <input value={props.filtered} onChange={props.handleFilteredbyName} />
    </div>
  );
};

export default Filter;
