import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import "./Searchbar.css";

const Searchbar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  // Funktion zum Abrufen von Suchergebnissen über eine API-Anfrage
  const fetchData = async (searchTerm, category) => {
    try {
      let url = "/search";
      // Aufbau der URL für die API-Anfrage unter Berücksichtigung der Suchbegriffe und Kategorie
      if (category) {
        url += `?category=${category}&searchTerm=${searchTerm}`;
      } else {
        url += `?searchTerm=${searchTerm}`;
      }
      // Ausführen der API-Anfrage mit axios
      const response = await axios.get(url);
      // Aktualisieren des State mit den erhaltenen Suchergebnissen
      navigate(`/search?category=${category}&searchTerm=${searchTerm}`);
    } catch (error) {
        // Fehlerbehandlung bei fehlgeschlagener API-Anfrage
        console.error("Error fetching data:", error);
    }
  };

  // Funktion zum Auslösen der Suche, wenn auf das Suchsymbol geklickt wird
  const handleSearch = () => {
    console.log('Search button clicked');
    fetchData(input.toLowerCase(), selectedCategory);
  };

  // Funktion zum Aktualisieren des Eingabewerts im State, wenn sich der Benutzer ändert
  const handleChange = (value) => {
    setInput(value);
    //fetchData(value, selectedCategory);
  };

  // Funktion zum Aktualisieren der ausgewählten Kategorie im State
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchData(input.toLowerCase(), category);
  };

  //const [query, setQuery] = useState("");
  console.log();

  return (
    <div className="input-wrapper">
        {/* Suchfeld */}
      <input
        className="search"
        type="text"
        placeholder="Search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      {/* Dropdown-Liste für die Kategorien */}
      <select
        onChange={(e) => handleCategoryChange(e.target.value)}
        value={selectedCategory}
      >
        <option value="">All</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="dessert">Dessert</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="drinks">Drinks</option>
      </select>

      {/* Symbol zum Auslösen der Suche */}
      <FaSearch id="search-icon" onClick={handleSearch}/>
    </div>
  );
};

export default Searchbar;