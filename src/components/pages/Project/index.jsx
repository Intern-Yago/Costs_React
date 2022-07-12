import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { Loading } from '../../layouts/Loading'
import { Container } from '../../layouts/Container'

import styles from './styles.module.css'
import { ProjectForm } from '../../projectComponents/ProjectForm'
import {Message} from '../../layouts/Message'
import { ServiceForm } from '../../services/ServiceForm'
import { ServiceCard } from '../../services/ServiceCard'

export function Project(){
    const {id} = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [ type, setType] = useState()

    useEffect(()=>{
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
            .then( resp => resp.json())
            .then((data)=>{
                setProject(data)
                setServices(data.services)
            })
            .catch(err => console.log(err))
    },[id])

    function editPost(project){
        setMessage('')
        if(project.budget < project.cost){
            setMessage("O gasto não pode ser menor que o orçamento!")
            setType("error")
            return false
        }
        fetch(`http://localhost:5000/projects/${id}`,{
            method: "PATCH",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then(data =>{
            setProject(data)
            setShowProjectForm(false)
            setMessage("Projeto atualizado!")
            setType("success")
        })
        .catch(err => console.log(err))
    }

    function removeService(id, cost){
        setMessage('')
        const serviceUpdated = project.services.filter(
            (service)=> service.id!==id
        )
        const projectUpdated = project
        projectUpdated.services = serviceUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
        .then(resp => resp.json())
        .then( (data)=>{
            setProject(projectUpdated)
            setServices(serviceUpdated)
            setMessage("Serviço removido!")
            setType('success')
        })
        .catch(err => console.log(err))
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }
    function createService(project){
        setMessage('')
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
        if(newCost>parseFloat(project.budget)){
            setMessage('')
            setMessage("Orçamento ultrapassado")
            setType("error")
            project.services.pop()
            return false
        }
        project.cost = newCost
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then(data =>{
            setShowServiceForm(false)
            setMessage("Serviço adicionado com sucesso!")
            setType("success")
        })
        .catch(err=> console.log(err))
    }

    return(
        <>
        {
            project.name?(
                <div className={styles.project_details}>
                    <Container costumClass="column">
                        {message && <Message type={type} msg={message}/>}
                        <div className={styles.details_container}>
                            <h1>Projeto {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto':'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span>{project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de orçamentos: </span>R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ): (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} textButton="Concluir edição" projectData={project}/>
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                                <h2>Adicionar um serviço:</h2>
                                <button className={styles.btn} onClick={toggleServiceForm}>
                                    {!showServiceForm ? 'Adicionar':'Fechar'}
                                </button>
                                <div className={styles.project_info}>
                                    {showServiceForm && (
                                        <ServiceForm handleSubmit={createService} textBtn="Adicionar" projectData={project}/>
                                    )}
                                </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container costumClass="start">
                            {
                                services.length > 0 &&
                                services.map((service)=>(
                                    <ServiceCard 
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))
                            }
                            {
                                services.length === 0 && <p>Não há serviços cadastrados!</p>
                            }
                        </Container>
                    </Container>
                </div>
            ):(
                <Loading/>
            )
        }
        </>
    )
}