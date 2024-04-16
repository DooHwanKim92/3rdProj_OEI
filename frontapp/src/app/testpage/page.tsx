'use client'

import useGeolocation from "../geolocation"


function TestPage() {
  const location = useGeolocation();

  return (
    <div className="App">
      {location.loaded
        ? JSON.stringify(location)
      : "Location data not available yet."}
    </div>
  );
}

export default TestPage;