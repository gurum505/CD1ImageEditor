import styles from "./LeftSidebar.module.css";

const LeftSidebar = ({ wid, toggleMenu, isOpen}) => {
  
  return (
    <div className={styles.container}>
      <div style={{ width: `${wid[0]}px`, height: '100%',  transform: `translatex(-200px)`, transition:'0.4s ease'}}>
        <h2 onClick={() => toggleMenu(0)} className={styles.button}>
            ==
        </h2>
        <div className={styles.content}>
          
          <ul>
            <li>
              
            </li>
            <li>
              
            </li>
            <li>
              1 +++++++++
            </li>
            <li>
              2
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};


export default LeftSidebar;