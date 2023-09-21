import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, deleteUser } from "../features/formSlice";
import * as Yup from "yup";
import "./Userlist.css";

function UserList() {
  const [updatedUser, setUpdatedUser] = useState(null);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleUpdate = (user) => {
    setUpdatedUser({ ...user });
  };

  const handleSave = () => {
    const validationErrors = validateForm(updatedUser);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(updateUser(updatedUser));
      setUpdatedUser(null);
    } else {
      alert(Object.values(validationErrors).join("\n"));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const isUserSelected = (user) => {
    return updatedUser && updatedUser.id === user.id;
  };

  //validation schema using Yup
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

  const validateForm = (user) => {
    try {
      validationSchema.validateSync(user, { abortEarly: false });
      return {};
    } catch (error) {
      const errors = {};
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      return errors;
    }
  };

  return (
    <div className="user-list">
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Zip Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {isUserSelected(user) ? (
                  <input
                    type="text"
                    value={updatedUser.firstName}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        firstName: e.target.value,
                      })
                    }
                  />
                ) : (
                  user.firstName
                )}
              </td>
              <td>
                {isUserSelected(user) ? (
                  <input
                    type="text"
                    value={updatedUser.lastName}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        lastName: e.target.value,
                      })
                    }
                  />
                ) : (
                  user.lastName
                )}
              </td>
              <td>
                {isUserSelected(user) ? (
                  <input
                    type="text"
                    value={updatedUser.email}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {isUserSelected(user) ? (
                  <input
                    type="text"
                    value={updatedUser.mobile}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        mobile: e.target.value,
                      })
                    }
                  />
                ) : (
                  user.mobile
                )}
              </td>
              <td>
                {isUserSelected(user) ? (
                  <input
                    type="text"
                    value={updatedUser.address1}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        address1: e.target.value,
                      })
                    }
                  />
                ) : (
                  user.address1
                )}
              </td>
              <td>
                {isUserSelected(user) ? (
                  <input
                    type="text"
                    value={updatedUser.zipCode}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        zipCode: e.target.value,
                      })
                    }
                  />
                ) : (
                  user.zipCode
                )}
              </td>
              <td>
                {isUserSelected(user) ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <button onClick={() => handleUpdate(user)}>Update</button>
                )}
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
