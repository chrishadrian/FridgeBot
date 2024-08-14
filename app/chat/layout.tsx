import { Header } from '@/components/header'

interface ChatLayoutProps {
	children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex flex-col flex-1 bg-muted/50">
				<div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
					{children}
				</div>
			</main>
		</div>
	)
}
