//import HomeIcon from '@mui/icons-material/Home';

// import NextPlanIcon from '@mui/icons-material/NextPlan';
import GroupIcon from "@mui/icons-material/Group";

import LogoutIcon from "@mui/icons-material/Logout";
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
//import PeopleIcon from '@mui/icons-material/People';

//discounts
import DiscountIcon from "@mui/icons-material/Discount";
//import LocalOfferIcon from '@mui/icons-material/LocalOffer';
//import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

//categories
import CategoryIcon from "@mui/icons-material/Category";
//import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';

//advertesments
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

import DashboardIcon from "@mui/icons-material/Dashboard";

import EngineeringIcon from "@mui/icons-material/Engineering";
//products
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import StoreIcon from "@mui/icons-material/Store";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";

export const menuItems = [
  {
    text: "homePage.dashboard",
    icon: DashboardIcon,
    link: "/home",
    permission: "viewRole",
  },
  {
    text: "homePage.roles",
    icon: EngineeringIcon,
    link: "/roles",
    permission: "viewRole",
  },
  {
    text: "homePage.operators",
    icon: GroupIcon,
    link: "/operators",
    permission: "viewOperator",
  },
  {
    text: "homePage.categories",
    icon: CategoryIcon,
    link: "/categories",
    permission: "viewCategory",
  },
  {
    text: "homePage.products",
    icon: ShoppingBasketIcon,
    link: "/products",
    permission: "viewProduct",
  },
  {
    text: "homePage.advertisements",
    icon: TipsAndUpdatesIcon,
    link: "/advertisements",
    permission: "viewAd",
  },
  {
    text: "homePage.discounts",
    icon: DiscountIcon,
    link: "/discounts",
    permission: "viewDiscount",
  },
  {
    text: "homePage.delivery_areas",
    icon: StoreIcon,
    link: "/delivery-areas",
    permission: "viewDeliveryArea",
  },
  {
    text: "homePage.orders",
    icon: PlaylistAddCheckCircleIcon,
    link: "/orders",
    permission: "viewOrder",
  },
];

export const menuBottomItems = [
  // {text:"homePage.settings", icon:AdminPanelSettingsIcon , link:"/setting" },
  { text: "homePage.logout", icon: LogoutIcon, link: "/logout" },
];
