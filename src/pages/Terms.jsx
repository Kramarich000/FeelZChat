import Header from "@components/Header";
import Footer from "@components/Footer";
import translate from "../utils/translate";
import { SafeMotion } from "@components/SafeMotion";

import {
  termsHeader,
  subHeader,
  termsDefinitions,
  termsAcceptance,
  termsRegistration,
  termsUserRights,
  termsUserObligations,
  termsServiceUsage,
  termsLimitations,
  termsLimitationsEnforcement,
  termsIP,
  termsPaidServices,
  termsLiability,
  termsForceMajeure,
  termsModifications,
  termsAccountTermination,
  termsJurisdiction,
  termsContactInfo,
} from "@data/termsData";

export default function Terms() {
  const Section = ({ titleKey, children }) => (
    <div className="space-y-4">
      <h2 className="text-[20px] sm:text-2xl font-medium">
        {translate(titleKey)}
      </h2>
      {children}
    </div>
  );

  const List = ({ items, className = "" }) => (
    <ul
      className={`flex flex-col items-start max-w-[900px] mx-auto break-words list-disc list-inside space-y-1 ${className}`}
    >
      {items.map((item, i) => (
        <li key={i}>{translate(item)}</li>
      ))}
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
        className="terms-section bg-white pb-2 sm:pb-4 rounded-2xl sm:mb-4 m-4 max-w-[1080px] p-4 border-b-20 border-primary"
        initial={{ opacity: 0, transform: "translateY(100px)" }}
        animate={{ opacity: 1, transform: "translateY(0)" }}
        transition={{ duration: 0.5 }}
      >
        <div className="container p-4 sm:p-10 rounded-2xl">
          <h1 className="text-3xl mt-4 sm:text-4xl font-bold mb-2 border-b-1 pb-2 sm:pb-4 border-primary sm:mb-4">
            {translate(termsHeader)}
          </h1>
          <h3 className="text-lg mt-4 mb-2 pb-2 sm:pb-4sm:mb-4">
            {translate(subHeader)}
          </h3>

          <div className="text-sm sm:text-lg text-left space-y-6 sm:space-y-8">
            <Section titleKey="key_terms_definitions">
              <List items={termsDefinitions} />
            </Section>

            <Section titleKey="key_terms_acceptance">
              <List items={termsAcceptance} />
            </Section>

            <Section titleKey="key_terms_registration">
              <List items={termsRegistration} />
            </Section>

            <Section titleKey="key_terms_user_responsibilities">
              <h3 className="font-medium mt-2">
                {translate("key_terms_user_rights_title")}
              </h3>
              <List items={termsUserRights} />
              <h3 className="font-medium mt-2">
                {translate("key_terms_user_obligations_title")}
              </h3>
              <List items={termsUserObligations} />
            </Section>

            <Section titleKey="key_terms_service_usage">
              <List items={termsServiceUsage} />
            </Section>

            <Section titleKey="key_terms_limitations">
              <List items={termsLimitations} />
              <List
                items={termsLimitationsEnforcement}
                className="mt-2 list-none"
              />
            </Section>

            <Section titleKey="key_terms_ip">
              <List items={termsIP} />
            </Section>

            <Section titleKey="key_terms_paid_services">
              <List items={termsPaidServices} />
            </Section>

            <Section titleKey="key_terms_liability">
              <List items={termsLiability} />
            </Section>

            <Section titleKey="key_terms_force_majeure">
              <List items={termsForceMajeure} />
            </Section>

            <Section titleKey="key_terms_modifications">
              <List items={termsModifications} />
            </Section>

            <Section titleKey="key_terms_account_termination">
              <List items={termsAccountTermination} />
            </Section>

            <Section titleKey="key_terms_jurisdiction">
              <List items={termsJurisdiction} />
            </Section>

            <Section titleKey="key_terms_contact_info">
              <List items={termsContactInfo} />
            </Section>
          </div>
        </div>
      </SafeMotion>

      <Footer />
    </div>
  );
}
