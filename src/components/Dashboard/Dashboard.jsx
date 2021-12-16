import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore } from 'reactfire';
import { CatForm } from '..';

export function Dashboard(){
    return (
        <div>
            <div>Wow dashboard</div>
            <CatForm></CatForm>
        </div>
        
    );
}