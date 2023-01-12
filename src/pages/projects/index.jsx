import * as React from "react";
import { graphql, Link } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { projectsMain, projectArticle, categorySelectContainer, activeCategory, htmlLogo, jsLogo, vueLogo, logo } from "./projects.module.scss";
import HamburgerMenu from "../../components/header/HamburgerMenu";

const ProjectsPage = ({ data }) => {
  const projects = data.allContentfulProject.nodes;
  const categories = data.allContentfulProject.distinct;

  const getCategoryIcon = (category) => {
    switch (category) {
      case "HTML & CSS": return <span className={[htmlLogo, logo].join(' ')} />;
      case "Native JS": return <span className={[jsLogo, logo].join(' ')} />;
      case "Vue.js": return <span className={[vueLogo, logo].join(' ')} />;
      default: return '?'
    }
  }

  const [selectedCategory, setCategory] = React.useState("All");

  const projectsToDisplay =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.categories.includes(selectedCategory));

  return (
    <>
      <HamburgerMenu />
      <main className={projectsMain}>
        <h1>Projects</h1>
        <section className={[categorySelectContainer, 'desktop'].join(' ')}>
          <button className={selectedCategory === 'All' ? activeCategory : ''} onClick={() => setCategory("All")}>All</button>
          {categories.map((category) => (
            <button key={category} onClick={() => setCategory(category)} className={selectedCategory === category ? activeCategory : ''}>
              {category}
            </button>
          ))}
        </section>
        <section className={[categorySelectContainer, 'mobile'].join(' ')}>
          <button className={selectedCategory === 'All' ? activeCategory : ''} onClick={() => setCategory("All")}>All</button>
          {categories.map((category) => (
            <button key={category} onClick={() => setCategory(category)} className={selectedCategory === category ? activeCategory : ''}>
              {getCategoryIcon(category)}
            </button>
          ))}
        </section>
        {projectsToDisplay.map((project) => {
          const { title, description, id, screenshots, slug } = project;
          return (
            <article key={id} className={projectArticle}>
              <Link to={slug}>
                <h2>{title}</h2>
              </Link>
              {renderRichText(description)}
              <section className="screenshots">
                <img
                  key={screenshots[0].resize.src}
                  src={screenshots[0].resize.src}
                  alt={"screenshot from " + title}
                />
              </section>
            </article>
          );
        })}
      </main>
    </>
  );
};

export default ProjectsPage;

export const Head = () => <title>Projects</title>;

export const query = graphql`
  {
    allContentfulProject {
      nodes {
        description {
          raw
        }
        id
        screenshots {
          resize(width: 800) {
            src
          }
        }
        slug
        title
        categories
      }
      distinct(field: { categories: SELECT })
    }
  }
`;
