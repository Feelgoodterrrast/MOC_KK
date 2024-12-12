import { IconType } from "react-icons";
import {
    HiChartPie,
    HiTable,
    HiShoppingCart,
    HiSpeakerphone,
    HiArchive,
    HiPresentationChartBar,
    HiPresentationChartLine,
    HiDesktopComputer,
    HiFlag,
  } from "react-icons/hi";

type Links = {
  page: string;
  link: string;
  icon: IconType;
  label: string;
};

export const SidebarLinks: Links[] = [
  {
    page: "แดชบอร์ด",
    link: "/dashboard",
    icon: HiChartPie,
    label: "",
  },
  {
    page: "สินค้า",
    link: "/dashboard/product",
    icon: HiShoppingCart,
    label: "",
  },
  {
    page: "ข่าวสาร",
    link: "/dashboard/post",
    icon: HiSpeakerphone,
    label: "",
  },
  {
    page: "งานทะเบียนธุรกิจ",
    link: "#",
    icon: HiTable,
    label: "",
  },
  {
    page: "ทรัพย์สินทางปัญญา",
    link: "#",
    icon: HiArchive,
    label: "",
  },
  {
    page: "การค้าระหว่างประเทศ",
    link: "#",
    icon: HiPresentationChartBar,
    label: "",
  },
  {
    page: "การค้าภายในประเทศ",
    link: "#",
    icon: HiPresentationChartLine,
    label: "",
  },
  {
    page: "บริการสารสนเทศ",
    link: "#",
    icon: HiDesktopComputer,
    label: "",
  },
  {
    page: "งานธงฟ้า",
    link: "#",
    icon: HiFlag,
    label: "",
  },
];
