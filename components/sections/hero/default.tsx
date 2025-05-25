import { siteConfig } from "@/config/site";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

import { Button, type ButtonProps } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { Section } from "../../ui/section";
import { Mockup, MockupFrame } from "../../ui/mockup";
import Glow from "../../ui/glow";
import Github from "../../logos/github";
import Screenshot from "../../ui/screenshot";
import { AnimatedTooltipPreview } from "@/components/AnimatedTooltipPreview";
import { Particles } from "@/components/magicui/particles";
import { AnimatedGradientTextDemo } from "@/components/AnimatedGradientTextDemo";

interface HeroButtonProps {
  href: string;
  text: string;
  variant?: ButtonProps["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
}

interface HeroProps {
  title?: string;
  description?: string;
  mockup?: ReactNode | false;
  badge?: ReactNode | false;
  buttons?: HeroButtonProps[] | false;
  className?: string;
}

export default function Hero({
  title = "Magic Ul is the new way to build landing pages.",
  description = "Professionally designed blocks and templates built with React, Shadcn/ui and Tailwind that will help your product stand out.",
  mockup = (
    <Screenshot
      srcLight="/light.png"
      srcDark="/dark.png"
      alt="Launch UI app screenshot"
      width={1248}
      height={765}
      className="w-full"
    />
  ),
  badge = false,
  buttons = [
    {
      href: "#",
      text: "Get Started",
      variant: "default",
    },
    {
      href: "#",
      text: "Github",
      variant: "glow",
      icon: <Github className="mr-2 size-4" />,
    },
  ],
  className,
}: HeroProps) {
  return (
    <Section
      className={cn(
        "fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0 relative min-h-screen", // Added relative and min-h-screen to Section
        className,
      )}
    >
      <Particles
        className="absolute inset-0 -z-10"
        quantity={100}
        ease={80}
        size={0.4}
        staticity={30}
      />
      <div className="max-w-container mx-auto flex flex-col gap-12 pt-16 sm:gap-24 relative z-10"> {/* Ensure this div has z-index higher than background */}
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          {badge !== false && badge}
          <div className="flex flex-col items-center justify-center w-full">
            {/* Afficher AnimatedTooltipPreview à partir de md et au-dessus, cacher sur mobile */}
            <div className="hidden md:block -mt-12">
              <AnimatedTooltipPreview />
            </div>
            {/* Afficher AnimatedGradientTextDemo sur mobile, cacher à partir de md */}
            <div className="block md:hidden -mt-20">
              <AnimatedGradientTextDemo />
            </div>
          </div>
          <h1 className="animate-appear from-white to-gray-300 dark:from-gray-100 dark:to-gray-400 relative z-10 inline-block bg-linear-to-r bg-clip-text text-4xl leading-tight font-semibold text-balance text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight -mt-12">
            {title}
          </h1>
          <p className="text-md animate-appear text-muted-foreground relative z-10 max-w-[740px] font-medium text-balance opacity-0 delay-100 sm:text-xl">
            {description}
          </p>
          {buttons !== false && buttons.length > 0 && (
            <div className="animate-appear relative z-10 flex justify-center gap-4 opacity-0 delay-300">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant || "default"}
                  size="lg"
                  asChild
                >
                  <a href={button.href}>
                    {button.icon}
                    {button.text}
                    {button.iconRight}
                  </a>
                </Button>
              ))}
            </div>
          )}
          {mockup !== false && (
            <div className="relative w-full pt-12">
              <MockupFrame
                className="animate-appear opacity-0 delay-700"
                size="small"
              >
                <Mockup
                  type="responsive"
                  className="bg-background/90 w-full rounded-xl border-0"
                >
                  {mockup}
                </Mockup>
              </MockupFrame>
              <Glow
                variant="top"
                className="animate-appear-zoom opacity-0 delay-1000"
              />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
