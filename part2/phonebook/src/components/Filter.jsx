const Filter = (props) => {
  return (
    <div>
      Find number by name:{" "}
      <input value={props.filtered} onChange={props.onSearchChange} />
    </div>
  );
};

export default Filter;
