import React, { useState } from "react";
import { curUser } from "./curUserData";

function Form(props) {
  const [userDupli, setUserDupli] = useState(false);
  const [errorForm, setErrorForm] = useState(false);
  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    userAccess: "Staff",
    accStatus: true,
  });
  const rowForm = props.rowForm;
  const editChangeEnable = props.editChangeEnable;
  const setRowForm = props.setRowForm;
  const setForm = props.setForm;
  const data = props.data;
  const setData = props.setData;

  const submitHandler = (e) => {
    e.preventDefault();
    // insertData(newData);
    const updatedDataArray = data.map((dataItem) =>
      dataItem.userName === rowForm.userName
        ? { ...data, ...rowForm }
        : dataItem
    );
    setData(updatedDataArray);

    rowForm.userName = "";
    rowForm.email = "";
    rowForm.userAccess = "";
    setForm(false);
  };

  const insertData = () => {
    if (
      newUser.userName.trim().length === 0 ||
      newUser.email.trim().length === 0
    ) {
      return 0;
    }

    let find = data.find((c) => c.userName === newUser.userName);
    if (find === undefined) {
      setData((prevUserData) => {
        return [...prevUserData, newUser];
      });

      setForm(false);
    } else {
      return setUserDupli(true);
    }

    console.log(data);
    console.log(newUser);
  };

  const handleChange = (e) => {
    if (editChangeEnable) {
      setRowForm((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value.trim(),
      }));
    } else {
      setNewUser((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value.trim(),
      }));
    }
    setUserDupli(false);
    setErrorForm(false);
  };

  return (
    <React.Fragment>
      <div className="backdrop" />
      <form className="form">
        <label htmlFor="userName">Username</label>
        <input
          name="userName"
          id="userName"
          type="text"
          onChange={handleChange}
          value={rowForm.userName ? rowForm.userName : newUser.userName}
        />
        <label htmlFor="email">E-mail</label>
        <input
          name="email"
          type="email"
          id="email"
          onChange={handleChange}
          value={rowForm.email ? rowForm.email : newUser.email}
        />

        <label htmlFor="userAccess">userAccess</label>

        <select
          id="userAccess"
          name="userAccess"
          value={rowForm.userAccess ? rowForm.userAccess : newUser.userAccess}
          onChange={handleChange}
        >
          <option value="Super Admin">Super Admin</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Staff" selected>
            Staff
          </option>
        </select>
        {userDupli && <p>Username Already Exist</p>}
        {errorForm && <p>Please Fill The Form</p>}
        {rowForm.userName ? (
          <input type="submit" onClick={submitHandler} value="submit" />
        ) : (
          <input
            type="button"
            onClick={() => {
              insertData();
            }}
            value="Add"
          />
        )}

        <input
          type="button"
          value="Cancel"
          onClick={() => {
            setForm(false);
            // rowForm.userName = "";
            // rowForm.email = "";
            // rowForm.userAccess = "";
            // newUser.userName = "";
            // newUser.email = "";
          }}
        />
      </form>
    </React.Fragment>
  );
}

export default Form;
