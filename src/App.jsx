import { useState } from "react"; // Importing useState hook
import { useEffect } from "react"; // Importing useEffect hook
import Video from "./Pages/Video"; // Importing Video component
import Navigation from "./Components/Navigation"; // Importing Navigation component
import GetVideoId from "./CustomHooks/useVideoId"; // Importing custom hook to get video ID
import Defualt from "./Pages/Defualt"; // Importing Default component

export default function App() { // App component
  // State variable for video formats
  const [formats , setformats] = useState();

  // Effect to update video formats based on URL changes
  useEffect(() => {
    // Get video ID from URL and update formats state
    setformats(GetVideoId(window.location.href.split(window.origin)[1]));
    console.log(1); // Log for debugging
  }, [window.location.href]); // Dependency array to run effect on URL change

  // Function to handle search input
  const handlesearch = (val) => {
    // Get video ID from input value and update formats state
    setformats(GetVideoId(val));
  };

  // JSX for App component
  return (
    <main className="w-full h-screen bg-zinc-950 font-['poppins']">
      {/* Navigation component with handlesearch function */}
      <Navigation search={handlesearch}/>
      {/* Render Video component if formats are available, otherwise render Default component */}
      { formats ? <Video search={formats} /> : <Defualt /> }
    </main>
  );
}
