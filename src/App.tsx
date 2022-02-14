import React, { useEffect, useState } from "react";
import { getPhotos } from "./API/apiFunctions";
import InfiniteScroller from "./Components/InfiniteScroller";
import Sidemenu from "./Components/Sidemenu";

function App() {
  // TODO Add type
  const [photos, setPhotos] = useState<any[]>([]);
  useEffect(() => {
    let isMounted = true;
    getPhotos().then((resolve: any[]) => {
      if (isMounted) {
        setPhotos(resolve);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="App">
      <Sidemenu />
      <InfiniteScroller photos={photos} />
    </div>
  );
}

export default App;
