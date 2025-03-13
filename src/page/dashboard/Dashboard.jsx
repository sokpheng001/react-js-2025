import Sidebar from "./Sidebar";
import User from "./content/dashbaordUser/User";
import Listening from "./content/skill/Listening";
import Reading from "./content/skill/Reading";
import NavbarDashboard from "../../components/header/NavbarDashboard";
import { useSelector, useDispatch } from "react-redux";
import Writing from "./content/skill/Writing";
import Speaking from "./content/skill/Speaking";
import A1A2grammar from "./content/grammars/A1A2grammar";
import B1B2grammar from "./content/grammars/B1B2grammar";
import C1grammar from "./content/grammars/C1grammar";
import MoreDoc from "./content/grammars/MoreDoc";
import A1A2vocabulary from "./content/vocabularies/A1A2vocabulary";
import B1B2vocabulary from "./content/vocabularies/B1B2vocabulary";
import {
  closeSidebar,
  toggle,
} from "../../redux/features/user/visibilitySlice";
import ExtraVideo from "./content/video/ExtraVideo";
import ImageTTS from "./content/soundTts/ImageTTS";
import React, { useEffect, useRef } from "react";

const Dashboard = () => {
  const { activeItem } = useSelector((state) => state.sidebar);

  const dispatch = useDispatch();

  return (
    <div>
      <NavbarDashboard />
      <Sidebar />

      <div onClick={() => dispatch(closeSidebar())}>
        {activeItem === "dashboard" && <User />}
        {activeItem === "listening" && <Listening />}
        {activeItem === "reading" && <Reading />}
        {activeItem === "writing" && <Writing />}
        {activeItem === "speaking" && <Speaking />}
        {activeItem === "a1a2grammar" && <A1A2grammar />}
        {activeItem === "b1b2grammar" && <B1B2grammar />}
        {activeItem === "c1grammar" && <C1grammar />}
        {activeItem === "a1a2vocabulary" && <A1A2vocabulary />}
        {activeItem === "b1b2vocabulary" && <B1B2vocabulary />}
        {activeItem === "extraVideo" && <ExtraVideo />}
        {activeItem === "soundTts" && <ImageTTS />}
      </div>
    </div>
  );
};

export default Dashboard;
