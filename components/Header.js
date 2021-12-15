import Image from "next/image";
import {
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  SearchIcon,
  UsersIcon,
  UserIcon,
} from "@heroicons/react/solid";

function Header() {
  return (
    /* STICKY, TOP 0, z-50 SIEMPRE ENFRENTE, DISPLAY GRID EN 3 COLUMS, UNA SOMBRA DEBAJO,5 PADDING EN Y, 5 PADDING EN X, BREAKPOINTS O MEDIUM SCREEN (PARA RESPONSIVE)    */
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:px-10">
      {/* POSICION RELATIVA, DISPLAY FLEX, CENTRADO, ALTURA DE 10, CURSOR POINTER, MARGIN WIDTH AUTO */}
      <div className="relative flex items-center h-10 cursor-pointer my-auto">
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      {/* FLEX, LO HACE EN UNA FILA, CENTRADOS, ANCHO DE BORDE VISIBLE SOLO PARA TAMAÑO MEDIANO DE PANTALLA, BORDE REDONDEADO, PADDING-Y:2, SOMBRA SOLO PARA TAMAÑO MEDIANO  */}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        {/* HEROICONS PARA LA LUPA DE BUSQUEDA */}
        {/* EL TEXTO LO AGRANDE CONFORME AGRANDA LA PANTALLA, MANDANDO AL ICONO AL FINAL DEL INPUT TEXT, PADDING-LEFT: 5, BACKGROUND: TRANSPARENTE */}
        <input
          className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          type="text"
          placeholder="Start your search"
        />
        {/*DESAPARECE EL ICONO EN PANTALLA CHICA,  HEIGHT:8, BACKGROUND: RED, COLOR-TEXT: WHITE, HACER REDONDO ICONO, PADDING:2, CURSOR, MEDIUM SCREEN: MARGEN X:2   */}
        <SearchIcon
          className="hidden md:inline-flex 
          h-8 
        bg-red-400 
        text-white 
          rounded-full 
          p-2 
         cursor-pointer
         md:mx-2
         "
        />
      </div>
      {/* DISPLAY:FLEX, CENTRADO,  ESPACIO ENTRE CADA COMPONENTE EN X:4, MANDA AL FINAL DE LA ULTIMA COLUMNA, COLOR:GRAY,  */}
      <div className="flex items-center space-x-4 justify-end text-gray-500">
        {/* OCULTO POR DEFAULT, MOSTRAR SOLO EN PANTALLA MEDIUM-SIZE Y ARRIBA */}
        <p className="hidden md:inline">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        {/* DISPLAY:FLEX, CENTRADO, ESPACIO ENTRE COMPONTES:2, GROSOR BORDE:2, REDONDEADO, PADDING:2 */}
        <div className="flex items-center space-x-2 border-2 rounded-full p-2 ">
          <MenuIcon className="h-6 cursor-pointer" />
          <UserIcon className="h-6 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}

export default Header;
