import LocationCityIcon from "@mui/icons-material/LocationCity";
import "./index.scss";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="card">
      <header className="card-header">
        <div className="hello">
          <img src={props.user.avatar_url} alt="" />
          <div className="heading-box">
            <h1>{props.user.name || props.user.login}</h1>
            <h3>
              {props.user.bio ?? "Sleep Code Eat"}
              <span>
                <LocationCityIcon /> {props.user.location}
              </span>
            </h3>
          </div>
        </div>
      </header>
      <main className="card-main">
        <div className="activity">
          <GroupIcon />
          <span className="activity-name">Followers</span>
          <span className="index">{props.user.followers}</span>
        </div>
        <div className="activity">
          <AccessTimeIcon /> <span className="activity-name">Following</span>
          <span className="index">{props.user.following}</span>
        </div>
        <div className="activity">
          <GitHubIcon />
          <span className="activity-name">
            GitHub Repo :
          </span>
          <Link className="user_github" to={{ pathname: props.user.html_url}} target="_blank">{props.user.public_repos}</Link>
        </div>
      </main>
    </div>
  );
};

export default Card;
