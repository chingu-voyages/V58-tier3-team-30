'use client';
import { Menu } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { useUIView } from '@/stores/useUIViewStore';
import { Button } from './ui/button';
import { House } from 'lucide-react';
import { Map } from 'lucide-react';
import { List } from 'lucide-react';

function MobileNav() {
  const { showHomeView, showMapView, showListView } = useUIView();

  return (
    <Sheet>
      <SheetTrigger className="block md:hidden text-chingu-green-100">
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="py-6 px-6 mx-4 my-4 rounded-xl bg-chingu-blue-500 text-chingu-green-100 border-0"
      >
        <SheetHeader className="p-0 m-0">
          <SheetTitle className="text-chingu-green-300 text-2xl">
            Menu
          </SheetTitle>
        </SheetHeader>
        <NavigationMenu className="w-full max-w-none justify-stretch items-start">
          <NavigationMenuList className="flex flex-col gap-5 w-full items-stretch">
            <NavigationMenuItem className="w-full">
              <SheetClose asChild>
                <Button
                  variant="link"
                  onClick={showHomeView}
                  className="px-4 text-xl text-white w-full justify-start"
                >
                  <House className="text-chingu-green-100" />
                  Home
                </Button>
              </SheetClose>
            </NavigationMenuItem>
            <NavigationMenuItem className="w-full">
              <SheetClose asChild>
                <Button
                  variant="link"
                  onClick={showMapView}
                  className="px-4 text-xl text-white w-full justify-start"
                >
                  <Map className="text-chingu-green-100" />
                  Map
                </Button>
              </SheetClose>
            </NavigationMenuItem>
            <NavigationMenuItem className="w-full">
              <SheetClose asChild>
                <Button
                  variant="link"
                  onClick={showListView}
                  className="px-4 text-xl text-white w-full justify-start"
                >
                  <List className="text-chingu-green-100" />
                  List
                </Button>
              </SheetClose>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
