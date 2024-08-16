import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "./images/logo.webp";

export default function LoginForm() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <img src={logo} alt="Global Cards" className="mb-8 max-w-[275px]" />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Digite suas credenciais para entrar na sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="fulano@globalcards.com"
              autoComplete="off"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Entrar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
