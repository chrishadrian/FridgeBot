import { ListItemPrefix, ListItemSuffix, Typography } from '@material-tailwind/react'
import Link from 'next/link';
import React from 'react'
import { ReactNode } from "react";


interface SidebarItemProps {
  href: string;
  icon: any;
  text: string;
  suffix?: ReactNode;
}

// Extracted ListItem component with correct icon typing
const SidebarItem = ({ href, icon: Icon, text, suffix }: SidebarItemProps) => {
  return (
    <Link href={href}>
        <li className="flex items-center gap-4 p-4 hover:bg-blue-gray-50 rounded-lg transition-all cursor-pointer">
          <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Icon className="size-5 mr-1" />
          </ListItemPrefix>
          <Typography color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{text}</Typography>
          {suffix && (
            <ListItemSuffix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              {suffix}
            </ListItemSuffix>
          )}
        </li>
    </Link>
  );
};

export default SidebarItem;