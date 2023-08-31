import React, { useState, useMemo, useEffect, useContext, useRef } from "react";
import '../styles/App.css'
import TestAPI from "../components/TestAPI";
import Navbar from "../components/UI/navbar/navbar";
import { OptionContext } from "../context/context";
import { useFetching } from "../hooks/useFetching";
import HomeButtons from "../components/HomeButtons";
import ProfileRating from "../components/ProfileRating";

function Rating() {

  
  return (
    <div>
        {/* <Navbar buttonContent={<HomeButtons setAnime={setAnime} setPage={setPage} setFilter={setFilter} setType={setType} setSearch={setSearch}/>} setSearch={setSearch} setAnime={setAnime} /> */}
        <Navbar buttonContent={<HomeButtons />}/>
        <ProfileRating starIcons={true} maxItemCount={Infinity} size={"15"}/>
    </div>
  );
}

export default Rating;



