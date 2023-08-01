import React, { useState, useMemo, useEffect } from "react";
import '../styles/App.css'
import MyModal from "../components/UI/MyModal/MyModal";
import TestAPI from "../components/TestAPI";
import Navbar from "../components/UI/navbar/navbar";
import { homeButtonContent } from "../components/utils/buttonContent";

function Home() {


  return (
    <div className="App">
      {/* <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal> */}
      <Navbar buttonContent={homeButtonContent}/>
      <TestAPI />
    </div >
  );
}

export default Home;