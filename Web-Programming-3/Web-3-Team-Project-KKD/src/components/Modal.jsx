import styles from './Modal.module.css';
import WhiteX from '../assets/WhiteX.png';

const Modal = ({title, show, onClose, children}) => {
  return (
    show ? 
      <div className={styles.overlay}>
        <div className={styles.modalWindow}>
          <div className={styles.titleBar}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.close} onClick={onClose}>
              <img className={styles.closeButtonX} src={WhiteX} alt="X (Close)" />
            </div>
          </div>
          <div className={styles.modalContent}>
            {children}
          </div>
        </div>
      </div>
    : null
  )
}

export default Modal;