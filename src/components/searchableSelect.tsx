// import { Popover } from "@mui/material";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = {
  value: string;
  label: string;
};

type SearchableSelectProps = {
  className?: string;
  options: Option[];
  name: string;
  value: string;
  onSelect: (option: Option) => void;
};

const SearchableSelect = ({
  options,
  name,
  onSelect,
  className,
  value,
}: SearchableSelectProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [popoverOpen, setPopOverOpen] = useState(false);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent popover from opening
    onSelect({ value: "", label: "" });
    setSearchTerm("");
    setFilteredOptions(options);
  };

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
    setPopOverOpen(false);
  };

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopOverOpen}>
        <div className={cn("relative", className)}>
          <input
            type="text"
            value={value}
            name={name}
            onChange={handleSearch}
            placeholder="Search..."
            className="w-full p-2 border border-input rounded-lg bg-card text-primary-label"
          />
          <div className="absolute end-2.5 bottom-1 flex items-center gap-1">
            {value && (
              <button
                onClick={handleClear}
                className="rounded-lg my-2 ext-primary-label hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-4 w-4 opacity-50 hover:opacity-100" />
              </button>
            )}
            <PopoverTrigger>
              <button className="absolute end-2.5 bottom-1 rounded-lg my-2 text-primary-label">
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>
            </PopoverTrigger>
          </div>
        </div>
        <PopoverContent>
          <Input
            placeholder="Search"
            name={name}
            value={searchTerm}
            onChange={handleSearch}
            className="bg-card"
          />
          <ul className="rounded-b-lg bg-card h-60 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className="text-primary-label  p-2 hover:bg-sidebar-select hover:cursor-pointer"
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li
                key="no_option"
                className="text-primary-label  p-2 hover:bg-sidebar-select hover:cursor-pointer"
              >
                No Results Found
              </li>
            )}
          </ul>
        </PopoverContent>
      </Popover>
      {/* <div className="relative w-full">
        <input
          type="text"
          value={searchTerm}
          name={name}
          onChange={handleSearch}
          placeholder="Search..."
          className={`w-full p-2 ps-2 ${
            isShow ? "rounded-t-lg" : "rounded-lg"
          } bg-card `}
        />
        <button
          className="absolute end-2.5 bottom-1 rounded-lg my-1 "
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
        
        // TODO: Implement Radix Popover for better performance and accessibility
        <Popover id="popover" open={isShow} anchorEl={anchorEl}>
          <input
          type="text"
          value={searchTerm}
          name={name}
          onChange={handleSearch}
          placeholder="Search..."
          />
          <ul className="rounded-b-lg bg-card p-2 h-60 overflow-auto border">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className="text-primary-label  p-2 hover:bg-sidebar-select hover:cursor-pointer"
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li
                key="no_option"
                className="text-primary-label  p-2 hover:bg-sidebar-select hover:cursor-pointer"
              >
                No Results Found
              </li>
            )}
          </ul>
        </Popover>
      )} */}
    </>
  );
};

export default SearchableSelect;
