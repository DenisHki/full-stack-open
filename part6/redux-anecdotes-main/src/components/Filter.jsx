import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";


const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filter = event.target.value;
    dispatch(filterChange(filter));
    console.log(event.target.value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input type="text" name="filter" onChange={handleChange} />
    </div>
  );
};

export default Filter;
