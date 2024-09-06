import { Popper } from "@mui/material";
import React, { useState } from "react";

type Option = {
  value: string;
  label: string;
};

type SearchableSelectProps = {
  options: Option[];
  onSelect: (option: Option) => void;
};

const SearchableSelect = ({ options, onSelect }: SearchableSelectProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isShow, setIsShown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm === "") {
      setFilteredOptions(options);
      return;
    }

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  };

  const handleSelect = (option: Option) => {
    onSelect(option);
    setSearchTerm(option.label);
    setFilteredOptions(options);
    setIsShown(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsShown((prev) => !prev);
  };

  return (
    <>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
          className={`block w-full p-2 ps-2 ${
            isShow ? "rounded-t-lg" : "rounded-lg"
          } dark:bg-mac-dark-card dark:text-dark-primary-label`}
        />
        <button
          className="absolute end-2.5 bottom-1 rounded-lg my-1 dark:text-dark-primary-label"
          aria-describedby="popover"
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
      {isShow && (
        <Popper id="popover" open={isShow} anchorEl={anchorEl}>
          <ul className="rounded-b-lg bg-mac-light-card dark:bg-mac-dark-card p-2 h-60 overflow-auto border">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className="text-primary-label dark:text-dark-primary-label p-2 hover:bg-mac-sidebar-dark-select hover:cursor-pointer"
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li
                key="no_option"
                className="text-primary-label dark:text-dark-primary-label p-2 hover:bg-mac-sidebar-dark-select hover:cursor-pointer"
              >
                No Results Found
              </li>
            )}
          </ul>
        </Popper>
      )}
    </>
  );
};

export default SearchableSelect;
