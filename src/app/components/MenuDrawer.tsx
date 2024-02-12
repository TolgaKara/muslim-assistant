"use client";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import WashIcon from "@mui/icons-material/Wash";
import MosqueIcon from "@mui/icons-material/Mosque";
import { SvgIconTypeMap } from "@mui/material";
import { ReactElement } from "react";

import Toolbar from "@mui/material/Toolbar";

import { Fragment, useState } from "react";
import React from "react";
import { SwipeableDrawer } from "@mui/material";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

type PageDescription = {
  name: string;
  icon: ReactElement<SvgIconTypeMap, any>;
  href: string;
  description: string;
};

export const pageDescriptionList: PageDescription[] = [
  {
    name: "Prayer Time",
    icon: <AccessTimeIcon />,
    href: "/prayers",
    description: "Find the time of prayers",
  },
  {
    name: "Purification",
    icon: <WashIcon />,
    href: "/purification",
    description: "",
  },
  {
    name: "Library",
    icon: <LocalLibraryIcon />,
    href: "/library",
    description: "Find the Coran, the Sunnah",
  },
  {
    name: "Zakat",
    icon: <CardGiftcardIcon />,
    href: "/zakat",
    description: "",
  },
  {
    name: "Mosques",
    icon: <MosqueIcon />,
    href: "/mosques",
    description: "Find mosques around you",
  },
  {
    name: "Dua creator",
    icon: <QuestionAnswerIcon />,
    href: "/dua",
    description: "",
  },
  {
    name: "Settings",
    icon: <InboxIcon />,
    href: "/settings",
    description: "Modify your settings.",
  },
];
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

  const drawer = (
    <div className="mb-5">
      <Toolbar />
      <Divider />
      <List>
        {pageDescriptionList.map(({ name, icon, href }) => (
          <Fragment key={name}>
            {name === "Settings" && <Divider />}
            <ListItem disablePadding>
              <ListItemButton component="a" href={href}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          </Fragment>
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
