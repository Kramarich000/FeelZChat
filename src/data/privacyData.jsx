import translate from "@utils/translate";

export const dataProcessingBasis = [
  "key_data_processing_basis_1",
  "key_data_processing_basis_2",
  "key_data_processing_basis_3",
  "key_data_processing_basis_4",
];

export const personalData = [
  "key_personal_data_1",
  "key_personal_data_2",
  "key_personal_data_3",
  "key_personal_data_4",
  "key_personal_data_5",
];

export const technicalData = [
  "key_technical_data_1",
  "key_technical_data_2",
  "key_technical_data_3",
  "key_technical_data_4",
  "key_technical_data_5",
];

export const cookieUsageProperties = [
  "key_cookie_usage_purposes_1",
  "key_cookie_usage_purposes_2",
  "key_cookie_usage_purposes_3",
  "key_cookie_usage_purposes_4",
];

export const anonymousStatistics = [
  "key_anonymous_statistics_1",
  "key_anonymous_statistics_2",
  "key_anonymous_statistics_3",
];

export const dataUsage = [
  "key_data_usage_1",
  "key_data_usage_2",
  "key_data_usage_3",
  "key_data_usage_4",
  "key_data_usage_5",
  "key_data_usage_6",
];

export const dataProtection = [
  "key_data_protection_1",
  "key_data_protection_2",
  "key_data_protection_3",
  "key_data_protection_4",
  "key_data_protection_5",
  "key_data_protection_6",
  "key_data_protection_7",
  "key_data_protection_8",
  "key_data_protection_9",
];

export const dataSharing = [
  "key_data_sharing_1",
  "key_data_sharing_2",
  "key_data_sharing_3",
];

export const dataTransfer = ["key_russia_storage", "key_cross_border_transfer"];

export const dataRetention = [
  "key_standard_period",
  "key_extended_period",
  "key_post_expiration",
  "key_backup_policy",
];

export const userRights = [
  "key_user_right_1",
  "key_user_right_2",
  "key_user_right_3",
  "key_user_right_4",
  "key_user_right_5",
  "key_user_right_6",
  "key_user_right_7",
  "key_user_right_8",
];

export const externalTools = [
  {
    content: (
      <a
        className="text-primary hover:underline focus:underline"
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
      >
        {translate("key_google_analytics_policy_text")}
      </a>
    ),
  },
  {
    content: (
      <a
        className="text-primary hover:underline focus:underline"
        href="https://www.hotjar.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
      >
        {translate("key_hotjar_policy_text")}
      </a>
    ),
  },
  {
    content: (
      <a
        className="text-primary hover:underline focus:underline"
        href="https://yandex.ru/legal/confidential/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {translate("key_yandex_metrica_policy_text")}
      </a>
    ),
  },
  {
    content: (
      <a
        className="text-primary hover:underline focus:underline"
        href="https://tools.google.com/dlpage/gaoptout"
        target="_blank"
        rel="noopener noreferrer"
      >
        {translate("key_google_analytics_opt_out_text")}
      </a>
    ),
  },
  {
    content: (
      <a
        className="text-primary hover:underline focus:underline"
        href="https://www.hotjar.com/policies/do-not-track/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {translate("key_hotjar_do_not_text")}
      </a>
    ),
  },
  {
    content: (
      <a
        className="text-primary hover:underline focus:underline"
        href="https://pd.rkn.gov.ru"
        target="_blank"
        rel="noopener noreferrer"
      >
        {translate("key_roskomnadzor_tools_text")}
      </a>
    ),
  },
];
