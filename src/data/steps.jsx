import PrefetchLink from "@components/PrefetchLink";
import { FaUserPlus } from "react-icons/fa";
import { TbMessageCirclePlus } from "react-icons/tb";
import { IoIosSend } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { MdKey, MdDevices } from "react-icons/md";

export const steps = [
  {
    id: 1,
    title: (
      <>
        <MdKey size={30} color="#0e7490" /> Шаг 1: Зарегистрируйтесь
      </>
    ),
    content: (
      <>
        <PrefetchLink
          className="transition-all rounded-lg text-primary hover:underline"
          to="/register"
        >
          Создайте
        </PrefetchLink>{" "}
        аккаунт или{" "}
        <PrefetchLink
          className="transition-all rounded-lg text-primary hover:underline"
          to="/login"
        >
          войдите
        </PrefetchLink>
        , чтобы начать общаться
      </>
    ),
  },
  {
    id: 2,
    title: (
      <>
        <FaUserPlus size={30} color="#0e7490" />
        Шаг 2: Добавьте друзей
      </>
    ),
    content: "Найдите своих друзей по никнейму или email.",
  },
  {
    id: 3,
    title: (
      <>
        <TbMessageCirclePlus size={30} color="#0e7490" />
        Шаг 3: Создайте чат
      </>
    ),
    content: "Начните новый чат с одним человеком или создайте групповой.",
  },
  {
    id: 4,
    title: (
      <>
        <IoIosSend size={30} color="#0e7490" />
        Шаг 4: Отправьте сообщение
      </>
    ),
    content:
      "Просто напишите текст и отправьте — сообщения доставляются мгновенно.",
  },
  {
    id: 5,
    title: (
      <>
        <IoMdSettings size={30} color="#0e7490" />
        Шаг 5: Настройте профиль
      </>
    ),
    content: "Измените аватар, статус и личные данные.",
  },
  {
    id: 6,
    title: (
      <>
        <MdDevices size={30} color="#0e7490" /> Шаг 6: Используйте с любого
        устройства
      </>
    ),
    content:
      "Общайтесь с любого устройства — мобильного, планшета или компьютера.",
  },
];
