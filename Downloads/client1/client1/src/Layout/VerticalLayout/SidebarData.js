import { useEffect, useState } from 'react';
import { useLogout } from '../../utils/helpers/Logout'; // Adjust the path as needed
import LystingTypeService from '../../services/MasterData/listingtype.service';
import { listing } from '../../store/slices/listing';
import { useDispatch } from 'react-redux';

const SidebarData = () => {
  const handleLogout = useLogout();
  const [listingdata, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch= useDispatch()

  // Fetch data for listing
  const getData = async () => {
    try {
      const response = await dispatch(listing()); 
      setListing(response?.payload?.user?.data || []); // Ensure it's always an array
    } catch (error) {
      console.error("Error fetching listing data:", error);
    } finally {
      setLoading(false); 
    }
  };

  // Fetch the data on component mount
  useEffect(() => {
    getData();
  }, []);

  // Define static sidebar structure (without listing data)
  const baseMenu = [
    {
      label: "Menu",
      isMainMenu: true,
    },
    {
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/admin",
      isHasArrow: true,
    },
    {
      label: "Master Data",
      icon: "mdi mdi-web",
      subItem: [
        { sublabel: "Listing Types", link: "/admin/listing-types" },
        { sublabel: "First Aid Categories", link: "/admin/first-aid-categories" },
        { sublabel: "Ambulance Amenities", link: "/admin/amenities" },
        { sublabel: "Ambulance Types", link: "/admin/ambulance-types" },
      ],
    },
    {
      label: "First Aid",
      icon: "mdi mdi-note-plus-outline",
      url: "/admin/first-aid",
      isHasArrow: true,
    },
    {
      label: "Hospitals",
      icon: "mdi mdi-hospital-building",
      url: "/admin/hospitals",
      isHasArrow: true,
    },
    {
      label: "Private Ambulance Agent",
      icon: "mdi mdi-ambulance",
      url: "/admin/private-ambulance-agent",
      isHasArrow: true,
    },
    {
      label: "Wallet",
      icon: "mdi mdi-wallet",
      url: "/admin/wallet",
      isHasArrow: true,
    },
    {
      label: "Invoices",
      icon: "mdi mdi-dialpad",
      url: "/admin/invoices",
      isHasArrow: true,
    },
    {
      label: "Booking Managers",
      icon: "mdi mdi-account",
      url: "/admin/booking-managers",
      isHasArrow: true,
    },
    {
      label: "Logout",
      icon: "mdi mdi-logout",
      isHasArrow: true,
      onClick: handleLogout,
    },
  ];

  // Insert the "Listing" section directly into baseMenu where you want
  if (loading) {
    baseMenu.splice(3, 0, {
      label: "Listing",
      icon: "mdi mdi-web",
      subItem: [{ sublabel: 'Loading...', link: '#' }],
    });
  } else {
    baseMenu.splice(3, 0, {
      label: "Listing",
      icon: "mdi mdi-format-list-bulleted",
      url: "/admin",
      subItem: listingdata.length
        ? listingdata.map((elem) => ({
            sublabel: elem?.name || 'Unnamed',
            link: `/admin/listing/${elem?._id}`,
          }))
        : [{ sublabel: 'No Listings Available', link: '#' }],
    });
  }

  return baseMenu;
};

export default SidebarData;
