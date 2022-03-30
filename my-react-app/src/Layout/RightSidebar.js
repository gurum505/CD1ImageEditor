import styles from "./RightSidebar.module.css";


const RightSidebar = ({ wid,  toggleMenu, isOpen}) => { 
  /** 화면 바깥을 클릭시 닫히도록
   * const handleClose = async e => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideCildren)) {
      await setX(-width); 
      await setOpen(false);
    }
  }

  useEffect(()=> {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  })
   */
  return (
    <div className={styles.container}>
      <div style={{ width: `${wid[1]}px`, height: '100%',  transform: `translatex(-200px)`, transition:'0.4s ease'}}>
        <h2 onClick={() => toggleMenu(1)} className={styles.button}>
              ==
        </h2>
        <div className={styles.content}>
          <ul>
            
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


export default RightSidebar;