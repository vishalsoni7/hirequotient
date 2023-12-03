import { createContext, useState, useEffect } from "react";
import { fetchData } from "./utils";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);

  const start = (currentPage - 1) * 10;
  const end = start + 10;
  const currentData =
    searchResults.length > 0 ? searchResults : data.slice(start, end);

  const totalPerson = Math.ceil(
    (searchResults.length > 0 ? searchResults.length : data.length) / 10
  );

  const handlePages = (page) => {
    setCurrentPage(page);
  };

  const search = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const searchData = data.filter(
      (person) =>
        person.name.toLowerCase().includes(searchTerm) ||
        person.email.toLowerCase().includes(searchTerm) ||
        person.role.toLowerCase().includes(searchTerm)
    );
    setSearchResults(searchData);
  };

  const values = {
    data,
    currentData,
    setData,
    search,
    handlePages,
    currentPage,
    totalPerson,
    setSearchResults,
  };

  useEffect(() => {
    fetchData(setData);
  }, []);

  return (
    <AdminContext.Provider value={values}> {children} </AdminContext.Provider>
  );
};
