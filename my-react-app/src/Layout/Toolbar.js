import styles from './Toolbar.module.css'
const Toolbar =() =>(
    <header className={styles.Toolbar}>
      <div>Toolbar</div>
      <div>draw</div> 
      <div>rectangle</div> 
      <nav className={styles.ToolbarNav}>
         ...
      </nav>
   </header>
);
export default Toolbar;