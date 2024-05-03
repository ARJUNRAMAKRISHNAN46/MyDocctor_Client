import { TiStarFullOutline } from "react-icons/ti";

export const review = [
  {
    name: "Abhijith Palakkal",
    profile: "../../../src/assets/feyz.jpeg",
    rating: [1,1,1,1,0],
    description:
      'The standard chunk of Lorem Ipsum used since the 1and 1.10.33 from "de Finibus Bonorum et Malorum" by Ci in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
  },
  {
    name: "Feyz Ibrahim",
    profile: "../../../src/assets/feyz.jpeg",
    rating: [1,1,1,0,0],
    description:
      'Lorem Ipsum used since the 1500s is reproduced below  from "de Finibus Bonorum et Malorum" by Cicero are also reproducediginal form, accompanied by English versions from the 1914 translation by H. Rackham.',
  },
  {
    name: "Muhammed Nabeel",
    profile: "../../../src/assets/feyz.jpeg",
    rating: [1,1,1,1,1],
    description:
      'The standard chunk of Lorem Ipsum used since the 1 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
  },
];

function Reviews() {
  return (
    <div className="md:px-24">
      <div className="mb-1 md:mb-6 md:p-8">
        <h1 className="text-[12px] md:text-[24px] font-bold ml-1">Reviews</h1>
        <div className="grid md:grid-cols-3">
          {review.map((rev) => (
            <div className="bg-red-100 rounded-[3px] grid grid-cols-5 p-3 m-2">
              <div>
                <img
                  className="w-[200px] rounded-full"
                  src={`${rev.profile}`}
                  alt=""
                />
              </div>
              <div className="ml-2 col-span-4">
                <h1 className="font-semibold">{rev.name}</h1>
                <div className="flex">
                  {rev.rating.map(() => (
                    <TiStarFullOutline className="text-yellow-500" />
                  ))}
                </div>
                <h1 className="text-[10px]">{rev.description}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
