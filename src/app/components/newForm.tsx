import { useState } from 'react';

interface input {
    id: number;
    owner: number;
    name: string;
    time: string;
    length: number;
    details: string;
    
}

interface newDetailProps{
    onAddForm: (item: input) => void;
}

export default function newForm({ onAddForm }:newDetailProps){
    const[formData, setFormData ] = useState({
        owner: 0,
        name: '',
        time:'',
        length: 0,
        details: '',
    });
}