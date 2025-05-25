"use client";
import { ReactNode, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { useScroll, useMotionValueEvent } from "motion/react";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "../../ui/resizable-navbar";

interface NavbarLink {
  name: string;
  link: string;
}

interface NavbarActionProps {
  text: string;
  href: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
  isButton?: boolean;
}

interface DefaultNavbarProps {
  logo?: ReactNode;
  name?: string;
  homeUrl?: string;
  links?: NavbarLink[];
  actions?: NavbarActionProps[];
  className?: string;
}

export default function DefaultNavbar({
  logo,
  name,
  homeUrl = siteConfig.url,
  links = [
    { name: "Features", link: "#features" },
    { name: "Pricing", link: "#pricing" },
    { name: "FAQ", link: "#faq" },
    { name: "Blog", link: "#blog" },
  ],
  actions = [
    { text: "Sign in", href: "#", isButton: false, variant: "secondary" },
    {
      text: "Get Started",
      href: siteConfig.url,
      isButton: true,
      variant: "primary",
    },
  ],
  className,
}: DefaultNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  // Removed useScroll and useMotionValueEvent as visibility will be constant
  // const { scrollY } = useScroll({
  //   target: ref,
  //   offset: ["start start", "end start"],
  // });
  // const [visible, setVisible] = useState<boolean>(false);

  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   if (latest > 100) {
  //     setVisible(true);
  //   } else {
  //     setVisible(false);
  //   }
  // });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={cn("relative z-50", className)}> {/* Added header with relative position */}
      <Navbar ref={ref} className={cn("top-0", className)} visible={true}>
        <NavBody visible={true} children={
          <>
            <NavbarLogo />
            <NavItems items={links} />
            <div className="flex flex-row items-center gap-4">
              {actions.map((action, index) => (
                <NavbarButton
                  key={index}
                  href={action.href}
                  variant={action.variant}
                  as={action.isButton ? "button" : "a"}
                >
                  {action.text}
                </NavbarButton>
              ))}
            </div>
          </>
        } />

        <MobileNav visible={true} children={
          <>
            <MobileNavHeader children={
              <>
                <NavbarLogo />
                <MobileNavToggle isOpen={isOpen} onClick={toggleMenu} />
              </>
            } />
            <MobileNavMenu isOpen={isOpen} onClose={toggleMenu} children={
              <>
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.link}
                    className="text-neutral-600 dark:text-neutral-300"
                    onClick={toggleMenu}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="flex flex-col gap-4">
                  {actions.map((action, index) => (
                    <NavbarButton
                      key={index}
                      href={action.href}
                      variant={action.variant}
                      as={action.isButton ? "button" : "a"}
                      className="w-full"
                      onClick={toggleMenu}
                    >
                      {action.text}
                    </NavbarButton>
                  ))}
                </div>
              </>
            } />
          </>
        } />
      </Navbar>
    </header>
  );
}
