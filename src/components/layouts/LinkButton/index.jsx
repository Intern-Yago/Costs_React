import styles from './styles.module.css'
import {Link} from 'react-router-dom'

export function LinkButton({to, text}){
    return(
        <Link className={styles.btn} to={to}>
            {text}
        </Link>
    )
}