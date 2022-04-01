import styles from './Toolbar.module.css'

const Toolbar =({children}) =>(
    <header className={styles.Toolbar}>
      <div>
         {children}
      </div>
   </header>
);
export default Toolbar;