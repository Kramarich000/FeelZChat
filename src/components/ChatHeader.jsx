import { Link } from "react-router-dom";
import { HiUser } from "react-icons/hi";
import { Menu, MenuItem, MenuItems, Transition, MenuButton } from "@headlessui/react";
import { Fragment } from "react";
import translate from "@utils/translate";

export default function ChatHeader() {
  return (
    <header className="container bg-gray-700-opacity mx-auto min-w-[100%] p-5 transition-all min-h-[100px]">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        <Link className="block w-10" to="/">
          <img src="/images/logo.svg" alt="Logo" />
        </Link>

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
              <MenuItems className="absolute right-0 mt-2 w-48 bg-white bg-opacity-30 backdrop-blur-md shadow-lg rounded-lg border border-gray-300 z-50">
                <div className="space-y-2 p-2">
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`block px-4 py-2 text-gray-800 rounded-lg transition-colors duration-300 ${
                          active ? "bg-gray-200" : ""
                        }`}
                      >
                        {translate("login")}
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/settings"
                        className={`block px-4 py-2 text-gray-800 rounded-lg transition-colors duration-300 ${
                          active ? "bg-gray-200" : ""
                        }`}
                      >
                        Настройки
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/logout"
                        className={`block px-4 py-2 text-gray-800 rounded-lg transition-colors duration-300 ${
                          active ? "bg-gray-200" : ""
                        }`}
                      >
                        Выйти
                      </Link>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  );
}
