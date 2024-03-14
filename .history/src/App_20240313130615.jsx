import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <>
      <header className='header'>
        <nav className="">
          category
        </nav>
      </header>
      <Outlet />
      <footer>footer</footer>
    </>
  )
}
