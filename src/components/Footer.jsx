import translate from "@utils/translate";
import PrefetchLink from "@components/PrefetchLink";
import { SafeMotion } from "@components/SafeMotion";
import {
  faFacebookF,
  faXTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const iconMap = {
  Facebook: faFacebookF,
  "X (Twitter)": faXTwitter,
  Instagram: faInstagram,
  YouTube: faYoutube,
};

export default function Footer() {
  const socialLinks = [
    {
      label: "Facebook",
      href: "#",
      id: 1,
      initial: { transform: "translateX(-50px)" },
    },
    {
      label: "X (Twitter)",
      href: "#",
      id: 2,
      initial: { transform: "translateX(-50px)" },
    },
    {
      label: "Instagram",
      href: "#",
      id: 3,
      initial: { transform: "translateX(50px)" },
    },
    {
      label: "YouTube",
      href: "#",
      id: 4,
      initial: { transform: "translateX(50px)" },
    },
  ];
  return (
    <footer className="w-full text-[24px] bg-gray-900 text-white py-6">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 pt-6">
          {socialLinks.map((item) => (
            <SafeMotion
              as="a"
              className="hover:text-primary transition-all cursor-pointer"
              key={item.id}
              href={item.href}
              aria-label={item.label}
              transition={{ type: "tween", stiffness: 300 }}
              initial={item.initial}
              whileInView={{ transform: "translateX(0)" }}
              viewport={{ once: true }}
            >
              <FontAwesomeIcon icon={iconMap[item.label]} aria-hidden="true" />
            </SafeMotion>
          ))}
        </div>

        <div className="mt-2">
          <div transition={{ type: "spring", stiffness: 300 }}>
            <PrefetchLink
              to="/privacy"
              onClick={(e) => {
                e.preventDefault();
                window.open("/privacy", "_blank", "noopener,noreferrer");
              }}
              target="_blank"
              className="text-[16px] sm:text-[20px] underline hover:text-primary transition-all"
            >
              {translate("key_privacy")}
            </PrefetchLink>
          </div>
        </div>
      </div>
      <p className="text-[14px] mt-4">
        {translate("key_copyright_2025_feelzchat")}
      </p>
    </footer>
  );
}
