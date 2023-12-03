import { useContext, useState, useEffect } from "react";
import { AdminContext } from "../Context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faTrashCan,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "./Pagination";

export const AdminPage = () => {
  const { data, currentData, setData, search, setSearchResults } =
    useContext(AdminContext);
  const [input, setInput] = useState({});
  const [isChecked, setIsChecked] = useState([]);
  const [checkAll, setCheckAll] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((pre) => ({ ...pre, [name]: value }));
  };

  const updateData = (id) => {
    const findPerson = currentData.map((p) =>
      p.id === id ? { ...p, ...input, isEditable: !p.isEditable } : p
    );
    setData(findPerson);
  };

  const handleEditData = (id) => {
    const updatedData = data.map((person) =>
      person.id === id ? { ...person, isEditable: !person.isEditable } : person
    );
    setData(updatedData);
  };

  const handleCheckBox = (e, id) => {
    const { checked } = e.target;

    if (id === "all") {
      setCheckAll(checked);
      const allIds = currentData.map((item) => item.id);
      setIsChecked(checked ? allIds : []);
    } else {
      setIsChecked((prevChecked) => {
        if (checked) {
          return [...prevChecked, id];
        } else {
          return prevChecked.filter((v) => v !== id);
        }
      });
    }
  };

  const deleteData = (ids) => {
    const idsToDelete = Array.isArray(ids) ? ids : [ids];
    const filteredData = data.filter(
      (person) => !idsToDelete.includes(person.id)
    );
    setData(filteredData);
    setSearchResults([]);
    setIsChecked([]);
  };

  useEffect(() => {
    setCheckAll(isChecked.length === currentData.length);
  }, [isChecked, currentData]);

  return (
    <>
      <div className="table-div">
        <table className="table ">
          <thead>
            <tr>
              <th>
                <input placeholder="Search" onChange={search} />
              </th>
              <th></th>
              <th></th>
              <th></th>
              <th className="trash-th">
                {isChecked.length > 0 ? (
                  <span className="trash" onClick={() => deleteData(isChecked)}>
                    {" "}
                    Delete Selected{" "}
                  </span>
                ) : (
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="trash"
                    onClick={() => deleteData(isChecked)}
                  />
                )}
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th className="check-box-th">
                <input
                  type="checkbox"
                  className="input-checked"
                  checked={checkAll}
                  onChange={(e) => handleCheckBox(e, "all")}
                />{" "}
                Name
              </th>
              <th>Email</th>
              <th>Role</th>
              <th> Action </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((person) => (
              <tr
                className={isChecked.includes(person?.id) ? "gray-bg" : ""}
                key={person?.id}
              >
                <td className="check-box-th">
                  <input
                    type="checkbox"
                    className="input-checked"
                    value={person?.id}
                    checked={isChecked.includes(person?.id)}
                    onChange={(e) => handleCheckBox(e, person?.id)}
                  />
                  {person.isEditable ? (
                    <input
                      type="text"
                      name="name"
                      defaultValue={person?.name}
                      onChange={handleInput}
                    />
                  ) : (
                    `${person?.name}`
                  )}
                </td>
                <td>
                  {person.isEditable ? (
                    <input
                      type="text"
                      name="email"
                      defaultValue={person?.email}
                      onChange={handleInput}
                    />
                  ) : (
                    `${person?.email}`
                  )}
                </td>
                <td>
                  {person.isEditable ? (
                    <input
                      type="text"
                      name="role"
                      defaultValue={person?.role}
                      onChange={handleInput}
                    />
                  ) : (
                    `${person?.role}`
                  )}
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={!person.isEditable ? faPenToSquare : faCheck}
                    className="edit"
                    onClick={() => {
                      !person.isEditable
                        ? handleEditData(person?.id)
                        : updateData(person?.id);
                    }}
                  />

                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="trash-can"
                    onClick={() => deleteData(person?.id)}
                  />
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
      <Pagination />
    </>
  );
};
