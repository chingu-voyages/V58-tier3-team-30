'use client';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Button } from './ui/button';
import { useUIView } from '@/stores/useUIViewStore';

export default function Navbar() {
  const { showHomeView, showListView, showMapView } = useUIView();

  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList className="gap-3">
        <NavigationMenuItem>
          <Button
            onClick={showHomeView}
            className="px-4 text-xl text-white bg-transparent hover:bg-transparent"
          >
            Home
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button
            onClick={showMapView}
            className="px-4 text-xl text-white bg-transparent hover:bg-transparent"
          >
            Map
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button
            onClick={showListView}
            className="px-4 text-xl text-white bg-transparent hover:bg-transparent"
          >
            List
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
