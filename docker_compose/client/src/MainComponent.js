import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import "./MainComponent.css";

const MainComponent = () => {
  const [values, setValues] = useState([]);
  const [value, setValue] = useState("");

  const getAllNumbers = useCallback(async () => {
    // we will use nginx to redirect it to the proper URL
    const data = await axios.get("/api/values/all");
    setValues(data.data.rows.map(row => [row.id, row.marka, row.model, row.cena, row.color]));
    console.log("wypisuje", data.data.rows)
   // console.log("wypisuje2", values)
  }, []);

  useEffect(() => {
    getAllNumbers();
  }, []);

  return (
    <div>
      <br />
      <span className="title">Values</span>
        <h3>Database Cars</h3>
      <table border = "1">
        <tr>
            <td>ID</td>
            <td>Marka</td>
            <td>Model</td>
            <td>Cena</td>
            <td>Color</td>
        </tr>
            {values.map(function (nextItem, j) {
         return (
               <tr>
                   {nextItem.map(function (item, j) {
                       return (
                           <td>{item}</td>
                       );
                   })}
               </tr>
         );
       })}
      </table>
    </div>
  );
};
export default MainComponent;
