import { useEffect, useState,} from 'react'
import { FormInput } from '../../formComponents/Input'
import { FormSelect } from '../../formComponents/Select'
import { FormSubmit } from '../../formComponents/SubmitButton'

import styles from './styles.module.css'

export function ProjectForm({handleSubmit, textButton, projectData}){
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData||{})
    
    useEffect(()=>{
        fetch('http://localhost:5000/categories',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        })
        .then((resp)=>resp.json())
        .then((data)=>setCategories(data))
        .catch((err)=>console.log(err))
    },[])
    
    const submit = (e)=>{
        e.preventDefault()
        //console.log(project)
        if(project.name !== undefined){
            handleSubmit(project, 'ok')
        }
        else{
            handleSubmit(project, 'error')
        }
    }

    function handleChange(e){
        setProject({...project, [e.target.name]:e.target.value})
    }

    function handleCategory(e){
        setProject({...project,category:{
            id:e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <FormInput 
                type="text" 
                text="Nome do projeto" 
                placeholder="Insira o nome do projeto" 
                name="name" 
                handleOnChange={handleChange}
                value={project.name ? project.name : ' '}
                />

            <FormInput 
                type="number" 
                text="Orçamento do projeto" 
                placeholder="Insira o orçamento total" 
                name="budget"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />

            <FormSelect 
                name="category_id" 
                text="Selecione a categoria" 
                options={categories} 
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            <FormSubmit text={textButton}/>
        </form>
    )
}