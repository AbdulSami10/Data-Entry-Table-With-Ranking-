import React, { useState } from "react";
import "./Table.css";
import { dataList } from "./data";
import { resultList } from "./data";

const Table = () => {
  const [edit, setEdit] = useState(false);
  const [rowForm, setRowForm] = useState("");

  const [data, setData] = useState(dataList);

  const deleteItemHandler = (id) => {
    setData((prevList) => {
      const updates = prevList.filter((a) => a.id !== id);
      return updates;
    });
  };
  const editItem = (id) => {
    let edited = data.find((elem) => {
      return elem.id === id;
    });
    console.log(edited);

    setRowForm(edited);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // map the current data & updates object returns the newDataArray
    const updatedDataArray = data.map((dataItem) =>
      dataItem.id === rowForm.id ? { ...data, ...rowForm } : dataItem
    );
    setData(updatedDataArray);
    setEdit(false);
  };
  const handleChange = (e) => {
    setRowForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  return (
    <React.Fragment>
      <h1 className="center">First Table</h1>
      <table className="FirstTable">
        <tr>
          <th>Dessert(100g serving)</th>
          <th>Calories</th>
          <th>Fat(g)</th>
          <th>Carbs(g)</th>
          <th>Proteins(g)</th>
          <th>Sodium(mg)</th>
          <th>Calcium(%)</th>
          <th>Iron(%)</th>
          <th>Actions</th>
        </tr>
        {data.map((data) => {
          return (
            <tr key={data.id}>
              <td>{data.Dessert}</td>
              <td>{data.Calories}</td>
              <td>{data.Fat}</td>
              <td>{data.Carbs}</td>
              <td>{data.Proteins}</td>
              <td>{data.Sodium}</td>
              <td>{data.Calcium}</td>
              <td>{data.Iron}</td>
              <td>
                <button
                  onClick={() => {
                    setEdit(true);
                    editItem(data.id);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteItemHandler(data.id)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
      {edit && (
        <form>
          <input
            type="text"
            name="Dessert"
            value={rowForm.Dessert}
            onChange={handleChange}
            placeholder="Desert"
          ></input>
          <input
            type="number"
            name="Calories"
            value={rowForm.Calories}
            onChange={handleChange}
            placeholder="Calories"
          ></input>
          <input
            type="number"
            name="Fat"
            value={rowForm.Fat}
            onChange={handleChange}
            placeholder="Fat"
          ></input>
          <input
            type="number"
            name="Carbs"
            value={rowForm.Carbs}
            onChange={handleChange}
            placeholder="Carbs"
          ></input>
          <input
            type="number"
            name="Proteins"
            onChange={handleChange}
            value={rowForm.Proteins}
            placeholder="Proteins"
          ></input>
          <input
            type="number"
            name="Sodium"
            onChange={handleChange}
            value={rowForm.Sodium}
            placeholder="Sodium"
          ></input>
          <input
            name="Calcium"
            type="number"
            onChange={handleChange}
            value={rowForm.Calcium}
            placeholder="Calcium"
          ></input>
          <input
            type="number"
            name="Iron"
            onChange={handleChange}
            value={rowForm.Iron}
            placeholder="Iron"
          ></input>
          <button type="submit" onClick={submitHandler}>
            Edited
          </button>
        </form>
      )}

      <h1 className="center">Secound Table</h1>
      <table>
        <tr>
          <th>SUBJECT</th>
          <th colSpan="3">FULL MARKS</th>
          <th colSpan="4">MARKS OBTAINED</th>
        </tr>
        <tr>
          <th>COMPULSORY SUBJECTS</th>
          <th>WRITTEN</th>
          <th>ORAL</th>
          <th>TOTAL</th>
          <th>WRITTEN</th>
          <th>ORAL</th>
          <th>TOTAL</th>
          <th>GRADE</th>
        </tr>
        {resultList.map((result) => {
          return (
            <tr>
              <th>{result.cmpSubject}</th>
              <th>{result.fmWritten}</th>
              <th>{result.fmOral}</th>
              <th>{result.fmTotal}</th>
              <th>{result.moWritten}</th>
              <th>{result.moOral}</th>
              <th>{result.moTotal}</th>
              {/* <th>{result.moWritten + result.moOral}</th> */}
              <th>{result.moGrade}</th>
            </tr>
          );
        })}
        <tr>
          <th>RESULT</th>
          <th colSpan="7">P</th>
        </tr>
      </table>
    </React.Fragment>
  );
};

export default Table;
