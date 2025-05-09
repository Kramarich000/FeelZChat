import { HiUser } from "react-icons/hi";
import {
  Menu,
  MenuItem,
  MenuItems,
  Transition,
  MenuButton,
} from "@headlessui/react";
import { Fragment } from "react";
import translate from "@utils/translate";
import Logo from "../animations/logoAnimation";
import BgChatGradient from "@components/BgChatGradient";
import { SafeMotion } from "@components/SafeMotion";
import PrefetchLink from "@components/PrefetchLink";

export default function ChatHeader() {
  return (
    <SafeMotion
      className="container bg-gray-700-opacity mx-auto min-w-[100%] p-5 transition-all min-h-[100px]"
      initial={{ transform: "translateY(-150px)" }}
      animate={{ transform: "translateY(0px)" }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <div className="glass-container p-4 max-w-[1200px] mx-auto flex justify-between items-center">
        <PrefetchLink className="block w-10" to="/">
          <Logo />
        </PrefetchLink>

        <div className="relative">
          <Menu as="div" className="relative">
            <MenuButton className="cursor-pointer">
              <HiUser size={32} />
            </MenuButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-300"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-200"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 mt-2 w-48 bg-white bg-opacity-30 backdrop-blur-md shadow-lg rounded-lg border border-gray-300">
                <div className="space-y-2 p-2 z-10">
                  <MenuItem>
                    {({ active }) => (
                      <PrefetchLink
                        to="/profile"
                        className={`block px-4 py-2 text-gray-800 rounded-lg transition-colors duration-300 ${
                          active ? "bg-gray-200" : ""
                        }`}
                      >
                        {translate("key_profile")}
                      </PrefetchLink>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <PrefetchLink
                        to="/settings"
                        aria-label="Go to settings"
                        className={`block px-4 py-2 text-gray-800 rounded-lg transition-colors duration-300 ${
                          active ? "bg-gray-200" : ""
                        }`}
                      >
                        {translate("key_settings")}
                      </PrefetchLink>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <PrefetchLink
                        to="/logout"
                        className={`block px-4 py-2 text-gray-800 rounded-lg transition-colors duration-300 ${
                          active ? "bg-gray-200" : ""
                        }`}
                      >
                        {translate("key_logout")}
                      </PrefetchLink>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </div>
    </SafeMotion>
  );
}
