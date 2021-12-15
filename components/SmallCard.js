import Image from "next/image";

/* ESTA FUNCION CONTENDRA 3 PROPS QUE VAN A SER EXTRAIDOS DEL ENDPOINT PREDETERMINADO */
function SmallCard({ img, location, distance }) {
  return (
    <div
      className="flex items-center m-2 mt-5 space-x-4 rounded-xl
    cursor-pointer hover:bg-gray-100 hover:scale-105 transition
    transform duration-200 ease-out"
    >
      {/* LEFT SIDE */}
      {/* POSITION:RELATIVE, ANCHO Y ALTO: 16 */}
      <div className="relative h-16 w-16">
        {/* EXTRAE TODAS LAS IMAGENES DEL PROP */}
        <Image src={img} layout="fill" className="rounded-lg" />
      </div>

      {/* RIGHT SIDE */}
      <div>
        <h2>{location}</h2>
        <h3 className="text-gray-500">{distance}</h3>
      </div>
    </div>
  );
}

export default SmallCard;
