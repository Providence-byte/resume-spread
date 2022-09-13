import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../page/home";
import { AboutUs } from "../page/aboutUs";
import { MakeResume } from "../page/makeResume";
import { ResumeTemp } from "../page/resumeTemp";

export const ResumeRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/aboutus" exact element={<AboutUs />}></Route>
        <Route path="/makeresume/*" element={<MakeResume />}></Route>
        <Route path="/resumetemp" exact element={<ResumeTemp />}></Route>
      </Routes>
    </Router>
  );
};
