import { createContext, useState, useEffect } from "react";

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

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const jsonData = await res.json();

      if (Array.isArray(jsonData)) {
        const newVar = jsonData.map((curr) => {
          return { ...curr, isEditable: false };
        });
        setData(newVar);
      } else {
        console.error("Data received is not an array:", jsonData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = (ids) => {
    const idsToDelete = Array.isArray(ids) ? ids : [ids];
    const filteredData = data.filter(
      (person) => !idsToDelete.includes(person.id)
    );
    setData(filteredData);
    setSearchResults([]);
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
    deleteData,
    search,
    handlePages,
    currentPage,
    totalPerson,
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminContext.Provider value={values}> {children} </AdminContext.Provider>
  );
};
