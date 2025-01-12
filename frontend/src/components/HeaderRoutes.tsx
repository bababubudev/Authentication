import { Link, matchPath, useLocation } from "react-router-dom";
import { routes } from "../routerUtil";

function HeaderRoutes() {
  const location = useLocation();

  return (
    <ul className="header-list">
      {routes.map((route, i) => {
        const isCurrent = matchPath(route.path, location.pathname);

        return (
          <li key={i} className={isCurrent ? "active-list" : ""}>
            <Link to={route.path}>
              {route.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default HeaderRoutes;