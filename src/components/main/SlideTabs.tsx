"use client";

import React, { ReactNode, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, MessageCircle, Settings, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const TABS = [
	{
		label: "Home",
		href: "/home",
		icon: <Home className="h-5 w-5" />,
	},
	{
		label: "Messages",
		href: "/messages",
		icon: <MessageCircle className="h-5 w-5" />,
	},
	{
		label: "Groups",
		href: "/groups",
		icon: <Users className="h-5 w-5" />,
	},
	{
		label: "Settings",
		href: "/settings",
		icon: <Settings className="h-5 w-5" />,
	},
];

const SlideTabs = () => {
	const [position, setPosition] = useState({
		left: 0,
		width: 0,
		opacity: 0,
	});
	const pathName = usePathname();
	const tabRefs = useRef<Array<HTMLLIElement | null>>([]);

	useEffect(() => {
		const activeIndex = TABS.findIndex((tab) => pathName.startsWith(tab.href));

		if (activeIndex !== -1 && tabRefs.current[activeIndex]) {
			const tabElement = tabRefs.current[activeIndex];
			const { width, left } = tabElement!.getBoundingClientRect();

			setPosition({
				left: tabElement!.offsetLeft,
				width,
				opacity: 1,
			});
		}
	}, [pathName]);

	return (
		<ul className="relative mx-auto flex justify-around w-full rounded-xl shadow-md bg-white p-2">
			{TABS.map((tab, index) => (
				<Tab
					key={tab.label}
					setPosition={setPosition}
					href={tab.href}
					ref={(el) => {tabRefs.current[index] = el}}
				>
					<div className="flex gap-2">
						{tab.icon}
						{tab.label}
					</div>
				</Tab>
			))}

			<Cursor position={position} />
		</ul>
	);
};

const Tab = React.forwardRef<
	HTMLLIElement,
	{
		children: ReactNode;
		setPosition: (position: { left: number; width: number; opacity: number }) => void;
		href: string;
	}
>(({ children, setPosition, href }, ref) => {
	const pathName = usePathname();
	const activeLink = TABS.find((tab) => pathName.startsWith(tab.href));

	return (
		<li
			ref={ref} // Callback ref działa poprawnie tutaj
			onMouseEnter={() => {
				const liRef = ref as React.RefObject<HTMLLIElement>;
				if (!liRef.current) return;

				const { width } = liRef.current.getBoundingClientRect();

				setPosition({
					left: liRef.current.offsetLeft,
					width,
					opacity: 1,
				});
			}}
			className="relative z-10"
		>
			<Link
				href={href}
				className={cn(
					"block px-3 py-1.5 text-xs uppercase text-zinc-300 md:px-5 md:py-3 md:text-base hover:text-zinc-500 transition-colors",
					activeLink?.href === href ? "text-zinc-900" : ""
				)}
			>
				{children}
			</Link>
		</li>
	);
});

const Cursor = ({
	position,
}: {
	position: { left: number; width: number; opacity: number };
}) => {
	return (
		<motion.li
			animate={position}
			className="absolute z-0 h-7 rounded-xl bg-secondary md:h-12"
		/>
	);
};

export default SlideTabs;
