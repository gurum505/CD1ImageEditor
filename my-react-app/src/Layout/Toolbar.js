import styles from './Toolbar.module.css'

const Toolbar =({children}) =>(
    <div className={styles.Toolbar}>
      {children}
   </div>
);
export default Toolbar;