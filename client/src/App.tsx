import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';
import Home from './components/Home';
import LoggedInHome from "./components/homepage/LoggedInHome";

export default function App() {

  return (
    <div>
      <BrowserRouter>
        <Box width="100%" height="100%" padding="0rem 0rem 0rem 0rem">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loggedin" element= {<LoggedInHome />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  );
}