import React from 'react';
import styles from './Modal.module.css';
import {
  TriangleIcon, CircleIcon,ImageIcon,ImageFromInternetIcon
  , RectangleIcon,FontSizeOutlinedIcon
} from "./icons/icons";
import {FontSizeOutlined}from "@ant-design/icons"

const Modal = (props) => {
  const { isModalOpen, closeModal} = props;

  return (
    <>
      {isModalOpen ? (
        <div className={styles.modal}>
          <div className={styles.section}>
            <button className={styles.button} onClick={closeModal}>
              x
            </button>
            <div className={styles.main}>
              <div>
                <RectangleIcon /> 
                <CircleIcon  />
                <TriangleIcon/>
              </div>
              <div>
                <ImageIcon/>
                <ImageFromInternetIcon/>
                {/* FIXME: 따로 스타일을 지정해줘야함 */}
                <span className={styles.textIcon}> 
                <FontSizeOutlinedIcon/>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Modal;