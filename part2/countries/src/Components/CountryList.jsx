import CountryDetails from "./CountryDetails";

const CountryList = ({ filteredCountries, onShowCountry }) => {
  if (filteredCountries.length === 0) {
    return <p>No names to show</p>;
  } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.cca3}>
            {country.name.common}{" "}
            <button type="button" onClick={() => onShowCountry(country)}>
              Show
            </button>
          </li>
        ))}
      </ul>
    );
  } else if (filteredCountries.length === 1) {
    return <CountryDetails country={filteredCountries[0]} />;
  }

  return null;
};

export default CountryList;
