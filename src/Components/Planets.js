import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Planet from "./Planet";

const fetchPlanets = async ({ queryKey }) => {
  let page = queryKey[1];
  const res = await axios.get(`https://swapi.dev/api/planets/?page=${page}`);
  return res.data;
};

const Planets = () => {
  const [page, setPage] = useState(1);
  // in the array arg 0 is the key of the request.
  // other args can be passed into the function ^
  const { data, status } = useQuery(["planets", page], fetchPlanets, {
    staleTime: 2000,
    onSuccess: () => console.log("Data Fetched no problemo"),
    onError: () => console.log("Ouchie there was an error"),
  });

  return (
    <div>
      <h2>Planets</h2>

      <button onClick={() => setPage(1)}>Page 1</button>
      <button onClick={() => setPage(2)}>Page 2</button>
      <button onClick={() => setPage(3)}>Page 3</button>

      {status === "error" && <div>Error Fetching Data</div>}
      {status === "loading" && <div>Loading Data</div>}
      {status === "success" && (
        <div>
          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
