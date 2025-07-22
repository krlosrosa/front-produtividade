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
import { useRouter } from "next/navigation";
import { useProdutividadeStore } from "@/presentation/produtividade/dashboard/store/useProdutividadeStore";

export default function Header() {
  const { processo } = useProdutividadeStore();
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
      {/* Desktop Layout */}
      <div className="hidden sm:flex h-16 items-center justify-between px-4">
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
        
        {/* Process Info - Center */}
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

      {/* Mobile Layout */}
      <div className="sm:hidden">
        {/* Top Row - Logo and User */}
        <div className="flex h-14 items-center justify-between px-4">
          {/* Logo/Brand Section */}
          <div className="flex items-center space-x-2">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">
                S
              </span>
            </div>
            <span className="font-semibold text-base">Sistema</span>
          </div>
          
          {/* User Section */}
          <div className="flex items-center space-x-2">
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
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
            ) : (
              <Button variant="default" size="sm" onClick={() => router.push("/login")}>
                Entrar
              </Button>
            )}
          </div>
        </div>
        
        {/* Bottom Row - Process Info (if exists) */}
        {processo.dataRegistro && (
          <div className="border-t px-4 py-2 bg-muted/30">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium">{processo.processo}</span>
              <span className="text-xs text-muted-foreground">
                {processo?.dataRegistro
                  ? format(new Date(processo.dataRegistro), "PPP", {
                      locale: ptBR,
                    })
                  : "Data não disponível"}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}