import Link from 'next/link'
import styles from './Header.module.css'

const Header = () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <Link href="/"><span>WordPress Nextjs Portfolio</span></Link>
    </div>
    <nav>
      <ul className={styles.navList}>
        <li><Link href="/"><span>Home</span></Link></li>
        <li>
          <a
            href="https://github.com/robbiesherre67"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header
