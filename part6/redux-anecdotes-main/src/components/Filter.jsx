import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filter = event.target.value;
    dispatch(filterChange(filter));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Filter{" "}
      <input
        type="text"
        name="filter"
        placeholder="search anecdote"
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;
