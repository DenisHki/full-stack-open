import { useState, useEffect } from "react";
import axios from "axios";
import CountryFilter from './Components/CountryFilter';
import CountryList from './Components/CountryList';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

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

  return (
    <div>
      <CountryFilter filter={filter} handleFilterChange={handleFilterChange} />
      <CountryList filteredCountries={filteredCountries} />
    </div>
  );
}

export default App;
