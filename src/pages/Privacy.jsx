import Header from "@components/Header";
import Footer from "@components/Footer";
import translate from "../utils/translate";
import { SafeMotion } from "@components/SafeMotion";
export default function Privacy() {
  const Section = ({ titleKey, children }) => (
    <div className="space-y-4">
      <h2 className="text-[20px] sm:text-2xl font-medium">
        {translate(titleKey)}
      </h2>
      {children}
    </div>
  );

  const Subsection = ({ titleKey }) => (
    <h3 className="font-medium mt-2">{translate(titleKey)}</h3>
  );

  const List = ({ items, className = "" }) => (
    <ul
      className={`flex flex-col items-start max-w-[900px] mx-auto break-words list-disc list-inside space-y-1 ${className}`}
    >
      {items.map((item, index) => {
        const isCustomElement =
          typeof item === "object" && item !== null && !Array.isArray(item);
        return (
          <li
            key={index}
            className={isCustomElement ? item.className || "" : ""}
          >
            {isCustomElement ? item.content : translate(item)}
          </li>
        );
      })}
    </ul>
  );

  const Paragraph = ({ textKey, className = "" }) => (
    <p className={className}>{translate(textKey)}</p>
  );

  const DATA_PROCESSING_BASIS = [
    "key_data_processing_basis_1",
    "key_data_processing_basis_2",
    "key_data_processing_basis_3",
    "key_data_processing_basis_4",
  ];

  const PERSONAL_DATA = [
    "key_personal_data_1",
    "key_personal_data_2",
    "key_personal_data_3",
    "key_personal_data_4",
    "key_personal_data_5",
  ];

  const TECHNICAL_DATA = [
    "key_technical_data_1",
    "key_technical_data_2",
    "key_technical_data_3",
    "key_technical_data_4",
    "key_technical_data_5",
  ];

  const COOKIE_USAGE_PURPOSES = [
    "key_cookie_usage_purposes_1",
    "key_cookie_usage_purposes_2",
    "key_cookie_usage_purposes_3",
    "key_cookie_usage_purposes_4",
  ];

  const ANONYMOUS_STATISTICS = [
    "key_anonymous_statistics_1",
    "key_anonymous_statistics_2",
    "key_anonymous_statistics_3",
  ];

  const DATA_USAGE = [
    "key_data_usage_1",
    "key_data_usage_2",
    "key_data_usage_3",
    "key_data_usage_4",
    "key_data_usage_5",
    "key_data_usage_6",
  ];

  const DATA_PROTECTION = [
    "key_data_protection_1",
    "key_data_protection_2",
    "key_data_protection_3",
    "key_data_protection_4",
    "key_data_protection_5",
    "key_data_protection_6",
  ];

  const DATA_SHARING = [
    "key_data_sharing_1",
    "key_data_sharing_2",
    "key_data_sharing_3",
  ];

  const DATA_TRANSFER = [
    "key_russia_storage",
    "key_cross_border_transfer",
    {
      content: (
        <span className="text-gray-600 text-sm">
          {translate("key_cross_border_transfer_details")}
        </span>
      ),
    },
  ];

  const DATA_RETENTION = [
    "key_standard_period",
    "key_extended_period",
    "key_post_expiration",
    {
      content: (
        <span className="text-gray-600 text-sm">
          {translate("key_data_destruction")}
        </span>
      ),
    },
  ];

  const USER_RIGHTS = [
    "key_user_right_1",
    "key_user_right_2",
    "key_user_right_3",
    "key_user_right_4",
    "key_user_right_5",
    "key_user_right_6",
    "key_user_right_7",
    "key_user_right_8",
    {
      content: translate("key_user_right_8_details"),
      className: "text-gray-600 text-sm",
    },
    {
      content: translate("key_complaint_procedure"),
      className: "text-gray-600 text-sm",
    },
  ];

  const EXTERNAL_TOOLS = [
    {
      content: (
        <a
          className="text-primary hover:underline"
          href={translate("key_google_analytics")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Analytics Privacy Policy
        </a>
      ),
    },
    {
      content: (
        <a
          className="text-primary hover:underline"
          href={translate("key_hotjar")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Hotjar Privacy Policy
        </a>
      ),
    },
    {
      content: (
        <a
          className="text-primary hover:underline"
          href={translate("key_yandex_metrica")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Yandex.Metrica Privacy Notice
        </a>
      ),
    },
    {
      content: (
        <>
          {translate("key_google_analytics_opt_out_text")}
          <a
            className="text-primary hover:underline"
            href={translate("key_google_analytics_opt_out_link")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {translate("key_google_analytics_opt_out_link")}
          </a>
        </>
      ),
    },
    {
      content: (
        <>
          {translate("key_hotjar_do_not_text")}
          <a
            className="text-primary hover:underline"
            href={translate("key_hotjar_do_not_link")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {translate("key_hotjar_do_not_link")}
          </a>
        </>
      ),
    },
    {
      content: (
        <>
          {translate("key_roskomnadzor_tools_text")}
          <a
            className="text-primary hover:underline"
            href={translate("key_roskomnadzor_tools_link")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {translate("key_roskomnadzor_tools_link")}
          </a>
        </>
      ),
    },
    {
      content: (
        <p className="text-gray-600 mt-2 text-sm">
          {translate("key_third_party_warning")}
        </p>
      ),
    },
  ];

  return (
    <div className="wrapper min-h-full w-full bg-blue-200 flex flex-col justify-center items-center">
      <Header />
      <SafeMotion
        as="section"
        className="privacy-section bg-white pb-2 sm:pb-4 rounded-2xl sm:mb-4 m-4 max-w-[1080px] p-4 border-b-20 border-primary"
        layout
        initial={{ opacity: 0, transform: "translateY(-50px)" }}
        animate={{ opacity: 1, transform: "translateY(0)" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container p-4 sm:p-10 rounded-2xl">
          <h1 className="text-3xl mt-4 sm:text-4xl font-bold mb-2 border-b-1 pb-2 sm:pb-4 border-primary sm:mb-4">
            {translate("key_privacy")}
          </h1>

          <div className="text-sm sm:text-lg text-left space-y-6 sm:space-y-8">
            <Paragraph textKey="key_operator_details" />
            <Paragraph textKey="key_privacy_intro" />

            <Section titleKey="key_section_consent">
              <Paragraph textKey="key_consent" />
            </Section>

            <Section titleKey="key_section_data_processing_basis">
              <List items={DATA_PROCESSING_BASIS} />
            </Section>

            <Section titleKey="key_section_personal_technical_data">
              <Subsection titleKey="key_section_personal_data" />
              <List items={PERSONAL_DATA} />
              <Paragraph textKey="key_password_storage" />
              <Subsection titleKey="key_section_technical_data" />
              <List items={TECHNICAL_DATA} />
            </Section>

            <Section titleKey="key_section_cookie_usage">
              <Paragraph textKey="key_cookie_consent_notice" />
              <Subsection titleKey="key_section_cookie_purposes" />
              <List items={COOKIE_USAGE_PURPOSES} />
            </Section>

            <Section titleKey="key_section_analytics">
              <List items={ANONYMOUS_STATISTICS} />
            </Section>

            <Section titleKey="key_section_data_usage">
              <List items={DATA_USAGE} />
            </Section>

            <Section titleKey="key_section_data_protection">
              <List items={DATA_PROTECTION} />
            </Section>

            <Section titleKey="key_section_data_sharing">
              <List items={DATA_SHARING} />
              <Subsection titleKey="key_section_data_transfer" />
              <List items={DATA_TRANSFER} />
            </Section>

            <Section titleKey="key_section_data_retention">
              <List items={DATA_RETENTION} />
            </Section>

            <Section titleKey="key_section_user_rights">
              <List items={USER_RIGHTS} />
            </Section>

            <Section titleKey="key_section_external_tools">
              <List items={EXTERNAL_TOOLS} />
            </Section>

            <Section titleKey="key_section_policy_changes">
              <Paragraph textKey="key_policy_changes" />
              <Paragraph
                textKey="key_document_accessibility"
                className="text-gray-600 mt-2 text-sm"
              />
              <Paragraph
                textKey="key_policy_version"
                className="text-gray-600 mt-2 text-sm"
              />
            </Section>

            <Section titleKey="key_policy_definitions">
              <Paragraph
                textKey="key_definitions"
                className="text-sm sm:text-base"
              />
            </Section>
          </div>
        </div>
      </SafeMotion>
      <Footer />
    </div>
  );
}
