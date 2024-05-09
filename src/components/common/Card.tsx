function Card(props:{specialtyImage: string, specialtyName:string, specialtyDescription: string}) {
  return (
    <div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#" className="flex justify-center">
          <img className="rounded-t-lg" src={props.specialtyImage} alt="" />
        </a>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.specialtyName}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
           {props.specialtyDescription}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
