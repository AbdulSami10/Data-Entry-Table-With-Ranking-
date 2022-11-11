import React, { useEffect, useState } from "react";
import { newData } from "./newData";
import "./Table.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons/lib/icons";
import Foter from "./footer";

// const getLocalData = () => {
//   const LocalData = localStorage.getItem("data");
//   console.log(LocalData);
//   if (LocalData) {
//     return JSON.parse(localStorage.getItem("data"));
//   } else {
//     return newData;
//   }
// };

function Table() {
  const [data, setData] = useState(newData);
  const [rowForm, setRowForm] = useState("");
  const [form, setForm] = useState(false);
  const [curUser, setCurUser] = useState(data[0]);
  const [editChangeEnable, setEditChangeEnable] = useState(false);
  const [userDupli, setUserDupli] = useState(false);
  const [errorForm, setErrorForm] = useState(false);
  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    userAccess: "Staff",
    accStatus: true,
  });

  // useEffect(() => {
  //   localStorage.setItem("data", JSON.stringify(data));
  // }, [data]);
  const deleteItemHandler = (userName) => {
    setData((prevList) => {
      const updates = prevList.filter((a) => a.userName !== userName);
      return updates;
    });
  };
  const editItem = (userName) => {
    let edited = data.find((elem) => {
      return elem.userName === userName;
    });
    console.log(edited);

    setRowForm(edited);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // map the current data & updates object returns the newDataArray

    // console.log(newData);
    insertData(newData);
    const updatedDataArray = data.map((dataItem) =>
      dataItem.id === rowForm.id ? { ...data, ...rowForm } : dataItem
    );
    setData(updatedDataArray);
    setCurUser(data[0]);
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
      <div className="BigCurUser">
        <div className="curuser">
          <h3>Current User</h3>
          <h2>{curUser.userName} </h2>
          <p className="p1">{curUser.userAccess} </p>
        </div>
        {curUser.userAccess === "Staff" ||
        curUser.userAccess === "Manager" ||
        curUser.userAccess === "Restricted" ? (
          ""
        ) : (
          <button
            className="btn addUser"
            onClick={() => {
              setForm(true);
            }}
          >
            AddUser
          </button>
        )}
      </div>
      {
        <table>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>User Access</th>
            <th>Account Status</th>
          </tr>

          {data.map((data) => {
            return (
              <tr>
                <th>
                  {data.userName}
                  {curUser.userName === data.userName ? "(You)" : ""}
                </th>
                <th>{data.email} </th>
                <th
                  className={
                    data.userAccess.toLowerCase() === "admin"
                      ? "adminColor"
                      : data.userAccess.toLowerCase() === "staff"
                      ? "staffColor"
                      : data.userAccess.toLowerCase() === "manager"
                      ? "managerColor"
                      : data.userAccess.toLowerCase() === "super admin"
                      ? "superAdminColor"
                      : ""
                  }
                >
                  {data.userAccess}
                </th>

                <th>{data.accStatus ? 1 : 0} </th>
                {curUser.userAccess === "Staff" ||
                curUser.userAccess === "Restricted" ? (
                  ""
                ) : (
                  <th
                    className={
                      // data.userAccess.toLowerCase() === "restricted"
                      //   ? "restricted"
                      //   : "" ||
                      (curUser.userAccess === "Admin" &&
                        data.userAccess === "Super Admin") ||
                      (curUser.userAccess === "Manager" &&
                        data.userAccess === "Super Admin") ||
                      (curUser.userAccess === "Manager" &&
                        data.userAccess === "Admin")
                        ? "restricted"
                        : ""
                    }
                  >
                    {/* <button
                      className="btn edit"
                      onClick={() => {
                        editItem(data.id);
                        setEditChangeEnable(true);
                        setForm(true);
                      }}
                    >
                      Edit
                    </button> */}
                    <EditOutlined
                      className="edit"
                      onClick={() => {
                        editItem(data.userName);
                        setEditChangeEnable(true);
                        setForm(true);
                      }}
                    />
                    {/* <button
                      className="btn delete"
                      onClick={() => deleteItemHandler(data.id)}
                    >
                      Delete
                    </button> */}
                    <DeleteOutlined
                      className="btn delete"
                      onClick={() => deleteItemHandler(data.userName)}
                    />
                  </th>
                )}
              </tr>
            );
          })}
        </table>
      }

      {form && (
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
              value={
                rowForm.userAccess ? rowForm.userAccess : newUser.userAccess
              }
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
              }}
            />
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Table;
