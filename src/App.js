import React, { useState, useRef } from 'react';

function App() {
  // useState to hold the name entered by the user
  const [name, setName] = useState('');
  // useState to hold the nationality prediction result
  const [countryInfo, setCountryInfo] = useState(null);
  // useRef to auto-focus the input field when the page loads
  const inputRef = useRef(null);

  // Function to fetch nationality prediction from the API
  const fetchNationality = async () => {
    if (!name) return; // Do nothing if input is empty

    try {
      // Fetch data from nationalize.io API
      const response = await fetch(`https://api.nationalize.io?name=${name}`);
      const data = await response.json();

      // If the API returns country data, use the first result
      if (data.country && data.country.length > 0) {
        setCountryInfo(data.country[0]);
      } else {
        // No results found
        setCountryInfo(null);
      }
    } catch (error) {
      // Handle any errors during fetch
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Nationality Predictor</h1>

      {/* Input field for user to enter name */}
      <input
        type="text"
        ref={inputRef} // Connects to useRef for autoFocus
        autoFocus // Automatically focuses input on load
        value={name} // Controlled component: value comes from state
        placeholder="Enter a name"
        onChange={(e) => setName(e.target.value)} // Update state on input change
        style={styles.input}
      />

      {/* Button to trigger nationality prediction */}
      <button onClick={fetchNationality} style={styles.button}>
        Predict Nationality
      </button>

      {/* Display results if available */}
      {countryInfo ? (
        <div style={styles.result}>
          <p><strong>Country ID:</strong> {countryInfo.country_id}</p>
          <p><strong>Probability:</strong> {countryInfo.probability.toFixed(2)}</p>
        </div>
      ) : (
        // If no results but name is entered, show message
        name && <p>No nationality data found.</p>
      )}
    </div>
  );
}

// Inline styles for the app
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '2rem',
    textAlign: 'center'
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    marginRight: '0.5rem'
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  result: {
    marginTop: '1rem',
    fontSize: '1.1rem'
  }
};

export default App;