import React from "react";
import {
  updateDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useFirestore, useStorage } from "reactfire";
import { useForm } from "react-hook-form";
import { ref, uploadBytes } from "firebase/storage";
import { Button } from "@mui/material";
// import {v4 as uuidv4} from 'uuid';
import { useState, useEffect } from "react";

export const EditCatForm = (props) => {
  const firestore = useFirestore();
  const storage = useStorage();
  const [picture, setPicture] = useState();
  const catsRef = collection(firestore, "cats");
  const catQuery = query(catsRef, where("uuid", "==", props.uuid));
  const [catDocID, setCatDocID] = useState([]);
    useEffect(() => {
        getCatDocID()
    }, [])
  
  async function getCatDocID() {
    const querySnapshot = await getDocs(catQuery);
    // console.log(catQuery)
    // console.log(querySnapshot)
    setCatDocID(querySnapshot.docs[0].id);
    // console.log(catDocID)
  }
  console.log("updateRef", catDocID);

  const { register, handleSubmit } = useForm({});

  async function updateCat(data, uuid) {
      data.uuid = props.uuid
    //   catDocID.update(data)
    const docRef = doc(firestore, "cats", catDocID)
    await updateDoc(docRef, data);
    console.log(`Updated ${props.uuid} document in firestore`);
    // console.log(doc)
  }

  // async function uploadPhoto(data, uuid){
  //     // https://www.newline.co/@satansdeer/handling-file-fields-using-react-hook-form--93ebef46
  //     const storageRef = ref(storage, uuid);
  //     uploadBytes(storageRef, data).then(() => {
  //       console.log("Uploaded a file");
  //     });
  // }

  const onSubmit = async (data, event) => {
    event.preventDefault();
    // await uploadPhoto(picture, uuid)
    // delete data.picture;
    await updateCat(data, props.uuid);
    event.target.reset();
    window.location.reload();
  };

  // const onChange = (e) => {
  //     setPicture(e.target.files[0])
  // }
  if (catDocID == []) {
    return <div>Loading</div>;
  } else {
    console.log("catDocID", catDocID);

    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div>
                    <label htmlFor="picture">Picture</label>
                    <input {...register("picture", {required: true})1} type="file" onChange={onChange}></input>

                </div> */}
          <div>
            <label htmlFor="name">Name</label>
            <input
              {...register("name", { required: true })}
              defaultValue={props.name}
            ></input>
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input
              {...register("age", { required: true })}
              defaultValue={props.age}
            ></input>
          </div>
          <div>
            <label htmlFor="notes">Notes</label>
            <input {...register("notes")} defaultValue={props.notes}></input>
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              {...register("location", { required: true })}
              defaultValue={props.location}
            ></input>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
};
