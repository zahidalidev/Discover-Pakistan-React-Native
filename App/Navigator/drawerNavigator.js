import React from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { HomeNavigator } from "./stackNavigator";
import SidebarMenu from "../Screens/Component/SidebarMenu";

const CustomDrawerComponent = (Props) =>{
  return(<SidebarMenu Props={Props} />);
}

const DrawerNavigator = createDrawerNavigator({ Home: HomeNavigator },
  {
    contentComponent: CustomDrawerComponent,
    drawerWidth: "75%",
    contentOptions: {
      activeTintColor: "black",
      activeBackgroundColor: "#F5F5F5",
      itemStyle: { paddingLeft: 15 }
    }
  }
);

const Drawer = createAppContainer(DrawerNavigator);
export default Drawer;
