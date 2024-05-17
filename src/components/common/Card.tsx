function Card(props: {
  _id: string,
  specialtyImage: string;
  specialtyName: string;
  specialtyDescription: string;
}) {

  const deleteSpeciality = (specId: string) => {
  console.log("🚀 ~ deleteSpeciality ~ specId:", specId)

  }

  const editSpeciality = (specId: string) => {
  console.log("🚀 ~ deleteSpeciality ~ specId:", specId)

  }
  return (
    <div>
      <div className="w-[300px] h-[350px] m-3 rounded-[10px] bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#" className="flex justify-center">
          <img
            className="rounded-t-lg w-[250px] h-[150px]"
            src={props.specialtyImage}
            alt=""
          />
        </a>
        <div className="p-5">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.specialtyName}
          </h5>
          <p className="mb-3 font-semibold text-sm text-gray-700 dark:text-gray-400">
            {props.specialtyDescription}
          </p>
        </div>
      </div>
      <div className="flex justify-between mt-4 m-1 px-6">
        <button onClick={() => deleteSpeciality(props._id)} className="font-semibold text-white bg-red-600 px-6 rounded-[3px] ">
          Delete
        </button>
        <button onClick={() => editSpeciality(props._id)} className="font-semibold text-white bg-blue-700 px-6 rounded-[3px] ">
          Edit
        </button>
      </div>
    </div>
  );
}

export default Card;
