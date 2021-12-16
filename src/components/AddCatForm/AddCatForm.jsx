import React from 'react';
import {addDoc, collection} from 'firebase/firestore';
import { useFirestore, useStorage } from 'reactfire';
import {useForm} from 'react-hook-form';
import {ref, uploadBytes} from 'firebase/storage';
import { Button } from '@mui/material';
import {v4 as uuidv4} from 'uuid';
import { useState } from 'react';


export const AddCatForm = () =>{
    const firestore = useFirestore();
    const storage = useStorage();
    const [picture, setPicture] = useState();
    
    const {register, handleSubmit} = useForm({})


    async function addCat(data, uuid) {
        let doc = await addDoc(collection(firestore, `cats`), data)
        console.log("Uploaded document to firestore")
        console.log(doc)
    }

    async function uploadPhoto(data, uuid){
        // https://www.newline.co/@satansdeer/handling-file-fields-using-react-hook-form--93ebef46
        const storageRef = ref(storage, uuid);
        uploadBytes(storageRef, data).then(() => {
          console.log("Uploaded a file");
        });
    }

    const onSubmit = async (data, event) => {
        event.preventDefault();
        let uuid = uuidv4();
        data.uuid = uuid;
        await uploadPhoto(picture, uuid)
        delete data.picture;
        await addCat(data, uuid);
        event.target.reset();
        window.location.reload();
    }

    const onChange = (e) => {
        setPicture(e.target.files[0])
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="picture">Picture</label>
                    <input {...register("picture", {required: true})} type="file" onChange={onChange}></input>

                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input {...register("name", {required: true})}></input>
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <input {...register("age", {required: true})}></input>
                </div>
                <div>
                    <label htmlFor="notes">Notes</label>
                    <input {...register("notes")}></input>
                </div>
                <div>
                    <label htmlFor="location">Location</label>
                    <input {...register("location", {required: true})}></input>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    );

}