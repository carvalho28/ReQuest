interface CardProps {
  sizeClass: string;
}

/**
 * Card component is the component used to render a card
 * @param sizeClass - The size class of the card
 * @returns Returns the Card component
 */
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
