import { useState } from 'react'
import { FormInput } from '../../formComponents/Input'
import { FormSubmit } from '../../formComponents/SubmitButton'
import styles from './styles.module.css'

export function ServiceForm({handleSubmit, textBtn, projectData}){
    const [service, setService] = useState({})
    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <FormInput 
                type="text"
                text="Nome do serviço"
                name="name"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange}
            />
            <FormInput 
                type="number"
                text="Custo do serviço"
                name="cost"
                placeholder="Insira o valor total"
                handleOnChange={handleChange}
            />
            <FormInput 
                type="text"
                text="Descrição do serviço"
                name="description"
                placeholder="Descreva o serviço"
                handleOnChange={handleChange}
            />
            <FormSubmit text={textBtn}/>
        </form>
    )
}