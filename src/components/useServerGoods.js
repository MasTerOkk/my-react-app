import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function useServerGoods() {
  const [goods, setGoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0); // Начинаем с 0-й страницы
  const initialLoad = useRef(true); // Флаг для предотвращения повторного запроса

  useEffect(() => {
    if (!initialLoad.current && page === 0) {
      return;
    }

    const fetchGoods = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Имитация задержки
        const response = await axios.get(`http://localhost:8080/api/items`, {
          params: { page, size: 10 }, // Параметры page и size
        });
        setGoods((prevGoods) => (page === 0 ? response.data : [...prevGoods, ...response.data]));
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
        initialLoad.current = false;
      }
    };

    fetchGoods();
  }, [page]);

  const loadMore = () => setPage((prevPage) => prevPage + 1);

  return { goods, isLoading, error, loadMore };
}

export default useServerGoods;
