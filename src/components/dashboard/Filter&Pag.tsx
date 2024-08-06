import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { UrlCategories } from "../../api";

type UrlFilterAndPaginationProps = {
  currentCategory: UrlCategories;
  currentOffset: number;
  currentLimit: number;
};

const UrlFilterAndPagination: React.FC<UrlFilterAndPaginationProps> = ({
  ...props
}) => {
  const [category, setCategory] = useState<UrlCategories>(
    props.currentCategory,
  );
  const [offset, setOffset] = useState<number>(props.currentOffset);
  const limit = props.currentLimit;
  const navigate = useNavigate({ from: "/dashboard" });

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newCategory = event.target.value as UrlCategories;
    setCategory(newCategory);
    navigate({
      to: "/dashboard",
      search: {
        category: newCategory,
        offset: 0,
        limit,
      },
    });
  };

  const handlePageChange = (newOffset: number) => {
    setOffset(newOffset);
    navigate({
      to: "/dashboard",
      search: {
        category,
        offset: newOffset,
        limit,
      },
    });
  };

  return (
    <>
      <div className="filter-section">
        <label htmlFor="category">Category:</label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          {Object.values(UrlCategories).map((ctg) => (
            <option value={ctg} key={ctg}>
              {ctg}
            </option>
          ))}
        </select>
      </div>

      <div className="pagination-section">
        <button
          onClick={() => handlePageChange(Math.max(0, offset - limit))}
          disabled={offset === 0}
          className="text-gray-50"
        >
          Previous
        </button>
        <span className="text-gray-50">
          Page {Math.ceil(offset / limit) + 1}
        </span>
        <button
          className="text-gray-50"
          onClick={() => handlePageChange(offset + limit)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default UrlFilterAndPagination;
