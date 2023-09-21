import React from "react";
import UserList from "./components/Userlist";
import UserForm from "./components/Userform"
import "./App.css"

function App() {
  return (
    <div>
      <h1 className="task">
       Basic React-Form
      </h1>
      <UserForm />
      <UserList />
    </div>
  );
}

export default App;
