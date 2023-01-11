import * as React from "react"
import { graphql, Link } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { backButton, singleProjectMain, screenshotsContainer } from './single-project.module.scss'
import HamburgerMenu from '../../components/header/HamburgerMenu'

const SingleProjectPage = ({ data }) => {
  const singleProject = data.contentfulProject
  const { title, published, url, categories, description, screenshots } = singleProject
  return (
    <>
      <button className={backButton}><Link to="/projects">&#60;</Link></button>
      <HamburgerMenu />
      <main className={singleProjectMain}>
        {published && <Link to={url}>Visit Site</Link>}
        <h1>{title}</h1>
        {categories.map((category) => (
          <p key={category}>Made with {category}</p>
        ))}
        {renderRichText(description)}
        <section className={screenshotsContainer}>
        {screenshots.map((screenshot) => (
          <img key={screenshot.file.url} src={screenshot.file.url} alt={title} />
        ))}

        </section>
      </main>
    </>
  )
}

export default SingleProjectPage
export const SingleProjectPageQuery = graphql`
  query ($id: String!) {
    contentfulProject(id: { eq: $id }) {
      id
      title
      slug
      published
      url
      categories
      description {
        raw
      }
      screenshots {
        file {
          url
        }
      }
    }
  }
`