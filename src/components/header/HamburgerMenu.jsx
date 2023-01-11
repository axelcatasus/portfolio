import * as React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { hamburger, hamburgerIcon, closeIcon, mobileNav, modal} from './hamburger-menu.module.scss';

const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

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
    <>
      <div className={hamburger}>
        {!menuOpen &&
        <button 
          className={hamburgerIcon}
          onClick={() => toggleMenu()}
          aria-label="Menu Toggle"
        >
          &#9776;
        </button> 
      }      
      </div>
      {menuOpen &&
      <div className={modal} onClick={() => setMenuOpen(false)} onKeyDown={(e) => e.key !== 'Tab' ? setMenuOpen(false) : ''} role="button" tabIndex={0}>
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

