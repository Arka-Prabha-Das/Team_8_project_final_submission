/* eslint-disable react/prop-types */

const ReviewCard = ({ data }) => {
    return (<div>
        <div>{data.name}</div>
        <div className="flex text-center mt-2">
      {[...Array(5)].map((_, index) => {
        const isFilled = index < data.stars;

        return (
          <span key={index} className={`star ${isFilled ? 'text-yellow-500' : 'text-gray-300'}`}>&#9733;</span>
        );
      })}
      <span className="text-sm">{data.stars}</span>
    </div>
        <div>{data.content}</div>
    </div>);
}

export default ReviewCard;