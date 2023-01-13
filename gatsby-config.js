/**
 * @type {import('gatsby').GatsbyConfig}
 */

require('dotenv').config();
const dotenv = process.env;

module.exports = {
  siteMetadata: {
    title: `axcat's portfolio`,
    author: `axcat`,
    image: 'https://i.imgur.com/mp3YDtT.png',
    siteUrl: `https://silver-biscotti-363c1f.netlify.app/`,
    description: `The portfolio of axcat, a frontend developer from Stockholm, Sweden`,
    keywords: `axcat, Portfolio, Frontend, Developer, Web, Developer, Stockholm, Sweden, JavaScript, React, Gatsby, TypeScript, GraphQL, Node, HTML, CSS, SASS, PostCSS, Contentful, Netlify, Git, GitHub, GitLab, Bitbucket, Visual Studio Code, VSCode, WebStorm, IntelliJ, PHP, MySQL, MongoDB, Docker, Linux, Ubuntu, Windows, macOS, Mac, Apple, iPhone, iPad, Android, Mobile, Responsive, Design, UI, UX, User Interface, User Experience, Accessibility`,
  },
  plugins: [{
    resolve: 'gatsby-source-contentful',
    options: {
      "accessToken": dotenv.CONTENTFUL_ACCESS_TOKEN,
      "spaceId": dotenv.CONTENTFUL_SPACE_ID
    }
  }, "gatsby-plugin-image", "gatsby-plugin-sharp", "gatsby-transformer-sharp", "gatsby-plugin-sass", 'gatsby-plugin-react-helmet', {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  },
{
  resolve: `gatsby-plugin-manifest`,
  options: {
    icon: `src/images/favicon.png`,
  },
}]
};


