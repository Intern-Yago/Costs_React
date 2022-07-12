import { useLocation } from "react-router-dom";

import { Message } from "../../layouts/Message";
import { Container } from "../../layouts/Container";
import { LinkButton } from "../../layouts/LinkButton";

import { Loading } from "../../layouts/Loading";

import styles from './styles.module.css'
import { useEffect, useState } from "react";
import { ProjectCard } from "../../projectComponents/ProjectCard";

export function Projects(){
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    useEffect(()=>{
        fetch('http://localhost:5000/projects',{
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
        })
        .then(resp=>resp.json())
        .then((data)=>{
            setProjects(data)
            setRemoveLoading(true)
        })
        .catch((err)=> console.log(err))
    },[])

    const location = useLocation()
    let type=''
    let message = ''
    if(location.state){
        message = location.state[1].message
        type=location.state[0].type
    }
    if(type === undefined || type === ''){
        type="error"
    }

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Projeto removido com sucesso')
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {message && <Message type={type} msg={message}/>}
            {projectMessage && <Message type="success" msg={projectMessage}/>}
            <Container customClass="start">
                {
                    projects.length > 0 && 
                    projects.map((project) => <ProjectCard 
                            name={project.name}
                            id={project.id}
                            key={project.id}
                            budget={project.budget}
                            category={project.category.name}
                            handleRemove={removeProject}
                        />
                    )
                }
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
}