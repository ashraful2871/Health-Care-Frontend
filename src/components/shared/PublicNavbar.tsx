import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Menu } from "lucide-react";

const PublicNavbar = () => {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Consultation", href: "/consultation" },
    { label: "Health Plan", href: "/health-plan" },
    { label: "Diagnosis", href: "/diagnosis" },
    { label: "NGOs", href: "/ngos" },
  ];
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md dark:bg-background/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center justify-center text-xl font-bold text-primary"
        >
          Health-Care
        </Link>

        {/* Center: Nav Items (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Login Button (Desktop) */}
        <div className="hidden md:block">
          <Button>
            <Link href="/login">Login</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-6">
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold">
                  Navigation
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-6 space-y-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="block text-base font-medium text-muted-foreground hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-6">
                <Link href="/login">
                  <Button className="w-full">Login</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
