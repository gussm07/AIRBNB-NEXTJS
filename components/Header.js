import Image from "next/image";
import {
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  SearchIcon,
  UsersIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
/* IMPORTACIONES PARA DATE-PICKER, INSTALADO EN NPM */
import "react-date-range/dist/styles.css";
import "react-date-range/dist//theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";

/* placeholder ES UN PROP QUE SE HIZO EN search.js */
function Header({ placeholder }) {
  /* ESTA VARIABLE SERA LA QUE MANEJA EL ESTADO DEL INPUT SEARCH, ESTA EN STRING VACIO
  YA QUE AL MOMENTO DE ESCRIBIR EN EL INPUT, LA VARIABLE TOMARA ESE STRING Y LO COLOCARA COMO ESTADO */
  const [searchInput, setSearchInput] = useState("");
  /* LAS DOS VARIABLES SIGUIENTES DETERMINARAN LAS FECHAS
  DE INICIO Y DE FINAL PARA PODER ESCOGER EN EL DATE-PICKER */
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  /* VARIABLE PARA MANEJAR EL ESTADO DEL NUMERO DE INVITADOS EN EL INPUT DATE-PICKER */
  const [noOfGuests, setNoOfGuests] = useState(1);

  /* VARIABLE PARA DIRIGIR A LA PAGINA QUE GUSTES */
  const router = useRouter();

  /* EL PARAMETRO search AL MOMENTO DE SER CLICKABLE, 
  CONTRARA CON LOS SIGUIENTES PARAMETROS:
  REDIRIGE A LA PAGINA search
  HACE UN QUERY(ESTE QUERY SERÁ REPRESENTADO EN LA DIRECCION URL
    CON LOS PARAMETROS DE: locatio, startDate, endDate, No. of Guests) */
  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
  };

  /* LA SELECCION DE FECHAS SERA DETERMINADA POR ESTA VARIABLE*/
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  /* .selection tiene que ser lo mismo que la key de arriba para poder
  seleccionar las fechas, de lo contrario no funcionará */
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };

  return (
    /* STICKY, TOP 0, z-50 SIEMPRE ENFRENTE, DISPLAY GRID EN 3 COLUMS, UNA SOMBRA DEBAJO,5 PADDING EN Y, 5 PADDING EN X, BREAKPOINTS O MEDIUM SCREEN (PARA RESPONSIVE)    */
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:px-10">
      {/* POSICION RELATIVA, DISPLAY FLEX, CENTRADO, ALTURA DE 10, CURSOR POINTER, MARGIN WIDTH AUTO */}
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-10 cursor-pointer my-auto"
      >
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
          /* ASIGNA LA VARIABLE QUE ESTARA VIENDO SI HAY CAMBIOS DE ESTADO EN EL INPUT */
          value={searchInput}
          /* SE ASIGNA e, COMO UN VALOR PARA ESTAR CAMBIANDO CONSTANTEMENTE EN EL INPUT
          PERO ESTE ARROJARÁ EN LA VARIABLE (setSearchInput) LO QUE SE PUSO, QUE EN UN PRINCIPIO TUVO STRING VACIO*/
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          type="text"
          placeholder={placeholder || "Start your search"}
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
      {/* SOLO SI HAY CAMBIOS EN EL SEARCH INPUT, MUESTRA LO SIGUIENTE... */}
      {searchInput && (
        /* DISPLAY:FLEX, FLEX EN COLUMNS, 3 COLUMNAS, MARGIN-X: AUTO(ESTO LO PONE ABSOLUTAMENTE CENTRADO) */
        <div className="flex flex-col col-span-3 mx-auto ">
          {/* MUESTRA EL DATE-PICKER Y EL RANGO DE FECHAS SERA IGUAL 
          A LA VARIABLE selectionRange QUE DETERMINA INICIO Y FINAL */}
          {/* MIN DATE EXIGE QUE NO PUEDAS SELECCIONAR FECHAS ANTERIORES A LA DE TU
          FECHA EN LA QUE ESTAS OCUPANDO EL SISTEMA */}
          {/* RANGECOLORS: COLOR PARA MOSTRAR EN DATE-PICKER */}
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guest
            </h2>
            <UsersIcon className="h-5" />
            {/*
            VALUE: MANEJA EL ESTADO DE LA VARIABLE 
            onChange: CADA QUE HAY UN CAMBIO, ACTUALIZA SU VALOR POR EL DEL INPUT
            TYPE: NUMEROS
            MIN: VALOR MINIMO A MOSTRAR EN EL INPUT
            */}
            <input
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(e.target.value)}
              type="number"
              min={1}
              className="w-12 pl-2 text-lg outline-none text-red-400"
            />
          </div>
          <div className="flex">
            <button onClick={resetInput} className="flex-grow text-gray-500">
              Cancel
            </button>
            <button onClick={search} className="flex-grow text-red-400">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
