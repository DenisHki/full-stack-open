const CountryFilter = ({ filter, handleFilterChange }) => {

  return (
    <div>
      <label>Find countries: </label>
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
