import axios from "axios";
import Cookies from "js-cookie";

import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_REACT_APP_BASE_URL;

function useGetData(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchData = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      setLoading(true);
      const response = await axios.get(`${apiKey + endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal,
      });
      const fetchedData = await response.data;
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);

      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [endpoint, token]);

  return { data, setData, loading, fetchData, error };
}

export default useGetData;
