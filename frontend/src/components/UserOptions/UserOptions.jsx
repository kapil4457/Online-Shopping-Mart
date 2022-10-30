import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import Person4Icon from "@mui/icons-material/Person4";
import { useNavigate } from "react-router";

const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const actions = [
    {
      name: "Cart",
      link: "/cart",
      icon: <ShoppingCartIcon />,
    },
    {
      name: "Orders",
      link: "/my-orders",
      icon: <LineStyleIcon />,
    },
    {
      name: "Profile",
      link: "/account",
      icon: <Person4Icon />,
    },
  ];

  const adminAction = [
    {
      name: "DashBoard",
      link: "/dashboard",
      icon: <DashboardIcon />,
    },
  ];
  return (
    <div>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              navigate(`${action.link}`);
            }}
          />
        ))}
        {user.role == "admin" ? (
          adminAction.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                navigate(`${action.link}`);
              }}
            />
          ))
        ) : (
          <div></div>
        )}
      </SpeedDial>
    </div>
  );
};

export default UserOptions;
