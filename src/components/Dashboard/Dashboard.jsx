import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useFirestore } from "reactfire";
import { AddCatForm, CatRow } from "..";
import { useState } from "react";
import { useGetData } from "../../custom-hooks/FetchCats";
import Table from "react-bootstrap/Table";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export function Dashboard() {
  // const [cats, setCats] = useState();
  let { catData, getData } = useGetData();
  const [addOpen, setAddOpen] = useState(false);
  const db = useFirestore();
  const catsRef = collection(db, "cats");
  const catQuery = query(catsRef);

  function handleAddOpen() {
    setAddOpen(true);
  }
  function handleAddClose() {
    setAddOpen(false);
  }

  if (catData === []) {
    return <div>Loading Cats Data</div>;
  } else {
    // console.log("cats", catData)
    // catData.forEach( (cat) =>{
    //     console.log(cat.data())
    // })
    let catArr = [];
    catData.forEach((cat) => {
      let catData = cat.data();
      catData.docID = cat.id;
      catArr.push(catData);
    });
    console.log(catArr);
    return (
      <div>
        <Table bordered striped responsive>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Location</th>
            <th>Age</th>
            <th>Notes</th>
          </tr>
          {catArr.map(({ name, location, age, notes, uuid, docID }) => {
            return (
              <CatRow
                uuid={uuid}
                name={name}
                location={location}
                age={age}
                notes={notes}
                docID={docID}
              ></CatRow>
            );
          })}
        </Table>
        <Button onClick={handleAddOpen}>Add Cat</Button>
        <Dialog open={addOpen}>
          <DialogContent>
            <AddCatForm></AddCatForm>
          </DialogContent>
          <DialogActions>
              <Button onClick={handleAddClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
