import translate from "@utils/translate";

export default function ReviewCard({ avatar, name, joined, rating, comment }) {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-gray-600"}
        >
          ★
        </span>,
      );
    }
    return stars;
  };

  return (
    <div className="bg-gray-800 border-2 border-primary h-[300px] shadow-md p-4 text-white">
      <img
        src={avatar}
        alt={name}
        className="rounded-full mx-auto mb-3 object-cover"
      />
      <div className="text-center">
        <h4 className="font-semibold text-lg">{name}</h4>
        <p className="text-sm text-gray-400 mb-2">
          {translate("key_reviewer_date_registration")} {joined}
        </p>
        <div className="flex justify-center mb-2">{renderStars()}</div>
        <p className="text-gray-300 text-[12px] xs:text-sm">{comment}</p>
      </div>
    </div>
  );
}
