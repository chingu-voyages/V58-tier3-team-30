'use client';
import { Button } from '@/components/ui/button';
import { useUIView } from '@/stores/useUIViewStore';
import Link from 'next/link';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from '@/components/ui/card';

export const About = () => {
  const { currentView, showMapView } = useUIView();

  if (currentView !== 'home') return;

  return (
    <div className="flex flex-col items-center gap-5 w-full pointer-events-auto">
      <Card className="flex flex-col gap-10 justify-start m-5 bg-chingu-green-600/40 border-0 backdrop-blur-md max-w-[600px] w-full">
        <CardHeader>
          <h3 className="text-3xl text-center text-white font-bold">
            About Chingu
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-center text-white">
            Chingu is a community in which developers, UI/UX designers, product
            owners, and scrum masters around the world gather together to
            collaborate and gain real experience.
          </p>
        </CardContent>
        <CardAction className="self-center">
          <Link href="https://www.chingu.io/">
            <Button className="rounded-full text-lg px-10 py-6 bg-transparent text-white self-center border-white border-2 hover:bg-transparent">
              Learn More
            </Button>
          </Link>
        </CardAction>
      </Card>
      <Card className="flex flex-col gap-10 justify-start m-5 bg-chingu-green-600/40 border-0 backdrop-blur-md max-w-[600px] w-full">
        <CardHeader>
          <h3 className="text-3xl text-center text-white font-bold">
            What is Chingu Demographic Map?
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-center text-white">
            Chingu is a Discord based community. While the member base is large,
            it is difficult to find fellow Chingus. With our demographic map,
            you can easily see what type of Chingus are near you.
          </p>
        </CardContent>
        <CardAction className="self-center">
          <Button
            onClick={showMapView}
            className="rounded-full text-lg text-black px-10 py-6 bg-chingu-green-100 hover:bg-chingu-green-100"
          >
            Explore Now
          </Button>
        </CardAction>
      </Card>
    </div>
  );
};

export default About;
