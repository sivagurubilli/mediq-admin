import booking from "../../assets/images/dashboardIcons/booking.png";
import cancelbook from "../../assets/images/dashboardIcons/cancelbook.png";
import completebook from "../../assets/images/dashboardIcons/complbook.png";
import ongoingbook from "../../assets/images/dashboardIcons/ongoingbook.png";
import client from "../../assets/images/dashboardIcons/client.png";
import downloads from "../../assets/images/dashboardIcons/downloads.png";
import resptime from "../../assets/images/dashboardIcons/resptime.png";
import compltime from "../../assets/images/dashboardIcons/compltime.png";
import emergearn from "../../assets/images/dashboardIcons/earnings.png";
import onlinepay from "../../assets/images/dashboardIcons/onlinepay.png";
import wallet from "../../assets/images/dashboardIcons/wallet.png";

export const statistics = [
  {
    title: "Total Bookings",
    stats: "652",
    icon: booking,
    variant: "#60B664",
    color: "#3D8AC7",
  },
  {
    title: "Completed Bookings",
    stats: "552",
    icon: completebook,
    variant: " #60B664",
    color: "#3D8AC7",
  },
  {
    title: "On Going Bookings",
    stats: "72",
    icon: ongoingbook,
    variant: "#60B664",
    color: "#3D8AC7",
  },
  {
    title: "Cancelled Bookings",
    stats: "52",
    icon: cancelbook,
    variant: "#3B94EE",
    color: "#60B664",
  },
  {
    title: "Clients",
    stats: "50",
    icon: client,
    variant: "#3B94EE",
    color: "#60B664",
  },
  {
    title: "Downloads",
    stats: "1000",
    icon: downloads,
    variant: "#3B94EE",
    color: "#60B664",
  },
  {
    title: "Average time taken for response",
    stats: "10 mins",
    icon: resptime,
    variant: "#F7A93B",
    color: "#E93A76",
  },
  {
    title: "Average time taken for complete",
    stats: "10 mins",
    icon: resptime,
    variant: "#F7A93B",
    color: "#E93A76",
  },
  {
    title: "Total earnings emergency/Non-critical",
    stats: "₹ 4000000",
    icon: emergearn,
    variant: "#F7A93B",
    color: "#E93A76",
  },
  {
    title: "Total Online Payments/Offline-payments",
    stats: "₹ 4000000",
    icon: onlinepay,
    variant: "#E93A76",
    color: "#F7A93B",
  },
  {
    title: "Wallet Balance",
    stats: "₹ 2000000",
    icon: wallet,
    variant: "#E93A76",
    color: "#F7A93B",
  },
];
