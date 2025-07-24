import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] py-12">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center mb-2">
            Welcome!
          </CardTitle>
          <CardDescription className="text-center">
            This is the default landing page for non-admin users.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <p className="text-lg text-muted-foreground">
            Explore our features or learn more about us.
          </p>
          <div className="flex space-x-4">
            <Button>Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
