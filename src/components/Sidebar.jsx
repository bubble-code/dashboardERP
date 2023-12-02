import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";


export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <aside className={`bg-gray-200 p-4 ${isOpen ? 'block' : 'hidden'}  md:w-1/4 lg:w-1/5 lg:block`}>
      <button className="block lg:hidden" onClick={() => setIsOpen(!isOpen)}>
        <i className="fas fa-fa-exclamation-circle ml-2 text-red-500">sdsds</i>
      </button>
      <div className="lg:flex lg:flex-col">
        <NavLink to={'busquedas'} style={({ isActive, isPending }) => {
          return {
            color: isActive ? "red" : "inherit",
          };
        }}
          className={({ isActive, isPending }) => {
            return isActive ? "active" : isPending ? "pending" : "";
          }} >Busquedas</NavLink>
        <NavLink to={'ofs'} style={({ isActive, isPending }) => {
          return {
            color: isActive ? "red" : "inherit",
          };
        }}
          className={({ isActive, isPending }) => {
            return isActive ? "active" : isPending ? "pending" : "";
          }}  >Orden Fabrica</NavLink>
        {/* Agrega más opciones según sea necesario */}
      </div>
    </aside>
  )
}
