import { useEffect, useState } from "react";
import axios from "axios";

const useArtists = (token) => {
  const [artists, setArtists] = useState(null);
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
    "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50";
  let two =
    "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50";
  let three =
    "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50";

  useEffect(() => {
    setIsLoading(true);
    function fetchArtists() {
      try {
        const requestOne = axios.get(one, headers);
        const requestTwo = axios.get(two, headers);
        const requestThree = axios.get(three, headers);

        axios.all([requestOne, requestTwo, requestThree]).then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            const responesThree = responses[2];
            const newState = {
              short_term:
                responseOne.status == 200 ? responseOne.data.items : [],
              medium_term:
                responseTwo.status == 200 ? responseTwo.data.items : [],
              long_term:
                responesThree.status == 200 ? responesThree.data.items : [],
            };
            setArtists(newState);
          })
        );
      } catch (err) {
        setArtists(null);
        setError(err);
        setIsLoading(false);
      }
    }

    fetchArtists();
  }, []);

  return { artists, error, isLoading };
};

export default useArtists;
