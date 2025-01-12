/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";

import {
  Avatar,
  AvatarImage
} from "@/components/ui/avatar";

import { useUser } from "@clerk/nextjs";

import {
  FaUsers,
  FaUserFriends,
  FaGlobe as FaGlobe2,
  FaShieldAlt,
  FaIdCard,
  FaLink,
  FaFileImport,
  FaRegUserCircle
} from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import { FaRegBell } from "react-icons/fa6";
import { LuArrowUpRightSquare } from "react-icons/lu";
import { BsGlobe } from "react-icons/bs";
import { FiArrowUpCircle } from "react-icons/fi";

import { MyAccount } from "./_components/MyAccount";
import { MySettings } from "./_components/MySettings";
import { MyNotifications } from "./_components/MyNotifications";
import { MyConnections } from "./_components/MyConnections";
import { LanguageAndRegion } from "./_components/LanguageAndRegion";
import { UpgradePlan } from "./_components/UpgradePlan";
import { Teamspaces } from "./_components/Teamspaces";
import { People } from "./_components/People";
import { Sites } from "./_components/Sites";
import { SecurityAndData } from "./_components/SecurityAndData";
import { IdentityAndProvisioning } from "./_components/IdentityAndProvisioning";
import { WorkspaceConnections } from "./_components/WorkspaceConnections";
import { Import } from "./_components/Import";


export const SettingBox = () => {

  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("-components");
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState("");
  
  if (!user) {
    return null; // or render a loading state
  };

  const primaryEmailAddress = user.emailAddresses.find((emailAddress) => emailAddress.id === user.primaryEmailAddressId);

  if (!primaryEmailAddress) {
    return null; // or render a default email address
  };
  
  const navItems = [
    { id: "account", icon: FaRegUserCircle, label: "My account" },
    { id: "settings", icon: GiSettingsKnobs, label: "My settings" },
    { id: "notifications", icon: FaRegBell, label: "My notifications" },
    { id: "connections", icon: LuArrowUpRightSquare, label: "My connections" },
    { id: "language", icon: BsGlobe, label: "Language & region" },
  ];
  
  const workspaceItems = [
    { id: "upgrade", icon: FiArrowUpCircle, label: "Upgrade plan" },
    { id: "teamspaces", icon: FaUsers, label: "Teamspaces" },
    { id: "people", icon: FaUserFriends, label: "People" },
    { id: "sites", icon: FaGlobe2, label: "Sites" },
    { id: "security", icon: FaShieldAlt, label: "Security & data" },
    { id: "identity", icon: FaIdCard, label: "Identity & provisioning" },
    { id: "connections", icon: FaLink, label: "Connections" },
    { id: "import", icon: FaFileImport, label: "Import" },
  ];

  const renderMainContent = () => {
    switch (activeTab) {
      case "account":
        return <MyAccount />;
      case "settings":
        return <MySettings />;
      case "notifications":
        return <MyNotifications />;
      case "connections":
        return <MyConnections />;
      case "language":
        return <LanguageAndRegion />;
      case "upgrade":
        return <UpgradePlan />;
      case "teamspaces":
        return <Teamspaces />;
      case "people":
        return <People />;
      case "sites":
        return <Sites />;
      case "security":
        return <SecurityAndData />;
      case "identity":
        return <IdentityAndProvisioning />;
      case "workspace-connections":
        return <WorkspaceConnections />;
      case "import":
        return <Import />;
      default:
        return <MySettings />;
    }
  };

  return (
    <div className="flex w-full h-full">
      <aside className="w-1/4 h-full bg-neutral-300 dark:bg-neutral-700/50 p-2">
        <div className="mb-8 ml-2">
          <h2 className="text-xs font-bold text-muted-foreground mb-2">
            Account
          </h2>
          <div className="flex flex-row items-center justify-start space-x-2 mb-4">
            <Avatar className="h-5 w-5 rounded-2xl">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <div className="flex flex-col items-center justify-start mr-2">
              <span className="text-start text-sm font-medium mr-16">
                {user?.fullName}
              </span>
              <span className="flex items-center text-xs text-muted-foreground ml-1">
              {primaryEmailAddress.emailAddress}
              </span>
            </div>
          </div>
        </div>
        <nav className="w-full">
          <ul>
            {navItems.map((item) => (
              <li key={item.id} className="mb-4">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(item.id);
                  }}
                  className={`flex items-center text-sm space-x-2 p-1 rounded-sm w-full ${
                    activeTab === item.id
                      ? "dark:text-white text-black font-bold dark:bg-neutral-700 bg-neutral-400"
                      : "dark:text-gray-400 text-black dark:hover:text-white dark:hover:bg-neutral-700 hover:bg-neutral-400"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ml-2 ${item.id === "settings" ? "rotate-90" : ""}`} />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <h2 className="text-xs font-bold text-muted-foreground mb-2">
              Workspace
            </h2>
            <ul>
              {workspaceItems.map((item) => (
                <li key={item.id} className="mb-4">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("");
                      setActiveWorkspaceTab(item.id);
                    }}
                    className={`flex items-center text-sm space-x-2 p-1 rounded-sm w-full ${
                      activeWorkspaceTab === item.id
                        ? "dark:text-white text-black bg-neutral-400 dark:bg-neutral-700"
                        : item.id === "upgrade"
                        ? "text-blue-500"
                        : "text-black dark:hover:text-white"
                    }`}
                  >
                    <item.icon className="h-5 w-5 ml-2" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>
      <main className="w-3/4 p-8 overflow-hidden bg-neutral-200 dark:bg-neutral-700">
        {renderMainContent()}
      </main>
    </div>
  )
}
