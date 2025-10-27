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

const PublicNavbar = () => {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Consultation", href: "/consultation" },
    { label: "Health Plan", href: "/health-plan" },
    { label: "Diagnosis", href: "/diagnosis" },
    { label: "NGOs", href: "/ngos" },
  ];
  return (
    <header className="sticky top-0 z-50 flex h-10 border w-full items-center justify-around bg-background/05 px-4 shadow-md">
      <div>
        <div>
          <Link
            href="/"
            className="flex items-center justify-center text-xl font-bold text-primary"
          >
            Health-Care
          </Link>
        </div>

        <nav className="hidden md:block ">
          <ul className="flex gap-6">
            {navItems.map((item) => (
              <li
                key={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>

      {/* mobile navigation */}

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-name">Name</Label>
                <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-username">Username</Label>
                <Input id="sheet-demo-username" defaultValue="@peduarte" />
              </div>
            </div>
            <SheetFooter>
              <Button type="submit">Save changes</Button>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default PublicNavbar;
