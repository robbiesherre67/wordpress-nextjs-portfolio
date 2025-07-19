import styles from './Footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <p>&copy; {new Date().getFullYear()} Robbie Sherre</p>
  </footer>
)

export default Footer
