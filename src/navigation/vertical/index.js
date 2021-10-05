import { Mail, Home } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Desarrolladores',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'addDeveloper',
    title: 'Agregar Desarrollador',
    icon: <Mail size={20} />,
    navLink: '/agregar-desarrollador'
  }
]
