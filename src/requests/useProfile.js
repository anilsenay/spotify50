import { useEffect, useState } from "react";
import axios from "axios";

const useProfile = (token) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  var headers = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    setIsLoading(true);
    function fetchProfile() {
      try {
        const requestOne = await axios.get("https://api.spotify.com/v1/me", headers);
        const data = requestOne.data;

        setProfile(data);
      } catch (err) {
        setProfile(null);
        setError(err);
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return { profile, error, isLoading };
};

export default useProfile;
