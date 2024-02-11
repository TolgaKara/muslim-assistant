"use client";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import WashIcon from "@mui/icons-material/Wash";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Toolbar from "@mui/material/Toolbar";

import { useState } from "react";
import React from "react";
import { SwipeableDrawer } from "@mui/material";
import MosqueIcon from "@mui/icons-material/Mosque";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpen(open);
    };

  const menuList = [
    { name: "Prayer Time", icon: <AccessTimeIcon />, href: "/prayers" },
    { name: "Purification", icon: <WashIcon />, href: "/purification" },
    { name: "Library", icon: <LocalLibraryIcon />, href: "/library" },
    { name: "Zakat", icon: <CardGiftcardIcon />, href: "/zakat" },
    { name: "Mosques", icon: <MosqueIcon />, href: "/mosques" },
    { name: "Dua creator", icon: <QuestionAnswerIcon />, href: "/dua" },
    { name: "Settings", icon: <InboxIcon />, href: "/settings" },
  ];
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuList.map(({ name, icon, href }) => (
          <>
            {name === "Settings" && <Divider />}
            <ListItem key={name} disablePadding>
              <ListItemButton component="a" href={href}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          </>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {
        <>
          <h1
            className="text-center text-xl md:text-6xl pt-3"
            onClick={toggleDrawer(true)}
          >
            Muslim assistant
          </h1>

          <SwipeableDrawer
            anchor="left"
            open={isOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {drawer}
          </SwipeableDrawer>
        </>
      }
    </div>
  );
}
