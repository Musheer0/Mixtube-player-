import { useEffect, useRef } from "react";
import { CgSearch } from "react-icons/cg";

// Navigation component receives a 'search' function as a prop
export default function Navigation({search}) {
  // Reference for the input element
  const inputUser = useRef();

  // useEffect hook to listen for Enter key press
  useEffect(() => {
    // Event handler for key press
    const handleKeyDown = (e) => {
      // Check if the pressed key is Enter
      if (e.key === 'Enter') {
        // Call the 'search' function with the value of the input
        search(inputUser.current.value);
      }
    };

    // Add event listener for keydown event
    window.addEventListener('keydown', handleKeyDown);

    // Clean up function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount in class components

  // Return JSX for the navigation component
  return (
    <nav className="sticky z-10 top-0 bg-transparent gap-3 py-3  w-full h-[60px] flex flex-col items-center justify-between px-5">
      <div className="flex-1 px-2 h-full flex w-full  items-center text-white bg-zinc-800 rounded-full  hover:bg-zinc-700">
        {/* Search icon */}
        <CgSearch className="" />
        {/* Input field for search */}
        <input type="search" ref={inputUser} placeholder="Enter Link" className="px-2 flex-1 h-full  bg-transparent font-['poppins'] text-sm outline-none text-white"/>
      </div>
    </nav>
  );
}
