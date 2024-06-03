import { useState } from "react";
import { FaStar } from "react-icons/fa6";


const reviews = [
  {
    profilePhoto:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    name: "Emily Selman",
    rating: [1, 2, 3, 4, 5],
    description:
      "This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.",
  },
  {
    profilePhoto:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    name: "Hector Gibbons",
    rating: [1, 2, 3, 4, 5],
    description:
      "efore getting the Ruck Snack, I struggled my whole life with pulverized snacks, endless crumbs, and other heartbreaking snack catastrophes. Now, I can stow my snacks with confidence and style!",
  },
  {
    profilePhoto:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Mark Edwards",
    rating: [1, 2, 3, 4],
    description:
      "I love how versatile this bag is. It can hold anything ranging from cookies that come in trays to cookies that come in tins.",
  },
  {
    profilePhoto:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    name: "Hector Gibbons",
    rating: [1, 2, 3, 4, 5],
    description:
      "efore getting the Ruck Snack, I struggled my whole life with pulverized snacks, endless crumbs, and other heartbreaking snack catastrophes. Now, I can stow my snacks with confidence and style!",
  },
];
function DoctorReview() {
  const [showAll, setShowAll] = useState(false);

  const limit = 3;

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  const displayedReviews = showAll ? reviews : reviews.slice(0, limit);
  return (
    <div className="md:w-[40%] py-6 md:px-20 bg-white">
      {displayedReviews.map((review, index) => (
        <div key={index} className="border-y-gray-600 border-x-0 p-4">
          <div className="flex">
            <img
              className="w-[50px] h-[50px] object-contain rounded-full"
              src={review?.profilePhoto}
              alt=""
            />
            <div className="ml-4">
              <h1 className="font-bold text-sm">{review?.name}</h1>
              <div className="flex mt-1">
                {review?.rating.map((i) => (
                  <FaStar className="text-yellow-300 text-sm" key={i} />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-2">
            <p className="font-thin italic">{review?.description}</p>
          </div>
        </div>
      ))}
      <button
        onClick={toggleShowAll}
        className="mt-4 px-4 py-1 bg-blue-500 text-white rounded"
      >
        {showAll ? "Show Less" : "Show All"}
      </button>
    </div>
  );
}

export default DoctorReview;
