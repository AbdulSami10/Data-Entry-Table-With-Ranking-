import React, { useState, useEffect } from "react";
import { newData } from "./newData";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons/lib/icons";
import { curUser } from "./curUserData";
import Form from "./Form";
import CurrentUserUI from "./CurrentUserUI";
import { Input } from "antd";
import "./Table.css";
import { Switch } from "antd";

const { Search } = Input;

const getLocalData = () => {
  let data = localStorage.getItem("data");
  console.log(data);
  if (data) {
    return JSON.parse(localStorage.getItem("data"));
  } else {
    return newData;
  }
};

function Table() {
  const [data, setData] = useState(getLocalData());
  const [rowForm, setRowForm] = useState("");
  const [form, setForm] = useState(false);
  const [editChangeEnable, setEditChangeEnable] = useState(false);
  const [query, setQuery] = useState("");

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
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);
  return (
    <React.Fragment>
      <CurrentUserUI />

      <span className="tableDiv">
        <span className="tableDiv-top">
          <Search
            placeholder="Search"
            enterButton
            className="search"
            onChange={(e) => {
              setQuery(e.target.value);
              console.log(query);
            }}
          />

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
        </span>
        <table>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>User Access</th>
            <th>Account Status</th>
          </tr>

          {data
            .filter(
              (user) =>
                user.userName.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query)
            )
            .map((data) => {
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

                  <th>
                    {data.accStatus ? (
                      <Switch defaultChecked disabled />
                    ) : (
                      <Switch unCheckedChildren disabled />
                    )}
                  </th>
                  {curUser.userAccess === "Staff" ||
                  curUser.userAccess === "Restricted" ? (
                    ""
                  ) : (
                    <th
                      className={
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
                      <EditOutlined
                        className="edit"
                        onClick={() => {
                          editItem(data.userName);
                          setEditChangeEnable(true);
                          setForm(true);
                        }}
                      />

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
      </span>
      {form && (
        <Form
          rowForm={rowForm}
          editChangeEnable={editChangeEnable}
          setRowForm={setRowForm}
          setForm={setForm}
          data={data}
          setData={setData}
        />
      )}
    </React.Fragment>
  );
}

export default Table;
