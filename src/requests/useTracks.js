import { useEffect, useState } from "react";
import axios from "axios";

const useTracks = (token) => {
  const [tracks, setTracks] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  var headers = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  let one =
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50";
  let two =
    "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50";
  let three =
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50";

  useEffect(() => {
    setIsLoading(true);
    function fetchTracks() {
      try {
        const requestOne = axios.get(one, headers);
        const requestTwo = axios.get(two, headers);
        const requestThree = axios.get(three, headers);

        axios.all([requestOne, requestTwo, requestThree]).then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            const responesThree = responses[2];
            setTracks({
              short_term:
                responseOne.status == 200 ? responseOne.data.items : [],
              medium_term:
                responseTwo.status == 200 ? responseTwo.data.items : [],
              long_term:
                responesThree.status == 200 ? responesThree.data.items : [],
            });
          })
        );
      } catch (err) {
        setTracks(null);
        setError(err);
        setIsLoading(false);
      }
    }

    fetchTracks();
  }, [token]);

  return { tracks, error, isLoading };
};

export default useTracks;
