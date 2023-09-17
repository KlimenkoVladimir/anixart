import React, { useState, useMemo, useEffect, useContext } from "react";
import "../styles/App.css";
import { OptionContext } from "../context/context";
import { Link } from "react-router-dom";
import TestService from "../API/TestService";

function HomeButtons({ setAnime, setPage, setFilter, setType, setSearch }) {
  const { setOption } = useContext(OptionContext);
  const selectOption = async (serviseMethod) => {
    const newOption = await serviseMethod();
    setOption(newOption);
  };

  return (
    <div className="links">
      <button
        onClick={() => {
          setAnime([]);
          setPage(1);
          setFilter("airing");
          setType(null);
          setSearch(false);
          setOption(() => TestService.getAnime);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Онгоинги
      </button>
      <button
        onClick={() => {
          setAnime([]);
          setPage(1);
          setFilter("upcoming");
          setType(null);
          setSearch(false);
          setOption(() => TestService.getAnime);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Анонсы
      </button>
      <button
        onClick={() => {
          setAnime([]);
          setPage(1);
          setFilter("bypopularity");
          setType(null);
          setSearch(false);
          setOption(() => TestService.getAnime);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Завершенные
      </button>
      <button
        onClick={() => {
          setAnime([]);
          setPage(1);
          setFilter("bypopularity");
          setType("movie");
          setSearch(false);
          setOption(() => TestService.getAnime);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Фильмы
      </button>
      <button
        onClick={() => {
          setAnime([]);
          setPage(1);
          setFilter(null);
          setType("ova");
          setSearch(false);
          setOption(() => TestService.getAnime);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        OVA
      </button>
      <Link to={"/favorite"}>Закладки</Link>
    </div>
  );
}

export default HomeButtons;
