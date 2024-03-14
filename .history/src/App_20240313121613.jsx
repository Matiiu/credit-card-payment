import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <>
      <header>header</header>
      <Outlet />
      <footer>footer</footer>
    </>
  )
}
