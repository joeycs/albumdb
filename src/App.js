import React from "react";
import Index from "./components/index.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

require("dotenv").config();

const codeIcon = <FontAwesomeIcon icon={faCode} />;

function App() {
  return (
    <>
      <Index></Index>
      <div className="footer">
        <button
          onClick={() => window.open("https://github.com/joeycs/albumdb")}
          className="btn-code"
        >
          {codeIcon}
        </button>
      </div>
    </>
  );
}

export default App;
