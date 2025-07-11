import React, { useState  , useEffect} from 'react';



export default function Search() {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    // Perform search action (e.g., API call)
    console.log('Searching for:', query);
  };


  useEffect(() => {
//   const timer = setTimeout(() => {
//     setDebouncedQuery(searchQuery);
//   }, 300); // 300ms delay
//   return () => clearTimeout(timer);



}, []);

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search Your Employee ."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
}
