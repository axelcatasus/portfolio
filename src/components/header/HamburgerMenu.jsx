import * as React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { hamburger, hamburgerIcon, closeIcon, mobileNav, modal} from './hamburger-menu.module.scss';

const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  // using useStaticQuery to get the paths from Contentful
  // sorting the data by ascending order with graphql
  const data = useStaticQuery(graphql`
    {
      allContentfulNavigationLinks (sort: {order: ASC}){
        nodes {
          pathAlias
          pathName
          id
        }
      }
    }
  `)

  const paths = data.allContentfulNavigationLinks.nodes;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    // using aria-label to make the button accessible to screen readers
    <>
      <div className={hamburger}>
        {!menuOpen &&
        <button 
          className={hamburgerIcon}
          onClick={() => toggleMenu()}
          aria-label="Menu Toggle"
        >
          &#9776;
        </button>}     
      </div>
      {menuOpen &&
      // using role="button" to make the div accessible to screen readers
      // using tabIndex={0} to make the div focusable
      // using onKeyDown to make the div focusable with the tab key
      // using e.key !== 'Tab' to prevent the div from closing when the tab key is pressed
      <div className={modal} onClick={() => setMenuOpen(false)} onKeyDown={(e) => e.key !== 'Tab' && e.key !== 'Shift' ? setMenuOpen(false) : ''} role="button" tabIndex={0}>
        <button 
          className={closeIcon}
          onClick={() => toggleMenu()}
          aria-label="Menu Toggle"
        >
          &times;
        </button>
        <nav className={mobileNav}>
          {paths.map((path) => 
            <Link to={path.pathName}>
              {path.pathAlias}
            </Link>
          )}
        </nav>
      </div>}
    </>
  );
}

export default HamburgerMenu;

