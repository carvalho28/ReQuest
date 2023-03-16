interface CardProps {
  sizeClass: string;
}

const Card = ({ sizeClass }: CardProps) => {
  return (
    <div
      className={`block max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-lg ${sizeClass}`}
    >
      <h4 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
        Title
      </h4>
      <p className="font-normal text-gray-700 text-justify">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
    </div>
  );
};

export default Card;
