import * as React from "react";
import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { indexMain, socialMediaContainer, facebookIcon, githubIcon, instagramIcon, icon } from "./index.module.scss";
import HamburgerMenu from "../components/header/HamburgerMenu";
import Seo from "../components/seo";

const IndexPage = ({ data }) => {
  // receive the data from Contenful and store in variable homePage
  const homePage = data.allContentfulHomePage.nodes[0];
  // destructure the data from homePage
  const { title, message, facebook, github, instagram } = homePage;

  return (
    <>
      <Seo />
      <HamburgerMenu />
      <main className={indexMain}>
        <h1>{title}</h1>
        {renderRichText(message)}
        <section className={socialMediaContainer}>
          <a href={facebook} className={[facebookIcon, icon].join(' ')}>
            {/* span for accessibility */}
            <span className="visually-hidden">Facebook</span>
          </a>
          <a href={github} className={[githubIcon, icon].join(' ')}>
            <span className="visually-hidden">Github</span>
          </a>
          <a href={instagram} className={[instagramIcon, icon].join(' ')}>
            <span className="visually-hidden">Instagram</span>
          </a>
        </section>
      </main>
    </>
  );
};

export default IndexPage;

export const query = graphql`
  {
    allContentfulHomePage {
      nodes {
        facebook
        github
        instagram
        message {
          raw
        }
        title
      }
    }
  }
`;
