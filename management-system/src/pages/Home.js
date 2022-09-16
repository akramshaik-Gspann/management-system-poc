import React from "react";
import "firebase/compat/firestore";
import '../styles/Home.css';
import Herosection from "./Herosection";
function Home() {
  return (
    <div className="myform container">
      <div>
        <h1>Fill me with product Table : ag-grid </h1>
      </div>
      <Herosection />
    </div>
  )
}

export default Home