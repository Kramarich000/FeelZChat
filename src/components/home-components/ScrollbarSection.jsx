import ScrollbarSlider from "@components/ScrollbarSlider";
import translate from "@utils/translate";
export default function ScrollbarSection() {
  return (
    <section className="bg-gray-900">
      <h2 className="text-3xl p-8 sm:text-4xl font-bold text-white">
        {translate("key_users_reviews")}
      </h2>
      <ScrollbarSlider />
    </section>
  );
}
