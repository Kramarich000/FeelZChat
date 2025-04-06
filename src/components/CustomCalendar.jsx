import React from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import { subYears } from "date-fns";

const monthNamesGenitive = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря"
];

export default function CustomCalendar({ date, setDate }) {
  const maxBirthDate = subYears(new Date(), 16);

  const formatDateWithMonthGenitive = (d) => {
    const day = d.getDate();
    const month = monthNamesGenitive[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <Flatpickr
      value={date}
      onChange={(selectedDates) => {
        const selectedDate = selectedDates[0];
        setDate(selectedDate);
      }}
      options={{
        dateFormat: "d.m.Y",
        altInput: true,
        locale: Russian,
        maxDate: maxBirthDate,
        minDate: "01.01.1900",
        onValueUpdate: (selectedDates, _, instance) => {
          const selectedDate = selectedDates[0];
          if (selectedDate && instance?.altInput) {
            instance.altInput.value = formatDateWithMonthGenitive(selectedDate);
          }
        },
      }}
      placeholder="Дата рождения"
      className="border-2 rounded-xl p-2.5 w-full"
      required
    />
  );
}
