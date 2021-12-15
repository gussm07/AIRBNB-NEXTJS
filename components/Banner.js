import Image from "next/image";

function Banner() {
  return (
    /* DETERMINA TAMAÑOS EN ESPECÍFICO PARA CADA CASO PARA LA IMAGEN */
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
      <Image
        src="https://links.papareact.com/0fm"
        layout="fill"
        objectFit="cover"
      />
      {/* SE HACE OTRO DIV PARA QUE HEREDE LAS PROPIEDADES DEL PADRE, RELATIVE */}
      {/*POSITION:ABSOLUTE, A LA MITAD DE LA ALTURA, ESPACIO DE ANCHO-COMPLETO, CENTRADO  */}
      <div className="absolute top-1/2 w-full text-center ">
        <p>Not sure where to go? Perfect.</p>
        {/* COLOR TEXTO:MORADO, BACKGROUND:WHITE, PADDING-X:10, PADDING-Y:4, SOMBREADO:MEDIUM, REDONDEADO COMPLETO, LETRAS NEGRITAS, MARGEN EN Y:3, HOVER: SOMBRA MAS GRANDE, BOTON PRESIONADO: SCALA 90, ANIMACION DE 150   */}
        <button className="text-purple-500 bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150">
          I'm flexible
        </button>
      </div>
    </div>
  );
}

export default Banner;
