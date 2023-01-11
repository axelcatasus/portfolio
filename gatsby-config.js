/**
 * @type {import('gatsby').GatsbyConfig}
 */

require('dotenv').config();

const dotenv = process.env;

module.exports = {
  siteMetadata: {
    title: `Axel Catasús' Portfolio`,
    siteUrl: `https://silver-biscotti-363c1f.netlify.app/`
  },
  plugins: [{
    resolve: 'gatsby-source-contentful',
    options: {
      "accessToken": dotenv.CONTENTFUL_ACCESS_TOKEN,
      "spaceId": dotenv.CONTENTFUL_SPACE_ID
    }
    // options: {
    //   "accessToken": "ql7DZ_-loYRgthXRFo_6BTs_yXx2Zeg4tvc1tBx1GSY",
    //   "spaceId": "dphdxqy6qqbr"
    // }
  }, "gatsby-plugin-image", "gatsby-plugin-sharp", "gatsby-transformer-sharp", "gatsby-plugin-sass", {
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


