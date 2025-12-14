import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { AppWindow } from 'lucide-react';

const GoogleIcon = () => (
    <svg className="mr-2 h-5 w-5" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
      <path fill="#4285F4" d="M488 261.8C488 400.3 381.4 512 244 512 110.3 512 0 398.8 0 256S110.3 0 244 0c73.2 0 136.2 28.5 184.4 73.1l-68.5 66.2C333.8 113.3 293.3 96 244 96c-85.3 0-154.1 68.6-154.1 160s68.8 160 154.1 160c97.4 0 134-69.6 138.8-104.2H244v-75.9h238.2c2.6 13.8 4.8 28.3 4.8 43.7z"></path>
    </svg>
);


export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <AppWindow className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">Orchestrator 360</CardTitle>
          <CardDescription>The CEO's Control Tower</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-6 pt-4">
            <Button asChild className="w-full font-bold">
              <Link href="/dashboard">
                <GoogleIcon />
                Sign in with Google
              </Link>
            </Button>
            <p className="px-8 text-center text-xs text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy. The super admin is <span className="font-medium text-foreground">roimepuniran@gmail.com</span>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
