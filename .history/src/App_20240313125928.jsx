import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <>
      <header className='header'></header>
      <Outlet />
      <footer>footer</footer>
    </>
  )
}
