const CountryFilter = ({ filter, handleFilterChange }) => {

  //const {filter, handleFilterChange} = props

  return (
    <div>
      <label htmlFor="countryFilter">Find countries: </label>
      <input
        id="countryFilter"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Search for a country..."
      />
    </div>
  );
};

export default CountryFilter;
