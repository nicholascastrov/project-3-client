import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <div className="home-section">
        <div className="image-container">
          <img
            src="https://burst.shopifycdn.com/photos/flatlay-iron-skillet-with-meat-and-other-food.jpg?width=1850&format=pjpg&exif=1&iptc=1"
            alt="Home-Page"
          />
        </div>
        <div className="text-container">
          <h3>Find what's for dinner?</h3>
          <p>Find your recipes here!</p>
          <div className="button-container">
            <Link to={"/search-by-ingredients"}>
              <button>Find Recipes!</button>
            </Link>
            <Link to={'/shopping-list/:userId'}>
              <button>Make a Shopping List</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home