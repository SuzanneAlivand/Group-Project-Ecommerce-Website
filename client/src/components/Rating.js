import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const Rating = ({ value }) => {
  return (
    <div>
      <span>
        {value >= 1 ? (
          <FaStar style={{ color: "#f8e325" }} />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt style={{ color: "#f8e325" }} />
        ) : (
          <FaRegStar style={{ color: "#f8e325" }} />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FaStar style={{ color: "#f8e325" }} />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt style={{ color: "#f8e325" }} />
        ) : (
          <FaRegStar style={{ color: "#f8e325" }} />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar style={{ color: "#f8e325" }} />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt style={{ color: "#f8e325" }} />
        ) : (
          <FaRegStar style={{ color: "#f8e325" }} />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar style={{ color: "#f8e325" }} />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt style={{ color: "#f8e325" }} />
        ) : (
          <FaRegStar style={{ color: "#f8e325" }} />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FaStar style={{ color: "#f8e325" }} />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt style={{ color: "#f8e325" }} />
        ) : (
          <FaRegStar style={{ color: "#f8e325" }} />
        )}
      </span>
    </div>
  );
};

export default Rating;
