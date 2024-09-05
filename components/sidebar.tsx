'use client'
/* eslint-disable tailwindcss/no-unnecessary-arbitrary-value */
/* eslint-disable react/no-children-prop */
import {
  Card,
  Typography,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  InboxIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import SidebarItem from "./sidebar-listitem";


export function DefaultSidebar() {
  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-2xl shadow-blue-gray-900/5" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <div className="mb-2 flex items-center gap-4 p-4">
        <Image src="/next.svg" alt="brand" width={32} height={32} />
        <Typography variant="h5" color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          FridgeBot
        </Typography>
      </div>
      <ul>
        <SidebarItem
          href="/dashboard"
          icon={PresentationChartBarIcon}
          text="Dashboard"
        />
        <SidebarItem
          href="/dashboard/chat"
          icon={ChatBubbleBottomCenterTextIcon}
          text="FridgeChat"
        />
        <SidebarItem
          href="/dashboard/inventory"
          icon={ShoppingBagIcon}
          text="Inventory"
        />
        <SidebarItem
          href="/dashboard/inbox"
          icon={InboxIcon}
          text="Inbox"
          suffix={<Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />}
        />
      </ul>
    </Card>
  );
}
