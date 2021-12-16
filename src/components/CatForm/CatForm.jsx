import React from 'react';
import {addDoc, collection} from 'firebase/firestore';
import { useFirestore, useStorage } from 'reactfire';
import {useForm} from 'react-hook-form';
import {ref, uploadBytes} from 'firebase/storage';
import { Button } from '@mui/material';
import {v4 as uuidv4} from 'uuid';
import { useState } from 'react';


export const CatForm = () =>{
    const firestore = useFirestore();
    const storage = useStorage();
    const [picture, setPicture] = useState();
    
    const {register, handleSubmit} = useForm({})
    console.log(uuidv4());



    async function addCat(data, uuid) {
        let doc = await addDoc(collection(firestore, `cats`), data)
        console.log("Uploaded document to firestore")
        console.log(doc)
        // return doc
    }

    async function uploadPhoto(data, uuid){
        // https://www.newline.co/@satansdeer/handling-file-fields-using-react-hook-form--93ebef46
        // const file = data.image[0];
        const storageRef = ref(storage, `cats/${uuid}`);
        // const fileRef = storageRef.child(uuid);
        uploadBytes(storageRef, data).then(() => {
          console.log("Uploaded a file");
        });
        // let storageRef = ref(storage, `cats`);
        // const fileRef = storageRef.child(uuid);
        // let photo = await fileRef.put(data).then( () =>{
        //     console.log("Uploaded photo to cloud store")
        // })
        // console.log(photo)
    }

    const onSubmit = async (data, event) => {
        event.preventDefault();
        // console.log(`Updated:${data} ${event}`)
        // console.log(data)
        // console.log(event)
        // console.log(picture)
        // window.location.reload();
        let uuid = uuidv4();
        data.uuid = uuid;
        await uploadPhoto(picture, uuid)
        delete data.picture;
        await addCat(data, uuid);
        event.target.reset();
    }

    const onChange = (e) => {
        // console.log(e.target.files)
        // console.log(e.target.files[0])
        setPicture(e.target.files[0])
        // console.log(picture)
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="picture">Picture</label>
                    {/* <input ref={register} name="picture" type="file"></input> */}
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