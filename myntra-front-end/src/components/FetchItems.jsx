import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../store/ItemSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";

const FetchItems = () => {
  const fetchStatus = useSelector((state) => state.fetchStatus);
  const dispatch = useDispatch();
  
    
  useEffect(() => {
    if (fetchStatus.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;
    

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/items", { signal });
        const data = await res.json();
    
        dispatch(itemActions.addInitialItems(data.items));
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching items:", error);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();  // Cleanup: abort the fetch if the component unmounts
    };
  }, [fetchStatus, dispatch]);

  return (
    <></>
  );
};

export default FetchItems;
