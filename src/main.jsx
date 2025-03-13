import { StrictMode } from "react";
import "flowbite";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import HomeMain from "./page/home/HomeMain.jsx";
import RootLayout from "./components/layout/RootLayout.jsx";
import ProgressBar from "./components/progress/ProgressBar.jsx";
import "./i18n.js";
import CoursesMain from "./page/courses/CoursesMain.jsx";
import Login from "./page/auth/Login.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import Register from "./page/auth/Register.jsx";
import ForgotPassword from "./page/auth/ForgotPassword.jsx";
import Dashboard from "./page/dashboard/Dashboard.jsx";
import NotFound from "./page/err/NotFound.jsx";
import Contact from "./page/contact/ContactMain.jsx";
import AboutUsMain from "./page/aboutus/AboutUsMain.jsx";
import Reading from "./page/dashboard/content/skill/Reading.jsx";
import Listening from "./page/dashboard/content/skill/Listening.jsx";
import Writing from "./page/dashboard/content/skill/Writing.jsx";
import Speaking from "./page/dashboard/content/skill/Speaking.jsx";
import A1A2grammar from "./page/dashboard/content/grammars/A1A2grammar.jsx";
import B1B2grammar from "./page/dashboard/content/grammars/B1B2grammar.jsx";
import C1grammar from "./page/dashboard/content/grammars/C1grammar.jsx";
import MoreDoc from "./page/dashboard/content/grammars/MoreDoc.jsx";
import A1A2vocabulary from "./page/dashboard/content/vocabularies/A1A2vocabulary.jsx";
import B1B2vocabulary from "./page/dashboard/content/vocabularies/B1B2vocabulary.jsx";
import { ToastContainer } from "react-toastify";
import VerifyOTP from "./page/auth/VerifyOTP.jsx";
import NewPassword from "./page/auth/NewPassword.jsx";
import ReadingDetail from "./page/dashboard/content/skillDetail/ReadingDetail.jsx";
import ExerciseDetail from "./page/dashboard/content/exercises/ExerciseDetail.jsx";
import { OverSkill } from "./page/dashboard/content/overview/OverSkill.jsx";
import { OverGrammar } from "./page/dashboard/content/overview/OverGrammar.jsx";
import { OverVocabulary } from "./page/dashboard/content/overview/OverVocabulary.jsx";
import ReadingA2 from "./page/dashboard/content/skillDetail/ReadingA2.jsx";
import ReadingB1 from "./page/dashboard/content/skillDetail/ReadingB1.jsx";
import ReadingB2 from "./page/dashboard/content/skillDetail/ReadingB2.jsx";
import ListeningA1 from "./page/dashboard/content/listeningDetail/ListeningA1.jsx";
import UserProfile from "./page/user/UserProfile.jsx";
import ListeningExercises from "./page/dashboard/content/exercises/ListeningExercises.jsx";
import ExtraVideo from "./page/dashboard/content/video/ExtraVideo.jsx";
import { WritingA1 } from "./page/dashboard/content/writingDetail/WritingA1.jsx";
import { SpeakingA1 } from "./page/dashboard/content/speakingDetail/SpeakingA1.jsx";
import SpeakingExercises from "./page/dashboard/content/exercises/SpeakingExercises.jsx";
import ImageTTS from "./page/dashboard/content/soundTts/ImageTTS.jsx";
import GrammarExercises from "./page/dashboard/content/exercises/GrammarExercises.jsx";
import ListeningA2 from "./page/dashboard/content/listeningDetail/ListeningA2.jsx";
import ListeningB1 from "./page/dashboard/content/listeningDetail/ListeningB1.jsx";
import ScrollToTop from "./components/progress/ScrollToTop.jsx";
import VocabulariesExercises from "./page/dashboard/content/exercises/VocabulariesExercises.jsx";
createRoot(document.getElementById("root")).render(
  <Suspense>
    <StrictMode>
      <ToastContainer
        position="top-right" // Position of the toast
        autoClose={3000} // Time before auto close (3s)
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // Change to "dark" if needed
      />
      <Provider store={store}>
        <ProgressBar />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<HomeMain />} />
              {/* <Route path="/courses" element={<CoursesMain />} /> */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<AboutUsMain />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />

            <Route element={<Dashboard />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reading" element={<Reading />} />
              <Route path="/listening" element={<Listening />} />
              <Route path="/writing" element={<Writing />} />
              <Route path="/speaking" element={<Speaking />} />
              {/* <Route path="/a1a2grammar" element={<A1A2grammar />} /> */}
              {/* <Route path="/b1b2grammar" element={<B1B2grammar />} />
              <Route path="/c1grammar" element={<C1grammar />} /> */}
            </Route>
            <Route element={<App />}>
              <Route path="/extra-video" element={<ExtraVideo />} />
              <Route path="/a1a2grammar" element={<A1A2grammar />} />
              <Route path="/b1b2grammar" element={<B1B2grammar />} />
              <Route path="/c1grammar" element={<C1grammar />} />
              <Route path="/a1a2vocabulary" element={<A1A2vocabulary />} />
              <Route path="/b1b2vocanulary" element={<B1B2vocabulary />} />
              <Route path="/soundTts" element={<ImageTTS />} />
              <Route
                path="/courses/reading/level=a1"
                element={<ReadingDetail />}
              />
              <Route path="/courses/reading/level=a2" element={<ReadingA2 />} />
              <Route path="/courses/reading/level=b1" element={<ReadingB1 />} />
              <Route path="/courses/reading/level=b2" element={<ReadingB2 />} />
              <Route
                path="/courses/listening/level=a1"
                element={<ListeningA1 />}
              />
              <Route
                path="/courses/listening/level=a2"
                element={<ListeningA2 />}
              />
              <Route
                path="/courses/listening/level=b1"
                element={<ListeningB1 />}
              />
              <Route path="/courses/writing/level=a1" element={<WritingA1 />} />
              <Route
                path="/courses/speaking/level=a1"
                element={<SpeakingA1 />}
              />
              <Route path="/skills" element={<OverSkill />} />
              <Route path="/over-grammar" element={<OverGrammar />} />
              <Route path="/over-vocabulary" element={<OverVocabulary />} />
              <Route path="/exercises/:ex_uuid" element={<ExerciseDetail />} />
              <Route
                path="/listening/:ex_uuid"
                element={<ListeningExercises />}
              />
              <Route
                path="/speaking/:ex_uuid"
                element={<SpeakingExercises />}
              />
              <Route path="/a1a2grammar" element={<A1A2grammar />} />
              <Route path="/lesson/:lessonId" element={<GrammarExercises />} />
              <Route
                path="/vocabulary/:lessonId"
                element={<VocabulariesExercises />}
              />
            </Route>
            <Route path="/verifyotp" element={<VerifyOTP />} />
            <Route path="/resetpassword" element={<NewPassword />} />
            <Route path="/userprofile" element={<UserProfile />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  </Suspense>
);
