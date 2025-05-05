import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Header from "@components/Header";
import Footer from "@components/Footer";
import translate from "@utils/translate";
import { motion } from "framer-motion";
import { SafeMotion } from "@components/SafeMotion";
const faqData = [
  {
    question: translate("key_how_sign_in"),
    answer: translate("key_homepage_register_hint"),
  },
  {
    question: translate("key_forgot_password_hint"),
    answer: translate("key_forgot_password_process"),
  },
  {
    question: translate("key_change_phone_hint"),
    answer: translate("key_change_phone_instruction"),
  },
  {
    question: translate("key_account_delete_hint"),
    answer: translate("key_account_delete_instruction"),
  },
  {
    question: translate("key_messages_not_sending"),
    answer: translate("key_check_connection"),
  },
];

const handleSubmit = (e) => {
  e.preventDefault();
};

export default function Help() {
  const [openIndices, setOpenIndices] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleIndex = (index) => {
    setOpenIndices((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <div className="wrapper w-full bg-blue-200 justify-center items-center transition-all">
      <Header />
      <SafeMotion
        className="mx-auto space-y-4 px-4 py-5 sm:space-y-8 sm:p-4 sm:py-10"
        layout
        initial={{ opacity: 0, transform: "translateY(-50px)" }}
        animate={{ opacity: 1, transform: "translateY(0)" }}
        exit={{ opacity: 0, transform: "translateY(-50px)" }}
      >
        <h1 className="text-2xl mb-4 sm:text-4xl font-bold sm:mb-6">
          {translate("key_faq")}
        </h1>
        <div className="flex flex-col gap-4">
          {faqData.map((item, index) => {
            const isOpen = openIndices.includes(index);

            return (
              <div
                key={index}
                className="border-b-10 py-4 min-h-auto bg-primary p-2 text-white rounded-3xl"
              >
                <p
                  className="w-full cursor-pointer text-left font-medium"
                  onClick={() => toggleIndex(index)}
                >
                  {item.question}
                </p>

                <motion.div
                  className="overflow-hidden"
                  initial={false}
                  animate={{
                    maxHeight: isOpen ? 200 : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p className="text-left mt-2 py-1">{item.answer}</p>
                </motion.div>
              </div>
            );
          })}
        </div>

        <>
          <h2 className="text-2xl sm:text-3xl mb-5">
            {translate("key_contact_us")}
          </h2>
          <div className="bg-white text-black  border-b-8 rounded-2xl border-primary p-4">
            <form
              className="gap-5 flex flex-col sm:grid sm:grid-cols-3 mb-4 text-sm"
              onSubmit={handleSubmit}
            >
              <label>
                <input
                  id="name"
                  className="input-styles"
                  type="text"
                  placeholder={translate("key_your_name")}
                />
              </label>
              <label>
                <input
                  id="email"
                  className="input-styles"
                  type="email"
                  placeholder={translate("key_your_email")}
                />
              </label>

              <label>
                <Select.Root
                  id="question-type"
                  value={selectedOption}
                  onValueChange={setSelectedOption}
                >
                  <Select.Trigger className="trigger select-styles input-styles p-2.5">
                    <Select.Value
                      className="text-gray-100"
                      placeholder={translate("key_question_type")}
                    />
                    <ChevronDownIcon className="w-5 h-5" />
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-white border rounded shadow-lg">
                      <Select.Viewport>
                        {["Technical", "Account", "Bug", "Other"].map(
                          (type) => (
                            <Select.Item
                              key={type}
                              value={type}
                              className="p-2.5 cursor-pointer hover:bg-primary hover:text-white"
                            >
                              <Select.ItemText>
                                {translate(
                                  `key_${type.toLowerCase()}_question`,
                                )}
                              </Select.ItemText>
                              <Select.ItemIndicator />
                            </Select.Item>
                          ),
                        )}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </label>

              <textarea
                className="input-styles scrollbar-hide min-h-40 sm:min-h-80 col-span-2 sm:col-span-3 border-1 rounded-2xl p-2 w-full"
                placeholder={translate("key_your_question")}
              />

              <button
                type="submit"
                className="mx-auto w-[200px] sm:w-[300px] col-span-3 bg-primary text-white rounded-2xl py-2"
              >
                {translate("key_send")}
              </button>
            </form>
          </div>
        </>
        <div className="bg-white border-primary border-b-8 p-6 rounded-lg shadow-md max-w-lg mx-auto">
          <h2 className="text-3xl font-medium text-primary mb-4">
            {translate("key_our_contacts")}
          </h2>
          <div className="space-y-2">
            <p className="text-lg text-gray-700">
              <strong className="font-medium">
                {translate("key_phone_colon")}{" "}
              </strong>
              <a
                className="text-primary hover:underline transition-all"
                aria-label="phone-number"
                type="tel"
                href="tel:1234567890"
              >
                {translate("key_contact_phone")}
              </a>
            </p>
            <p className="text-lg text-gray-700">
              <strong className="font-medium">
                {translate("key_address_colon")}{" "}
              </strong>{" "}
              {translate("key_contact_address")}
            </p>
            <p className="text-lg text-gray-700">
              <strong className="font-medium">
                {translate("key_working_hours_colon")}{" "}
              </strong>
              {translate("key_working_hours")}
            </p>
          </div>
        </div>
      </SafeMotion>
      <Footer />
    </div>
  );
}
