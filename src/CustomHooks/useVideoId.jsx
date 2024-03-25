export default function GetVideoId(url) {
    // Regular expression pattern to match YouTube video IDs including shorts URLs
    var youtubePattern = /(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|shorts\/)([^"&?\/\s]{11})/i;
    
    // Extract video ID using the regular expression
    var match = url.match(youtubePattern);
    
    // Check if a match is found
    if (match && match[1]) {
        // Return the video ID
        return match[1];
    } else {
        // If no match is found, return null or handle the error as needed
        return null;
    }
}
