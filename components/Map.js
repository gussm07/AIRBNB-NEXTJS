import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});
  /* TRANSFORM THE SEARCH RESULTS OBJECT INTO THE {LATITUD: 52.5664, LONGITUD: 19.7} */

  /* searchResults ES UN PROP QUE CONTIENE EL JSON CON TODA LA INFORMACION */
  /* .map, VA POR CADA OBJETO EN EL JSON, 
  DESPUES SE ASIGNA UNA VARIABLE result.
  POR CADA OBJETO QUE CONTENGA LA VARIABLE LONGITUD, SE BUSCA DENTRO DEL result, LO ASIGNADO COMO .long EN EL JSON */
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));
  /* SE OCUPA LA VARIABLE PARA OBTENER UN RESULTADO DEL MAPA
  EL CUAL CONTENGA TODAS LAS COORDENADAS EN UNA MISMA VISTA */
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });
  return (
    /* PONE EL MAPA COMO PADRE PARA QUE PUEDA HEREDAR COSAS
      EL MAP STYLE ES UNA CONFIGURACION HECHA EN LA PAGINA OFICIAL DE MAPBOX
      AL IGUAL QUE MAPBOXAPIKEY QUE FUE DADA, PERO LA INCORPORAMOS EN NEXTJS.CONFIG
      COMO UNA VARIABLE DE ENTORNO PARA QUE PUEDE SER UTILIZADA CUANDO 
      LA APP SE ENCUENTRE EN PRODUCCION */
    <ReactMapGL
      mapStyle="mapbox://styles/gsm150500/ckxjf7pbx05qf14ldh6b4m1h2"
      mapboxApiAccessToken={process.env.mapbox_key}
      /* SPREAD... EVERY COMPONENT OF VIEWPORT VARIABLE */
      {...viewport}
      /* SENTENCIA DE CODIGO PARA PERMITIR AL MAPA MOVERLO COMO SE DESEA 
      HACER ZOOM IN, ZOOM OUT, ETC...*/
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              🚩
            </p>
          </Marker>
          {/* THIS IS THE POPUP THAT SHOULD SHOW IF WE CLICK ON A MARKER  */}
          {/* SI LA LONGITUD SELECCIONADA ES IGUAL A LA LONGITUD DEL RESULTADO RESULTADO, ENTONCES...  */}
          {selectedLocation.long === result.long ? (
            /* MUESTRA UN POPUP */
            /* ESTA CERRADO HASTA QUE SE TENGA LA LOCATION SELECCIONADA */
            /* BOTON DE CERRAR, TRUE */
            /* MOSTRAR EN LA MISMA LATITUD Y LONGITUD */
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {/* ARROJA EL TITULO DEL RESULTADO EN EL POPUP */}
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
