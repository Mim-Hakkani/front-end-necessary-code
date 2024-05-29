const StarRating = ({ rating, starCount = 5 }) => {
  // Create an array of filled or half-filled stars based on the rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= starCount; i++) {
      if (rating >= i) {
        // Full star
        stars.push(<Icon key={i} name="star" style={styles.fullStar} />);
      } else if (rating > i - 1 && rating < i) {
        // Half star
        stars.push(<Icon key={i} name="star-half" style={styles.halfStar} />);
      } else {
        // Empty star
        stars.push(<Icon key={i} name="star-outline" style={styles.emptyStar} />);
      }
    }
    return stars;
  };

  return <View style={styles.starContainer}>{renderStars()}</View>;
};

// jsx 

<StarRating rating={55} />
