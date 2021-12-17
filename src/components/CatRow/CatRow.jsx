import React from "react";
import { ref, getDownloadURL, deleteObject } from "firebase/storage";
import { useStorage, useFirestore } from "reactfire";
import { useState } from "react";
import "./catrow.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { EditCatForm } from "../EditCatForm";
import { doc, deleteDoc } from "firebase/firestore";

export const CatRow = (props) => {
  const storage = useStorage();
  const firestore = useFirestore();
  const [imgurl, seturl] = useState();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleEditOpen = () => {
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  //   console.log(props.uuid);
  const storageRef = ref(storage);
  //   const catsRef = ref(storageRef, "cats")
  const imgRef = ref(storageRef, props.uuid);

  //   https://firebase.google.com/docs/storage/web/download-files
  //   console.log(imgRef);
  getCatURL();
  async function getCatURL() {
    console.log("getting cat image URL");
    getDownloadURL(imgRef)
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        // console.log(url);
        seturl(url);
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
  }

  async function deleteCat() {
    const docRef = doc(firestore, "cats", props.docID);
    const imgRef = ref(storage, props.uuid)
    await deleteDoc(docRef);
    await deleteObject(imgRef);
    window.location.reload();
  }

  //   console.log(imgurl);
  if (imgurl === "") {
    return "Loading";
  } else {
    return (
      <div className="rowContainer">
        <div>
          <img className="catImgContainer" src={imgurl} alt="" />
        </div>
        <div>{props.name}</div>
        <div>Location {props.location}</div>
        <div>{props.age}</div>
        <div>{props.notes}</div>
        <div>
          <Button onClick={handleEditOpen}>Edit</Button>
        </div>
        <div>
          <Button onClick={handleDeleteOpen}>Delete</Button>
        </div>
        <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogTitle>Edit {`${props.name}`}:</DialogTitle>
          <DialogContent>
            <EditCatForm
              docID={props.docID}
              name={props.name}
              age={props.age}
              location={props.location}
              uuid={props.uuid}
              notes={props.notes}
            ></EditCatForm>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            {/* <Button>Apply</Button> */}
          </DialogActions>
        </Dialog>
        <Dialog open={deleteOpen}>
          <DialogTitle>Remove {props.name}?</DialogTitle>
          <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={deleteCat}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
};
