import Details from "./component/Details";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
