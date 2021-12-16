import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { useFirestore } from 'reactfire';
import { CatForm, CatRow } from '..';
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
            catArr.push(cat.data())
        })
        console.log(catArr)
        return (
        <div>
            <div>Wow dashboard</div>
            {catArr.map( ({name, Location, age, notes, uuid}) => {
                return(
                    <CatRow uuid={uuid} name={name} location={Location} age={age} notes={notes}></CatRow>
                )
            })}
            <CatForm></CatForm>

        </div>
        
    );
    }
}