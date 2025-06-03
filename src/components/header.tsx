"use client";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { LogOut, Building } from "lucide-react";
import { useStoreProdutividade } from "@/presentation/addProdutividade/components/atom";
import { useRouter } from "next/navigation";

export default function Header() {
  const { processo } = useStoreProdutividade();
  const { push } = useRouter();
  const { data: session, status, update } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted"></div>
            <div className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-muted"></div>
              <div className="h-3 w-16 animate-pulse rounded bg-muted"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  const getInitials = (name: any) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word: any) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Logo/Brand Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                S
              </span>
            </div>
            <span className="font-semibold text-lg">Sistema</span>
          </div>
        </div>
        {processo.dataRegistro && (
          <div className="flex gap-2">
            <strong>{processo.processo} | </strong>
            <strong>
              {processo?.dataRegistro
                ? format(new Date(processo.dataRegistro), "PPP", {
                    locale: ptBR,
                  })
                : "Data não disponível"}
            </strong>
          </div>
        )}
        {/* User Section */}
        <div className="flex items-center space-x-4">
          {session?.user ? (
            <>
              {/* User Info - Hidden on mobile */}
              <div className="hidden md:flex flex-col items-end space-y-1">
                <span className="text-sm font-medium leading-none">
                  {session.user.name}
                </span>
                {session.user.center && (
                  <div className="flex items-center space-x-1">
                    <Building className="h-3 w-3 text-muted-foreground" />
                    <Badge variant="secondary" className="text-xs">
                      {session.user.center}
                    </Badge>
                  </div>
                )}
              </div>
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(session.user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm font-medium leading-none">
                        {session.user.name}
                      </p>
                      {session.user.email && (
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user.email}
                        </p>
                      )}
                      {session.user.center && (
                        <div className="flex items-center space-x-1">
                          <Building className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {session.user.center}
                          </span>
                        </div>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={() => {
                      signOut();
                      push("/");
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button variant="default" onClick={() => router.push("/login")}>
              Entrar
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
