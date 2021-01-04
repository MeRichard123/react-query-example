import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Person from "./Person";

const fetchPeople = async (page) => {
  const res = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
  return res.data;
};

const People = () => {
  const [page, setPage] = useState(1);
  const { data, status, isPreviousData } = useQuery(
    ["people", page],
    () => fetchPeople(page),
    {
      keepPreviousData: true,
    }
  );

  return (
    <div>
      <h2>People</h2>

      <span>Current Page: {page}</span>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 1}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          if (!isPreviousData && data?.next) {
            setPage((old) => old + 1);
          }
        }}
        disabled={data ? !data.next : false}
      >
        Next Page
      </button>
      {status === "error" && <div>Error Fetching Data</div>}
      {status === "loading" && <div>Loading Data</div>}
      {status === "success" && (
        <div>
          {data.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
