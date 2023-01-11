import * as React from "react";
import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { indexMain, socialMediaContainer, facebookIcon, githubIcon, instagramIcon, icon } from "./index.module.scss";
import HamburgerMenu from "../components/header/HamburgerMenu";

const IndexPage = ({ data }) => {
  const homePage = data.allContentfulHomePage.nodes[0];
  const { title, message, facebook, github, instagram } = homePage;

  return (
    <>
      <HamburgerMenu />
      <main className={indexMain}>
        <h1>{title}</h1>
        {renderRichText(message)}
        <section className={socialMediaContainer}>
          <a href={facebook} className={[facebookIcon, icon].join(' ')}>
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

export const Head = ({ data }) => (
  <title>{data.allContentfulHomePage.nodes[0].title}</title>
);

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
