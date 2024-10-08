import { useLogout } from '../../utils/helpers/Logout'; // Adjust the path as needed
import { useDispatch } from 'react-redux';

const SidebarData = () => {
  const handleLogout = useLogout();

  const dispatch= useDispatch()

  // Define static sidebar structure (without listing data)
  const baseMenu = [
    {
      label: "Menu",
      isMainMenu: true,
    },
    {
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/private-ambulance",
      isHasArrow: true,
    },
   
    {
      label: "Booking Manager",
      icon: "mdi mdi-account",
      url: "/private-ambulance/booking-manager",
      isHasArrow: true,
    },
    {
        label: " Ambulance",
        icon: "mdi mdi-ambulance",
        url: "/private-ambulance/ambulance",
        isHasArrow: true,
      },
      {
        label: "Bookings",
        icon: "mdi mdi-wallet",
        url: "/private-ambulance/bookings",
        isHasArrow: true,
      },
      {
        label: "Driver",
        icon: "mdi mdi-steering",
        url: "/private-ambulance/driver",
        isHasArrow: true,
      },
    {
      label: "Logout",
      icon: "mdi mdi-logout",
      isHasArrow: true,
      onClick: handleLogout,
    },
  ];

 

  return baseMenu;
};

export default SidebarData;
