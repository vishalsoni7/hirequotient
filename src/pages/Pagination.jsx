import { useContext } from "react";
import { AdminContext } from "../Context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Pagination = () => {
  const { handlePages, currentPage, totalPerson } = useContext(AdminContext);

  return (
    <div className="pagination">
      <button onClick={() => handlePages(1)} disabled={currentPage === 1}>
        <FontAwesomeIcon icon={faAngleLeft} />
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <button
        onClick={() => handlePages(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      {Array.from({ length: totalPerson }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePages(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => handlePages(currentPage + 1)}
        disabled={currentPage === totalPerson}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
      <button
        onClick={() => handlePages(totalPerson)}
        disabled={currentPage === totalPerson}
      >
        <FontAwesomeIcon icon={faAngleRight} />{" "}
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};

export default Pagination;
