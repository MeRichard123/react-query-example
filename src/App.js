import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import NavBar from "./Components/Navbar";
import People from "./Components/People";
import Planets from "./Components/Planets";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const App = () => {
  const [page, setPage] = useState("planets");
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Star Wars info</h1>
        <NavBar setPage={setPage} />
        <div className="content">
          {page === "planets" ? <Planets /> : <People />}
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
