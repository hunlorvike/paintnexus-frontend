import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Package,
  Package2,
  Paintbrush,
  Search,
  ShoppingCart,
  Users,
  ChevronDown,
} from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Input } from '@/shared/components/ui/input';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';
import { Link, Outlet, useLocation } from 'react-router';
import { Suspense } from 'react';
import { ThemeToggle } from '@/shared/components/theme-toggle';
import { LanguageSwitcher } from '@/shared/components/language-switcher';
import { useTranslation } from 'react-i18next';

function AppSidebar() {
  const location = useLocation();
  const { t } = useTranslation();

  const navigationItems = [
    {
      title: t('dashboard'),
      url: '/',
      icon: Home,
    },
    {
      title: t('tools'),
      icon: Paintbrush,
      items: [
        {
          title: t('paintCalculator'),
          url: '/paint-calculator',
        },
      ],
    },
    {
      title: t('orders'),
      url: '#',
      icon: ShoppingCart,
      badge: '12',
    },
    {
      title: t('products'),
      url: '#',
      icon: Package,
    },
    {
      title: t('customers'),
      url: '#',
      icon: Users,
    },
    {
      title: t('analytics'),
      url: '#',
      icon: LineChart,
    },
  ];

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/" className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Package2 className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">PaintNexus</span>
                  <span className="truncate text-xs">
                    {t('paintManagement')}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                if (item.items) {
                  return (
                    <Collapsible key={item.title} asChild defaultOpen>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={location.pathname === subItem.url}
                                >
                                  <Link to={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={location.pathname === item.url}
                    >
                      <Link to={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

function DashboardLayout() {
  const { t } = useTranslation();

  return (
    <SidebarProvider>
      <Suspense fallback={null}>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
            <div className="flex items-center gap-2 px-4 sm:px-6 w-full">
              <SidebarTrigger className="-ml-1" />
              <div className="h-5 w-px bg-sidebar-border" />
              <div className="flex flex-1 items-center gap-4">
                <form className="flex-1 max-w-sm">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder={t('search')}
                      className="w-full appearance-none bg-background pl-8 shadow-none h-9"
                    />
                  </div>
                </form>
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">{t('notifications')}</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                    >
                      <CircleUser className="h-4 w-4" />
                      <span className="sr-only">{t('toggleUserMenu')}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>{t('settings')}</DropdownMenuItem>
                    <DropdownMenuItem>{t('support')}</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>{t('logout')}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 pt-0">
            <Outlet />
          </div>
        </SidebarInset>
      </Suspense>
    </SidebarProvider>
  );
}

export default DashboardLayout;
