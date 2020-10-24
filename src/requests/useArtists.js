import { useEffect, useState } from "react";

const useArtists = (token) => {
  const [artists, setArtists] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    setIsLoading(true);
    async function fetchUser() {
      try {
        await fetch(
          `https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50`,
          requestOptions
        )
          .then((res) => {
            const data = res.json();
            fetch(
              `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50`,
              requestOptions
            ).then((res) => {
              const data2 = res.json();
              fetch(
                `https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50`,
                requestOptions
              ).then((res) => {
                const data3 = res.json();
                setArtists({
                  short_term: data,
                  medium_term: data2,
                  long_term: data3,
                });
              });
            });
          })
          .finally(() => {
            setError(null);
            setIsLoading(false);
          });
      } catch (err) {
        setArtists(null);
        setError(err);
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [token]);

  return { artists, error, isLoading };
};

export default useArtists;
