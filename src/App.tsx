import { Toaster } from "sonner";
import "./App.css";
import Tai1 from "./assets/img/tai1.png";
import Tai2 from "./assets/img/tai2.png";
import Tai3 from "./assets/img/tai3.png";
import { GiftCard, type GiftCardProps } from "./components/custom/gift-card";
import { LittleHeart } from "./components/custom/little-heart";
import { useEffect, useState } from "react";

function App() {
  const [listaPresentes, setListaPresentes] = useState<GiftCardProps[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/lista-presentes.json`)
      .then((res) => res.json())
      .then((data) => setListaPresentes(data));
  }, []);

  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 -z-1 opacity-80">
        <img src={Tai1} className="absolute w-30 md:w-50  top-0 left-0" />
        <img
          src={Tai2}
          className="absolute w-20 md:w-40 h-25 md:h-50 bottom-0 right-0"
        />
      </div>
      <div className="flex justify-center mt-10 mb-20 md:mb-10">
        <img src={Tai3} alt="" className="w-1/2 md:w-1/3" />
      </div>
      <div className="mx-auto max-w-2xl pb-5">
        <div className="relative flex flex-col gap-5 justify-center text-center text-red-800">
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-white px-3">
            Domigo, ás 15:30
          </div>
          <div className="flex justify-center mx-auto p-3 font-serif text-xl border-y-2 border-red-800">
            2
            <LittleHeart />
            NOVEMBRO
            <LittleHeart />
            2025
          </div>
          <div className="italic font-thin">
            <p>Lista de presentes</p>
            <p>Contribua e se divirta</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listaPresentes.map((gift, i) => (
              <GiftCard {...gift} key={`gift-${i}`} />
            ))}
          </div>
          <div className="italic font-thin text-sm">
            Àquele que é capaz de fazer infinitamente mais do que tudo o que
            pedimos ou pensamos - Efésios 3:20
          </div>
        </div>
      </div>
      <Toaster className="z-999"/>
    </>
  );
}

export default App;
