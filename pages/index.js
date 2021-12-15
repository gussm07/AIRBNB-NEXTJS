import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import MediumCard from "../components/MediumCard";
import SmallCard from "../components/SmallCard";

/* exploreData ES UN PROP QUE CONTIENE INFORMACION EM FORMATO JSON PERO PUEDE SER UTILIZADO COMO FUNCTIONAL COMPONENT */
export default function Home({ exploreData, cardsData }) {
  return (
    <div className="">
      <Head>
        <title>AIRBNB</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-6">Explore Nearby</h2>

          {/* PULL SOME DATA FROM A SERVER-SERVER SIDE RENDERING - API ENDPOINTS */}
          {/* RECORRE CADA OBJETO EN exploreData con MAP */}
          {/* CREA UNA VARIABLE ITEM */}

          {/* /* HARDCODE EJEMPLO PARA EXTRAER INFO DE JSON DE UNA API */
          /* EN UN TEXTO, COLOCA INFO DE exploreData EN LA VARIABLE ITEM, PERO SOLO LA INFORMACION DE LOCATION */}
          {/* 
          
          {exploreData?.map((item) => (
            <h1>{item.location}</h1>
          ))}
          
          */}

          {/* PASA LOS PROPS DE SmallCard.js */}

          {/* DISPLAY: GRID */}
          {/* UNA COLUMNA PARA MOBILE VIEW */}
          {/* PARA TAMAÑO MEDIANO, 2 COLUMNAS */}
          {/* PARA TAMAÑO GRANDE, 3 COLUMNAS */}
          {/* PARA TAMAÑO EXTRA GRANDE, 4 COLUMNAS*/}
          <div
            className="grid
           grid-cols-1
           sm:grid-cols-2 
           lg:grid-cols-3 
           xl:grid-cols-4"
          >
            {exploreData?.map(({ img, distance, location }) => (
              <SmallCard
                key={img}
                /* EXTRAE LOS PROPS DE SmallCard.JS y los pone en la variable item */
                img={img}
                distance={distance}
                location={location}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          {/* DISPLAY FLEX, SPACE-X:3, HACER DESLIZABLE LAS IMAGENES, 
          SCROLLBAR: HIDE(PLUGIN DESCARGADO CON NPM Y AÑADIDO A PLUGIN EN tailwind.config) 
          PADDING: 3 PARA NO CORTAR LA IMAGEN CON LA TRANSICION DE AGRANDAR IMAGEN*/}
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData?.map(({ img, title }) => (
              <MediumCard key={img} img={img} title={title} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb"
          buttonText="Get Inspired"
        />
      </main>

      <Footer/>
    </div>
  );
}

/* ESTO DEBE ESTAR NECESARIAMENTE EN INDEX PARA HACER UN CLEVER SERVER-SIDE-RENDERING */
export async function getStaticProps() {
  /* VA EN BUSCA DE INFO EN FORMATO JSON EN ESE ENDPOINT */
  const exploreData = await fetch("https://links.papareact.com/pyp").then(
    (res) => res.json()
  );

  /* ANOTHER ENDPOINT */

  const cardsData = await fetch("https://links.papareact.com/zp1").then((res) =>
    res.json()
  );

  /* REGRESA LA INFORMACION EN UN FUNCTIONAL COMPONENT (PROP) */
  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
