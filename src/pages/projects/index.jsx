import * as React from "react";
import { graphql, Link } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { projectsMain, projectArticle, categorySelectContainer, activeCategory, htmlLogo, jsLogo, vueLogo, logo } from "./projects.module.scss";
import HamburgerMenu from "../../components/header/HamburgerMenu";

const ProjectsPage = ({ data }) => {
  const projects = data.allContentfulProject.nodes;
  const categories = data.allContentfulProject.distinct;


  // function that returns a span whose class corresponds with the rendered category
  const getCategoryIcon = (category) => {
    switch (category) {
      case "HTML & CSS": return <span className={[htmlLogo, logo].join(' ')} />;
      case "Native JS": return <span className={[jsLogo, logo].join(' ')} />;
      case "Vue.js": return <span className={[vueLogo, logo].join(' ')} />;
      default: return '?'
    }
  }

  // useState hook to store the selected category
  const [selectedCategory, setCategory] = React.useState("All");

  // filter the projects to display based on the selected category
  const projectsToDisplay =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.categories.includes(selectedCategory));

  return (
    <>
      <HamburgerMenu />
      <main className={projectsMain}>
        <h1>Projects</h1>
        {/* using CSS to display section with class desktop when user is on desktop */}
        <section className={[categorySelectContainer, 'desktop'].join(' ')}>
          {/* using the useState hook to apply active-category class to selected category */}
          <button className={selectedCategory === 'All' ? activeCategory : ''} onClick={() => setCategory("All")}>All</button>
          {/* iterating the categories array from contentful */}
          {categories.map((category) => (
            // creating a button for each category
            <button key={category} onClick={() => setCategory(category)} className={selectedCategory === category ? activeCategory : ''}>
              {category}
            </button>
          ))}
        </section>
        {/* using CSS to display section with class mobile when user is on mobile */}
        <section className={[categorySelectContainer, 'mobile'].join(' ')}>
          <button className={selectedCategory === 'All' ? activeCategory : ''} onClick={() => setCategory("All")}>All</button>
          {categories.map((category) => (
            <button key={category} onClick={() => setCategory(category)} className={selectedCategory === category ? activeCategory : ''}>
              {getCategoryIcon(category)}
            </button>
          ))}
        </section>
        {/* iterating projectsToDisplay */}
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
      # using the distinct to get all unique values of categories within the projects
      distinct(field: { categories: SELECT })
    }
  }
`;
