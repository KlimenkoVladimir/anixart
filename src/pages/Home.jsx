import React, { useState, useMemo, useEffect, useContext, useRef } from "react";
import "../styles/App.css";
import TestAPI from "../components/Share/TestAPI/TestAPI";
import Navbar from "../components/UI/navbar/navbar";
import { OptionContext } from "../context/context";
import { useFetching } from "../hooks/useFetching";
import HomeButtons from "../components/HomeButtons";
import Loader from "../components/UI/loader/loader";

function Home() {
  const [anime, setAnime] = useState([]);
  const { option, setOption } = useContext(OptionContext);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("bypopularity");
  const [type, setType] = useState(null);
  const [search, setSearch] = useState(false);
  const [isPageIncremented, setPageIncremented] = useState(false); // Добавленное состояние

  console.log(page);
  const [fetchAnime, isAnimeLoading, animeError] = useFetching(
    async (filter, type, page) => {
      const responce = await option(filter, type, page);
      // setAnime(prevAnime => [...prevAnime, ...responce.data.data])
      if (Array.isArray(responce.data.data)) {
        setAnime((prevAnime) => [...prevAnime, ...responce.data.data]);
      } else {
        // Обработка случая, когда responce.data.data не является массивом
        console.error("responce.data.data is not an array");
      }
    }
  );

  const bottomObserverRef = useRef(); // Создаем ref для элемента, который будем наблюдать

  useEffect(() => {
    if (search) {
      // Используем search как аргумент для fetchAnime, если search true
      fetchAnime(search);
    } else {
      fetchAnime(filter, type, page);
    }
  }, [option, page, search, type, filter]);

  useEffect(() => {
    if (!search) {
      // Создаем Intersection Observer для элемента наблюдения
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isPageIncremented) {
            setPageIncremented(true); // Устанавливаем флаг, чтобы не увеличивать page снова
            setPage(page + 1);
          }
        },
        { threshold: 0.1 } // Какая доля элемента должна быть видима для срабатывания
      );

      if (bottomObserverRef.current) {
        observer.observe(bottomObserverRef.current);
      }

      return () => {
        if (bottomObserverRef.current) {
          observer.unobserve(bottomObserverRef.current);
          setPageIncremented(false);
        }
      };
    }
  }, [bottomObserverRef, page, anime]);

  return (
    <div className="App">
      <Navbar
        buttonContent={
          <HomeButtons
            setAnime={setAnime}
            setPage={setPage}
            setFilter={setFilter}
            setType={setType}
            setSearch={setSearch}
          />
        }
        setSearch={setSearch}
        setAnime={setAnime}
      />
      {isAnimeLoading && (page === 1 || page === 2) ? (
        <Loader />
      ) : (
        <TestAPI maxItemCount={Infinity} anime={anime} />
      )}
      <div
        ref={bottomObserverRef}
        style={{ height: 1, background: "transparent" }}
      ></div>
    </div>
  );
}

export default Home;
