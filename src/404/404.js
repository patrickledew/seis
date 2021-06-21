import { Link } from "react-router-dom";
import "./404.css";
export default (props) => {
  return (
    <h1>
      404 Page Not Found. Return to the homepage <Link to="/">here.</Link>
    </h1>
  );
};
