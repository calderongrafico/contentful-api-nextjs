import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <a>
            <h1>
              <span>Welcome to my</span>
              <span>Photo Book</span>
            </h1>
            <h2>Enjoy the view!</h2>
          </a>
        </Link>
      </header>

      <div className="page-content">
        { children }
      </div>

      <footer>
        <p>Copyright 2022 - Cesar Calderon Photography</p>
      </footer>
    </div>
  )
}
