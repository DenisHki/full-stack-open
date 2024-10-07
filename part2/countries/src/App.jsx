import { useState, useEffect } from "react";
import axios from "axios";
import CountryFilter from "./Components/CountryFilter";
import CountryList from "./Components/CountryList";
import CountryDetails from "./Components/CountryDetails";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setCountries(res.data);
      });
  }, []);

  useEffect(() => {
    if (filter) {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  }, [filter, countries]);

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  const handleReset = () => {
    setSelectedCountry(null);
  };

  return (
    <div>
      <CountryFilter filter={filter} handleFilterChange={handleFilterChange} />
      {selectedCountry ? (
        <div>
          <CountryDetails country={selectedCountry} />
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <CountryList
          filteredCountries={filteredCountries}
          onShowCountry={handleShowCountry}
        />
      )}
    </div>
  );
}

export default App;
