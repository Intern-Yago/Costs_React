import styles from './styles.module.css'
import savings from '../../../img/savings.svg'
import { LinkButton } from '../../layouts/LinkButton'

export function Home(){
    return(
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar seus projetos</p>
            <LinkButton to="/newproject" text="Criar projetos"/>
            <img src={savings} alt="Costs" />
        </section>
    )
}