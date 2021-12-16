import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { useFirestore } from 'reactfire';

export const useGetData = () => {
    const db = useFirestore();
    const [catData, setData] = useState([]);

    async function handleDataFetch(){
        const catsRef = collection(db, "cats");
        const catQuery = query(catsRef);
        const result = await getDocs(catQuery); 
        console.log(result)
        setData(result)
    }

    // Introducing the useEffect Hook to add our data to react State
    useEffect( () => {
        handleDataFetch();
    }, [])

    return {catData, getData:handleDataFetch}
}