import React from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import { English } from "flatpickr/dist/l10n/default.js";
import { subYears } from "date-fns";
import i18n from "../i18n"; 
import { CalendarIcon } from "@radix-ui/react-icons";
import { useRef } from "react";

const monthNamesGenitiveRu = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря"
];

const monthNamesGenitiveEn = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function CustomCalendar({ date, setDate }) {
  const maxBirthDate = subYears(new Date(), 16);

  const currentLang = i18n.language.startsWith("ru") ? "ru" : "en";

  const formatDateWithMonthGenitive = (d) => {
    const day = d.getDate();
    const month =
      currentLang === "ru"
        ? monthNamesGenitiveRu[d.getMonth()]
        : monthNamesGenitiveEn[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const flatpickrLocale = currentLang === "ru" ? Russian : English;

  const flatpickrRef = useRef(null);

  const handleIconClick = () => {
    if (flatpickrRef.current) {
      flatpickrRef.current.flatpickr.open();  
    }
  };

  return (
    <div className="relative w-full">
    <Flatpickr
      ref={flatpickrRef}
      value={date}
      onChange={(selectedDates) => {
        const selectedDate = selectedDates[0];
        setDate(selectedDate);
      }}
      options={{
        dateFormat: "d.m.Y",
        altInput: true,
        disableMobile: true,
        yearRange: [1900, new Date().getFullYear() - 16],
        locale: flatpickrLocale,
        maxDate: maxBirthDate,
        minDate: "01.01.1900",
        onValueUpdate: (selectedDates, _, instance) => {
          const selectedDate = selectedDates[0];
          if (selectedDate && instance?.altInput) {
            instance.altInput.value = formatDateWithMonthGenitive(selectedDate);
            instance.altInput.setAttribute('autocomplete', 'bday');
          }
        },
      }}
      
      placeholder={currentLang === "ru" ? "Дата рождения" : "Date of Birth"}
      className="border-2 rounded-xl p-2.5 w-full"
      required
    />
      <CalendarIcon onClick={handleIconClick} className="absolute right-2 top-3.5 cursor-pointer" size={20} />
      </div>
  );
}