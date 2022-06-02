import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const RatingTwo = ({ rating, onClick, style }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <span key={i} onClick={() => onClick(i)} style={style}>
          {rating > i ? (
            <FaStar fontSize="21px" style={{ color: "#4e4e4e" }} />
          ) : (
            <FaRegStar fontSize="21px" style={{ color: "#4e4e4e" }} />
          )}
        </span>
      ))}
    </>
  );
};

export default RatingTwo;
