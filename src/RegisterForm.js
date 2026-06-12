import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterForm() {
  let navigate = useNavigate();

  // 1. Form Inputs State
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [number, setNumber] = useState("");
  let [selectedStateId, setSelectedStateId] = useState(""); 
  let [city, setCity] = useState("");
  let [password, setPassword] = useState("");

  // 2. MVC Async Data Storage Lists
  let [statesList, setStatesList] = useState([]);
  let [citiesList, setCitiesList] = useState([]);

  // 3. Validation UI Error States
  let [usernameError, setUsernameError] = useState(false);
  let [emailError, setEmailError] = useState(""); 
  let [numberError, setNumberError] = useState(false);
  let [statesError, setStatesError] = useState(false);
  let [cityError, setCityError] = useState(false);
  let [passwordError, setPasswordError] = useState(false);

  // Hook A: Fetch Master States from Router Layer on Mount
  useEffect(() => {
    let fetchStates = async () => {
      try {
        let response = await fetch('http://localhost:5000/api/states');
        let data = await response.json();
        setStatesList(data);
      } catch (error) {
        console.error("MVC View Error - States array fetch crash:", error);
      }
    };
    fetchStates();
  }, []);

  // Hook B: Fetch Dependent Cities when State ID Selection Modifies
  useEffect(() => {
    if (!selectedStateId) {
      setCitiesList([]);
      return;
    }
    let fetchCities = async () => {
      try {
        let response = await fetch(`http://localhost:5000/api/cities/${selectedStateId}`);
        let data = await response.json();
        setCitiesList(data);
      } catch (error) {
        console.error("MVC View Error - Cities array fetch crash:", error);
      }
    };
    fetchCities();
  }, [selectedStateId]);
  
  // Clean Action Handler without old hardcoded variable dependencies
  let handleStateChange = (e) => {
    setSelectedStateId(e.target.value);
    setCity(""); // Reset target city lookup choice
    setStatesError(false);
  };
  
  let handleSubmit = async (e) => {
    e.preventDefault();
    
    setUsernameError(false);
    setEmailError("");
    setNumberError(false);
    setStatesError(false);
    setCityError(false);
    setPasswordError(false);

    let hasError = false;

    if (username === "") { setUsernameError(true); hasError = true; }
    
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      setEmailError("Email is required");
      hasError = true;
    } else if (emailRegex.test(email) === false) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }

    if (number === "") { setNumberError(true); hasError = true; }
    if (selectedStateId === "") { setStatesError(true); hasError = true; }
    if (city === "") { setCityError(true); hasError = true; }
    if (password === "") { setPasswordError(true); hasError = true; }

    if (hasError === true) return;

    // Convert internal database ID back to plain text name string for submission
    let stateNameObj = statesList.find(s => s.id === parseInt(selectedStateId));
    let states = stateNameObj ? stateNameObj.name : "";

    try {
      let response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, number, states, city, password })
      });

      let data = await response.json();

      if (response.status === 201 || data.Res === "Success") {
        alert("Registration Successful! Redirecting to login...");
        navigate('/login');
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("Cannot connect to backend server controller application.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label><br />
        <input type='text' id="username" value={username} onChange={(e) => {
          setUsername(e.target.value);
          if (e.target.value !== "") setUsernameError(false);
        }} /><br />
        {usernameError && <span style={{ color: 'red' }}><small>Username is required</small></span>}<br />
        
        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" value={email} onChange={(e) => {
          setEmail(e.target.value);
          if (e.target.value !== "") setEmailError("");
        }} /><br />
        {emailError && <span style={{ color: 'red' }}><small>{emailError}</small></span>}<br />
        
        <label htmlFor="number">Phone Number:</label><br />
        <input type="tel" id="number" value={number} maxLength="10" onChange={(e) => {
          let onlyNums = e.target.value.replace(/[^0-9]/g, '');
          setNumber(onlyNums);
          if (e.target.value !== "") setNumberError(false);
        }} /><br />
        {numberError && <span style={{ color: 'red' }}><small>Phone number is required</small></span>}<br />
        
        <label htmlFor="state">State:</label><br />
        <select id="state" value={selectedStateId} onChange={handleStateChange}>
          <option value="" hidden>Select a state</option>
          {Array.isArray(statesList) &&statesList.map((stateItem) => (
            <option key={stateItem.id} value={stateItem.id}>{stateItem.name}</option>
          ))}
        </select><br />
        {statesError && <span style={{ color: 'red' }}><small>State is required</small></span>}<br />
        
        <label htmlFor="city">City:</label><br />
        <select 
          id="city" 
          value={city} 
          onChange={(e) => {
            setCity(e.target.value);
            if (e.target.value !== "") setCityError(false);
          }} 
          disabled={!selectedStateId}
        >
          <option value="" hidden>Select a city</option>
          {Array.isArray(citiesList) && citiesList.map((cityItem) => (
            <option key={cityItem.id} value={cityItem.name}>{cityItem.name}</option>
          ))}
        </select><br />
        {cityError && <span style={{ color: 'red' }}><small>City is required</small></span>}<br />
        
        <label htmlFor="password">Password:</label><br />
        <input type='password' id="password" value={password} onChange={(e) => {
          setPassword(e.target.value);
          if (e.target.value !== "") setPasswordError(false);
        }} /><br />
        {passwordError && <span style={{ color: 'red' }}><small>Password is required</small></span>}<br /><br />
        
        <button type='submit'>Register</button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
