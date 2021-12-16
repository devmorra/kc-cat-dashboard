import React from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { useStorage } from "reactfire";
import { useState } from "react";
import "./catrow.css";

export const CatRow = (props) => {
  const storage = useStorage();
  const [imgurl, seturl] = useState();
  console.log(props.uuid);
  const storageRef = ref(storage);
//   const catsRef = ref(storageRef, "cats")
  const imgRef = ref(storageRef, props.uuid);

  //   https://firebase.google.com/docs/storage/web/download-files
  console.log(imgRef);
  getCatURL();
  async function getCatURL() {
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
      console.log(url)
      seturl(url);
    })
    .catch((error) => {
      // Handle any errors
      console.log(error)
    });
}
    console.log(imgurl)
  if (imgurl === "") {
    return "Loading";
  } else {
    return (
      <div className="rowContainer">
        <div>
          <img className="catImgContainer" src={imgurl} alt="" />
        </div>
        <div>{props.name}</div>
        <div>{props.location}</div>
        <div>{props.age}</div>
        <div>{props.notes}</div>
      </div>
    );
  }
};
