import * as React from 'react'

import { UserMenu } from '@/components/user-menu'
import { Session } from '@/lib/types'
import { getSession } from '@auth0/nextjs-auth0'
import { BellIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'

async function UserOrLogin() {
	const session = (await getSession()) as Session;
	return (
		<div className="flex items-center">
			{session?.user && <UserMenu user={session.user} />}
		</div>
	)
}

export function Header() {
	return (
		<header className="sticky top-0 z-50 flex items-center justify-end w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl space-x-4">
			
			<a
				target="_blank"
				href=""
				rel="noopener noreferrer"
			>
				<Cog6ToothIcon className='size-5'/>
			</a>
			<a
				href="https://vercel.com/templates/Next.js/nextjs-ai-chatbot"
				target="_blank"
			>
				<BellIcon className='size-5'/>
			</a>
			<React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
				<UserOrLogin />
			</React.Suspense>
		</header>
	)
}
