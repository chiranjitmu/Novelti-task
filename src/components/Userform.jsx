import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/formSlice";
import "./UserForm.css";
import * as Yup from "yup";

function UserForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    country: "",
    state: "",
    zipCode: "",
    address1: "",
    address2: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const headers = new Headers();
    headers.append("X-CSCAPI-KEY", import.meta.env.VITE_COUNTRY_API);

    const requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    const fetchCountryData = async () => {
      try {
        const response = await fetch(
          "https://api.countrystatecity.in/v1/countries",
          requestOptions
        );
        const result = await response.json();
        setCountries(result);
      } catch (error) {
        console.error("Error:", error);
        setResponse("An error occurred while fetching countries.");
      }
    };

    fetchCountryData();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const headers = new Headers();
      headers.append("X-CSCAPI-KEY", import.meta.env.VITE_COUNTRY_API);

      const requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
      };

      const fetchStateData = async () => {
        try {
          const response = await fetch(
            `https://api.countrystatecity.in/v1/countries/${selectedCountry}/states`,
            requestOptions
          );
          const result = await response.json();
          setStates(result);
        } catch (error) {
          console.error("Error:", error);
          setResponse("An error occurred while fetching states.");
        }
      };

      fetchStateData();
    }
  }, [selectedCountry]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Yup validation schema
    const validationSchema = Yup.object().shape({
      firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, "First Name must contain only characters")
      .required("First Name is required")
      .min(5, "First Name must be at least 5 characters"),
    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, "Last Name must contain only characters")
      .required("Last Name is required")
      .min(5, "Last Name must be at least 5 characters"),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Invalid email format"
      )
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    address1: Yup.string().required("Address is required"),
    zipCode: Yup.string()
      .matches(/^\d+$/, "Zip Code must contain only numbers")
      .required("Zip Code is required")
      .min(6, "Give a valid zip-code")
      .max(6, "Give a valid zip-code"),
    });

    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        const user = { ...formData, id: new Date().getTime() };
        dispatch(addUser(user));
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          country: "",
          state: "",
          zipCode: "",
          address1: "",
          address2: "",
        });
        setSelectedCountry("")
      })
      .catch((errors) => {
        alert(
          Object.values(errors.inner)
            .map((error) => error.message)
            .join("\n")
        );
      });
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setFormData({
      ...formData,
      country: e.target.options[e.target.selectedIndex].text,
    });
    setStates([]); // Reset states when country changes
  };

  return (
    <div className="form-container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Mobile:</label>
          <input
            type="tel"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Country:</label>
          <select
            className="select-input"
            value={selectedCountry}
            onChange={handleCountryChange}
            required
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.iso2} value={country.iso2}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>State:</label>
          <select
            className="select-input"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.iso2} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Zip Code:</label>
          <input
            type="text"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={(e) =>
              setFormData({ ...formData, zipCode: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Address 1:</label>
          <input
            type="text"
            placeholder="Address 1"
            value={formData.address1}
            onChange={(e) =>
              setFormData({ ...formData, address1: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Address 2:</label>
          <input
            type="text"
            placeholder="Address 2"
            value={formData.address2}
            onChange={(e) =>
              setFormData({ ...formData, address2: e.target.value })
            }
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default UserForm;
