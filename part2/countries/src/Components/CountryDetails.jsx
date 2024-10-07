const CountryDetails = ({ country }) => {
  const languages = Object.values(country.languages);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {languages.map((lang, index) => (
          <li key={index}>{lang}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        style={{ width: "200px" }}
      />
    </div>
  );
};

export default CountryDetails;
