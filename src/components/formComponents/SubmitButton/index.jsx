import styles from './styles.module.css'

export function FormSubmit({text}){
    return(
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    )
}