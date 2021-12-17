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

  const { register, handleSubmit } = useForm({});

  async function updateCat(data, uuid) {
    data.uuid = props.uuid
    const docRef = doc(firestore, "cats", props.docID)
    await updateDoc(docRef, data);
    console.log(`Updated ${props.uuid} document in firestore`);
  }

  const onSubmit = async (data, event) => {
    event.preventDefault();
    // await uploadPhoto(picture, uuid)
    // delete data.picture;
    await updateCat(data, props.uuid);
    event.target.reset();
    window.location.reload();
  };


  if (props.docID == []) {
    return <div>Loading</div>;
  } else {

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
