import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

const SEO = ({ props }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          image
          keywords
        }
      }
    }
    `);
  const { title, description, author, siteUrl, image, keywords } = data.site.siteMetadata;

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="keywords" content={keywords} />
      <meta name="image" content={image} />

      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:type" content="website" />
      <meta name="og:url" content={siteUrl} />
      <meta name="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

export default SEO;
