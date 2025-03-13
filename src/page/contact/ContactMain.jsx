import React from "react";
import { useTranslation } from "react-i18next";
import FAQ from "./FaqSection";
import ContactSection from "./ContactSection";
import AskSection from "./AskSection";
import CardSection from "./CardSection";
import Bubbles from "../../components/card/Bubble";
import AiDescription from "./AiDescription";


export function Contact() {
  const { t } = useTranslation("contact");

  //container
  const Container = ({ children, className = "" }) => {
    return (
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
        {children}
      </div>
    );
  };

  return (
    <main>
      {/* Section 1, card */}
      <section>
        <div className="h-0 w-full mx-auto max-w-8xl flex items-center justify-center ">
          <Bubbles></Bubbles>
        </div>
        <Container>
          <CardSection />
        </Container>
      </section>
      {/* Section 2, FAQ */}
      <section>
        <Container className="">
          <div className="  text-center">
            <h2 className="text-primary-500 text-heading-1 font-bold pt-14">
              <span>{t("title-second")}</span>
            </h2>
            {/* import from faq */}
            <div className="">
              <FAQ />
            </div>
          </div>
        </Container>
      </section>
      {/* Section 3, Ask-button*/}
      <section>
        {/* <div className="h-0 w-full mx-auto max-w-8xl flex items-center justify-center ">
          <Bubbles></Bubbles>
        </div> */}
        <Container className="mt-10">
          <div className="  text-center">
            <div className="">
              <AskSection />
            </div>
          </div>
        </Container>
      </section>
      {/* Section 4, contact message */}
      <section>
        {/* <div className="h-0 w-full mx-auto max-w-8xl flex items-center justify-center ">
          <Bubbles></Bubbles>
        </div> */}
        <Container>
          <div className="">
            <h2 className="text-primary-500 text-heading-1 font-bold text-center py-14">
              <span>{t("title-third")}</span>
            </h2>
            <div className="">
              <ContactSection />
            </div>
          </div>
        </Container>
      </section>
      {/* Section 5, Ai supporter */}
      <section>
        <div className="h-0 w-full mx-auto max-w-8xl flex items-center justify-center ">
          <Bubbles></Bubbles>
        </div>
        <Container>
          <AiDescription />
        </Container>
      </section>
    </main>
  );
}

export default Contact;
