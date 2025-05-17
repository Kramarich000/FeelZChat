import Header from "@components/Header";
import Footer from "@components/Footer";
import translate from "../utils/translate";
import { SafeMotion } from "@components/SafeMotion";
import { dataProcessingBasis } from "@data/privacyData";
import { personalData } from "@data/privacyData";
import { technicalData } from "@data/privacyData";
import { cookieUsageProperties } from "@data/privacyData";
import { anonymousStatistics } from "@data/privacyData";
import { dataUsage } from "@data/privacyData";
import { dataProtection } from "@data/privacyData";
import { dataSharing } from "@data/privacyData";
import { dataTransfer } from "@data/privacyData";
import { dataRetention } from "@data/privacyData";
import { userRights } from "@data/privacyData";
import { externalTools } from "@data/privacyData";

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

  return (
    <div className="wrapper min-h-full w-full bg-blue-200 flex flex-col justify-center items-center">
      <Header />
      <SafeMotion
        as="section"
        className="privacy-section bg-white pb-2 sm:pb-4 rounded-2xl sm:mb-4 m-4 max-w-[1080px] p-4 border-b-20 border-primary"
        initial={{ opacity: 0, transform: "translateY(100px)" }}
        animate={{ opacity: 1, transform: "translateY(0)" }}
        transition={{ duration: 0.5 }}
      >
        <div className="container p-4 sm:p-10 rounded-2xl">
          <h1 className="text-3xl mt-4 sm:text-4xl font-bold mb-2 border-b-1 pb-2 sm:pb-4 border-primary sm:mb-4">
            {translate("key_privacy")}
          </h1>

          <div className="text-sm sm:text-lg text-left space-y-6 sm:space-y-8">
            <Paragraph textKey="key_operator_details" />
            <Paragraph textKey="key_privacy_intro" />

            <Section titleKey="key_policy_definitions">
              <Paragraph
                textKey="key_definitions"
                className="text-sm sm:text-base"
              />
              <Paragraph textKey="key_dpo_contact" className="text-gray-700" />
            </Section>

            <Section titleKey="key_section_consent">
              <Paragraph textKey="key_consent" />
            </Section>

            <Section titleKey="key_section_data_processing_basis">
              <List items={dataProcessingBasis} />
            </Section>

            <Section titleKey="key_section_personal_technical_data">
              <Subsection titleKey="key_section_personal_data" />
              <List items={personalData} />
              <Paragraph
                className="text-gray-600 mt-2 text-sm"
                textKey="key_password_storage"
              />
              <Subsection titleKey="key_section_technical_data" />
              <List items={technicalData} />
              <Paragraph
                className="text-gray-600 mt-2 text-sm"
                textKey="key_message_logging"
              />
            </Section>

            <Section titleKey="key_section_cookie_usage">
              <Paragraph textKey="key_cookie_consent_notice" />
              <Subsection titleKey="key_section_cookie_purposes" />
              <List items={cookieUsageProperties} />
            </Section>

            <Section titleKey="key_section_analytics">
              <List items={anonymousStatistics} />
              <Paragraph
                textKey="key_profiling_info"
                className="text-gray-600 text-sm"
              />
            </Section>

            <Section titleKey="key_section_data_usage">
              <List items={dataUsage} />
            </Section>

            <Section titleKey="key_section_data_protection">
              <List items={dataProtection} />
              <Paragraph
                textKey="key_security_contact"
                className="text-gray-600 text-sm"
              />
            </Section>

            <Section titleKey="key_section_data_sharing">
              <List items={dataSharing} />
              <Paragraph
                textKey="key_data_processors"
                className="text-gray-600 text-sm"
              />
              <Section titleKey="key_section_data_transfer" />
              <List items={dataTransfer} />
              <Paragraph
                textKey="key_cross_border_transfer_details"
                className="text-gray-600 list-none text-sm"
              />
            </Section>

            <Section titleKey="key_section_data_retention">
              <List items={dataRetention} />
              <Paragraph
                textKey="key_account_deletion"
                className="text-gray-600 text-sm"
              />
              <Paragraph
                textKey="key_data_destruction"
                className="text-gray-600 text-sm"
              />
            </Section>

            <Section titleKey="key_section_user_rights">
              <List items={userRights} />

              <Paragraph
                textKey="key_user_right_8_details"
                className="text-gray-600 mt-2 text-sm"
              />

              <p className="text-gray-600 text-sm">
                {translate("key_complaint_procedure")}{" "}
                <a
                  className="text-primary mr-1 text-[14px] hover:underline focus:underline"
                  href="https://pd.rkn.gov.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translate("key_rkn_text")}
                </a>
                |
                <a
                  className="text-primary text-[14px] ml-1 hover:underline focus:underline"
                  href="https://edpb.europa.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translate("key_eu_dpa_text")}
                </a>
              </p>
            </Section>

            <Section titleKey="key_section_external_tools">
              <Paragraph textKey="key_third_party_services_intro" />
              <List items={externalTools} />
              <p className="text-gray-600 mt-2 text-sm">
                {translate("key_third_party_disclaimer")}
              </p>
              <p className="text-gray-600 mt-2 text-sm flex flex-col">
                {translate("key_third_party_instructions")}
                <div className="flex gap-1 text-center">
                  <a
                    href="https://support.google.com/chrome/answer/95464"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline focus:underline w-15"
                  >
                    {translate("key_chrome_dnt_link_text")}
                  </a>
                  |
                  <a
                    href="https://support.mozilla.org/kb/do-not-track-prevent-websites-tracking-you"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline focus:underline w-15"
                  >
                    {translate("key_firefox_dnt_link_text")}
                  </a>
                  |
                  <a
                    href="https://support.apple.com/guide/safari/allow-websites-to-track-you-sfri11476/16.0/mac/11.0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline focus:underline w-15"
                  >
                    {translate("key_safari_dnt_link_text")}
                  </a>
                </div>
              </p>
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
          </div>
        </div>
      </SafeMotion>
      <Footer />
    </div>
  );
}
