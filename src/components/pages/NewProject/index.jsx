import { useNavigate } from 'react-router-dom'
import { ProjectForm } from '../../projectComponents/ProjectForm'
import styles from './styles.module.css'

export function NewProject(){
    const navigate = useNavigate()

    function createPost(project, confirm){
        project.cost = 0
        console.log(project.budget);
        if(project.budget === undefined){
            project.budget = 0
        }
        if(project.category===undefined){
            project.category={
                id: "0",
                name: "Undefined"
            }
        }
        project.services = []
        if(confirm === "ok"){
            fetch('http://localhost:5000/projects',{
                method: 'POST',
                headers:{
                    "Content-Type":'application/json',
                },
                body: JSON.stringify(project),
            })
            .then(resp => resp.json())
            .then((data)=>{
                navigate('/projects', {state: [{type:'success'},{message: 'Projeto criado com sucesso'}]})
            })
            .catch((err)=>console.log(err))
        }
        else if(confirm === "nome"){
            navigate('/projects', {state: [{type: 'error'},{message: 'Nome do projeto não definido'}]})
        }
        else{
            navigate('/projects', {state: [{type: 'error'},{message: 'Nome não definido'}]})
        }

    }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} textButton="Criar projeto"/>
        </div>
    )
}