import { type Session } from '@/lib/types'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightStartOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/solid'

export interface UserMenuProps {
	user: Session['user']
}

function getUserInitials(name: string) {
	const [firstName, lastName] = name.split(' ')
	return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
}

export function UserMenu({ user }: UserMenuProps) {
	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="default">
						<div className="flex size-7 shrink-0 select-none items-center justify-center rounded-full bg-muted/50 text-xs font-medium uppercase text-muted-foreground">
							<Image src={user.picture} alt={"User's profile picture"} width={24} height={24} className='rounded-full'/>
						</div>
						<span className="ml-2 hidden md:block">{user.email}</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent sideOffset={4} align="start" className="bg-white">
					<DropdownMenuItem className="flex-col items-start">
						<div className="text-xs text-zinc-500">{user.email}</div>
					</DropdownMenuItem>
					<Link href="/account">
						<button className=" relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none transition-colors hover:bg-red-500 hover:text-white focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
							<UserCircleIcon className="size-5 mr-1" />
							Profile
						</button>
					</Link>
					<Link href="/api/auth/logout">
						<button className=" relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none transition-colors hover:bg-red-500 hover:text-white focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
							<ArrowRightStartOnRectangleIcon className='size-5 mr-1' />
							Sign Out
						</button>
					</Link>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
