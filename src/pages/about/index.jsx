import * as React from "react";
import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { aboutMain, textSection, portraitsContainer, portrait } from "./about.module.scss";
import HamburgerMenu from "../../components/header/HamburgerMenu";

const AboutPage = ({ data }) => {
  const aboutPage = data.allContentfulAboutPage.nodes[0];
  const { title, message, portraits } = aboutPage;

  return (
    <>
      <HamburgerMenu />
      <main className={aboutMain}>
      <section className={portraitsContainer}>
          {portraits.map((slideImage, index) => (
            <img
              className={portrait}
              alt="portrait"
              key={index}
              src={slideImage.file.url}
            />
          ))}
        </section>
        <h1>{title}</h1>
        <section className={textSection}>
          <section>
            {renderRichText(message)}
          </section>
          <section>
            <h2>🎓 Education 🎓</h2>
            {renderRichText(aboutPage.education)}
          </section>
          <section>
            <h2>💵 Work 💵</h2>
            {renderRichText(aboutPage.work)}
          </section>
        </section>
      </main>
    </>
  );
};

export default AboutPage;

export const Head = () => <title>About</title>;

export const query = graphql`
  {
    allContentfulAboutPage {
      nodes {
        title
        message {
          raw
        }
        education {
          raw
        }
        portraits {
          file {
            url
          }
        }
        work {
          raw
        }
      }
    }
  }
`;
