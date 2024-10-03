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
      url: "/hospitals",
      isHasArrow: true,
    },
   

    {
        label: "Profile",
        icon: "mdi mdi-account",
        url: "/hospitals/profile",
        isHasArrow: true,
      },
      {
        label: "Branches",
        icon: "mdi mdi-tree",
        url: "/hospitals/branches",
        isHasArrow: true,
      },
      {
        label: "Booking Managers",
        icon: "mdi mdi-account",
        url: "/hospitals/booking-manager",
        isHasArrow: true,
      },
      {
        label: "Wallet",
        icon: "mdi mdi-wallet",
        url: "/hospitals/wallet",
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
