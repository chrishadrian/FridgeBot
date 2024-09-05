'use client'
/* eslint-disable tailwindcss/no-unnecessary-arbitrary-value */
/* eslint-disable react/no-children-prop */
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  InboxIcon,
	ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
 
export function DefaultSidebar() {
  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-2xl shadow-blue-gray-900/5" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <div className="mb-2 flex items-center gap-4 p-4">
				<Image src="/next.svg" alt="brand"  width={32} height={32}/>
        <Typography variant="h5" color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          FridgeBot
        </Typography>
      </div>
      <List placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <ListItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <PresentationChartBarIcon className="size-5 mr-1" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <ChatBubbleBottomCenterTextIcon className="size-5 mr-1" />
          </ListItemPrefix>
          FridgeChat
        </ListItem>
				<ListItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <ShoppingBagIcon className="size-5 mr-1" />
          </ListItemPrefix>
          Inventory
        </ListItem>
        <ListItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <InboxIcon className="size-5 mr-1" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
      </List>
    </Card>
  );
}