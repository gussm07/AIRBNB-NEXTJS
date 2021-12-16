import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";

function Search({ searchResults }) {
  /* ESTA VARIABLE CONTIENE LA INFORMACION DE URL COMO UN OBJETO */
  const router = useRouter();
  /* ES6 Destructuring */
  const { location, startDate, endDate, noOfGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedendDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedendDate}`;

  return (
    <div className="h-screen">
      {/* LA VARIABLE placeholder CONTIENE INFORMACION DEL HEADER Y QUE ES
        USADO COMO PROP EN Header.js PARA PASAR ESA INFO
        EN EL INPUT TEXT  */}
      <Header placeholder={`${location} | ${range} | ${noOfGuests}`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {noOfGuests} of guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            {/* SE PASA EL PARAMETRO DEL URL COMO UN OBJETO CON ROUTER.QUERY */}
            Stays in {location}
          </h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">
              Cancellation Flexibility
            </p>
            <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">
              Type of Place
            </p>
            <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">
              Price
            </p>
            <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">
              Rooms and Beds
            </p>
            <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">
              More filters
            </p>
          </div>
          {/* PASA LOS OBJETOS JSON A FUNCTIONAL COMPONENTS */}
          <div className="flex flex-col">
            {searchResults.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
