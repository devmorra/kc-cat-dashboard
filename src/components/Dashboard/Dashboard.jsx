import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { useFirestore } from 'reactfire';
import { AddCatForm, CatRow } from '..';
import { useState } from 'react';
import { useGetData } from '../../custom-hooks/FetchCats';

export function Dashboard(){

    // const [cats, setCats] = useState();
    let { catData, getData} = useGetData();
    const db = useFirestore();
    const catsRef = collection(db, "cats");
    const catQuery = query(catsRef);
    

    // async function getCats() {
    //     setCats(await getDocs(catQuery));
    //     cats.forEach( (doc) => {
    //         console.log(doc.data())
    //     } )
    // }
    // getCats()
    


    if (catData === []){
        return(<div>Loading Cats Data</div>)
    }
    else {
        // console.log("cats", catData)
        // catData.forEach( (cat) =>{
        //     console.log(cat.data())
        // })
        let catArr = []
        catData.forEach( (cat) =>{
            let catData = cat.data()
            catData.doc = cat
            catArr.push(catData)
        })
        console.log(catArr)
        return (
        <div>
            <div>Wow dashboard</div>
            {catArr.map( ({name, location, age, notes, uuid, doc}) => {
                return(
                    <CatRow uuid={uuid} name={name} location={location} age={age} notes={notes} doc={doc}></CatRow>
                )
            })}
            <AddCatForm></AddCatForm>

        </div>
        
    );
    }
}