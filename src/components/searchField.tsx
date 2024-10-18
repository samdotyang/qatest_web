import React from "react"

interface SearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
}


export function Search (props: SearchProps) {
  const { onChange, placeholder, type } = props;

  return (
    <>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
        </div>
        <input
          onChange={onChange}
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-mac-light-card dark::bg-mac-dark-card focus:ring-blue-500 focus:border-blue-500 bg-mac-light-card dark:bg-mac-dark-card dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type={type}
          placeholder={placeholder}
        />
      </div>
    </>
  )
}
