import * as React from "react";
import { graphql, Link } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import HamburgerMenu from "../../components/header/HamburgerMenu";
import Seo from "../../components/seo";
import { contactMain } from "./contact.module.scss";

const ContactPage = ({ data }) => {
  const contactPage = data.allContentfulContactPage.nodes[0];
  const { title, message, image, emailAddress, phoneNumber, seoTitle, seoDescription, path } = contactPage;

  return (
    <>
      <Seo title={seoTitle} description={seoDescription} path={path} />
      <HamburgerMenu />
      <main className={contactMain}>
        <h1>{title}</h1>
        <img src={image.resize.src} alt={title} />
        <section>
          {renderRichText(message)}
        </section>
        <section>
          <h2>📧 Email 📧</h2>
          <Link to={`mailto:${emailAddress}`}>{emailAddress}</Link>
        </section>
        <section>
          <h2>📞 Phone 📞</h2>
          <Link to={`tel:${phoneNumber}`}>{phoneNumber}</Link>
        </section>
      </main>
    </>
  );
};

export default ContactPage;


export const query = graphql`
  {
    allContentfulContactPage {
      nodes {
        title
        emailAddress
        image {
          resize(format: WEBP, height: 300) {
            src
          }
        }
        phoneNumber
        message {
          raw
        }
      seoTitle
      seoDescription
      path
      }
    }
  }
`
