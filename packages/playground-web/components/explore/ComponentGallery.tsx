'use client';

import * as React from 'react';
import {
  Button,
  Input,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Textarea,
  Skeleton,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Progress,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  Separator,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  Calendar,
} from '@framingui/ui';
import {
  Bell,
  Calculator,
  Calendar as CalendarIcon,
  CreditCard,
  Settings,
  Smile,
  User,
  Plus,
  LogOut,
  Mail,
} from 'lucide-react';

export function ComponentGallery() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="w-full pb-20 animate-in fade-in duration-500">
      <div className="mb-8 sm:mb-10 lg:mb-16 max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 sm:mb-3 text-[var(--tekton-bg-foreground)]">
          Component Gallery
        </h2>
        <p className="text-[var(--tekton-bg-muted-foreground)] text-sm sm:text-base lg:text-lg leading-relaxed">
          Beautifully designed components that you can copy and paste into your apps. Accessible.
          Customizable. Open Source.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 auto-rows-max">
        {/* Column 1 */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Card Form */}
          <Card className="shadow-none border-2 border-black rounded-none">
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name of your project" className="rounded-none border-0 border-b-2 border-black focus:border-b-2 focus:ring-0" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Framework</Label>
                    <Select defaultValue="next">
                      <SelectTrigger id="framework" className="rounded-none border-2 border-black">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="rounded-none border-2 border-black font-black">Cancel</Button>
              <Button className="rounded-none border-2 border-black bg-black text-white hover:bg-neutral-800 font-black">Deploy</Button>
            </CardFooter>
          </Card>

          {/* Form Controls / Switches */}
          <Card className="shadow-none border-2 border-black rounded-none">
            <CardContent className="p-4 sm:p-6 grid gap-4 sm:gap-6">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="airplane-mode" className="flex flex-col space-y-1">
                  <span>Airplane Mode</span>
                  <span className="font-normal leading-snug text-[var(--tekton-bg-muted-foreground)] text-xs sm:text-sm">
                    Turn off all incoming connections.
                  </span>
                </Label>
                <Switch id="airplane-mode" defaultChecked className="shrink-0" />
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
                  <span>Marketing Emails</span>
                  <span className="font-normal leading-snug text-[var(--tekton-bg-muted-foreground)] text-xs sm:text-sm">
                    Receive emails about new products.
                  </span>
                </Label>
                <Switch id="marketing-emails" className="shrink-0" />
              </div>
            </CardContent>
          </Card>

          {/* Command Menu */}
          <Card className="shadow-none border-2 border-black rounded-none p-3 sm:p-4 overflow-hidden">
            <Command className="rounded-none border-none shadow-none">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>Calendar</span>
                  </CommandItem>
                  <CommandItem>
                    <Smile className="mr-2 h-4 w-4" />
                    <span>Search Emoji</span>
                  </CommandItem>
                  <CommandItem>
                    <Calculator className="mr-2 h-4 w-4" />
                    <span>Calculator</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </CommandItem>
                  <CommandItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </CommandItem>
                  <CommandItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </Card>

          {/* Notifications */}
          <Card className="shadow-none border-2 border-black rounded-none p-4 sm:p-6 space-y-4">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <Bell className="mt-0.5 h-5 w-5 shrink-0 text-[var(--tekton-bg-foreground)]" />
              <div className="space-y-1 min-w-0">
                <p className="text-sm font-medium leading-none">Everything is updated</p>
                <p className="text-xs sm:text-sm text-[var(--tekton-bg-muted-foreground)]">
                  You have no pending updates.
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start space-x-3 sm:space-x-4">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[var(--tekton-bg-foreground)]" />
              <div className="space-y-1 min-w-0">
                <p className="text-sm font-medium leading-none">New message received</p>
                <p className="text-xs sm:text-sm text-[var(--tekton-bg-muted-foreground)]">
                  Alice replied to your comment.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Calendar */}
          <Card className="shadow-none border-2 border-black rounded-none p-3 w-full sm:w-fit mx-auto sm:mx-0 overflow-hidden">
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-none" />
          </Card>

          {/* User Controls (반응형: 모바일 1열, sm+ 2열) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="shadow-none border-2 border-black rounded-none p-4 flex flex-col items-center justify-center gap-3 text-center">
              <Avatar className="h-10 w-10 border-2 border-black rounded-none">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback className="rounded-none">CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-black">shadcn</p>
                <p className="text-xs text-neutral-400">m@example.com</p>
              </div>
              <Button variant="outline" className="w-full mt-2 text-xs h-8 rounded-none border-2 border-black font-black">
                View Profile
              </Button>
            </Card>

            <Card className="shadow-none border-2 border-black rounded-none p-4 flex flex-col gap-3 justify-center">
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest">Display Progress</Label>
                <Progress value={75} className="h-3 rounded-none border-2 border-black bg-neutral-100" />
              </div>
              <div className="space-y-2 mt-2">
                <Label className="flex items-center gap-2 font-black text-xs cursor-pointer">
                  <Checkbox id="marketing2" defaultChecked className="rounded-none border-2 border-black" />
                  Subscribe to newsletter
                </Label>
              </div>
            </Card>
          </div>

          <Card className="shadow-none border-2 border-black rounded-none p-4 sm:p-6 space-y-6">
            <div className="space-y-3">
              <Label className="font-black uppercase tracking-widest text-[10px] text-neutral-400">Labels & Badges</Label>
              <div className="flex flex-wrap gap-2">
                <Badge className="rounded-none border-2 border-black bg-black text-white px-3 py-1 font-black">Default</Badge>
                <Badge variant="secondary" className="rounded-none border-2 border-black bg-white text-black px-3 py-1 font-black">Secondary</Badge>
                <Badge variant="outline" className="rounded-none border-2 border-black bg-transparent text-black px-3 py-1 font-black">Outline</Badge>
                <Badge className="rounded-none border-2 border-black bg-[var(--tekton-color-brand)] text-black px-3 py-1 font-black">Accent</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="font-black uppercase tracking-widest text-[10px] text-neutral-400">Action Buttons</Label>
              <div className="flex flex-wrap gap-2">
                <Button className="rounded-none border-2 border-black font-black">Primary</Button>
                <Button variant="secondary" className="rounded-none border-2 border-black font-black">Secondary</Button>
                <Button variant="outline" className="rounded-none border-2 border-black font-black">Outline</Button>
                <Button variant="ghost" className="rounded-none border-2 border-transparent hover:border-black font-black">Ghost</Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Loading States (Skeleton)</Label>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full shrink-0" />
                <div className="space-y-2 w-full">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[80%]" />
                </div>
              </div>
            </div>
          </Card>

          {/* Overlays & Modals */}
          <Card className="shadow-none border-2 border-black rounded-none p-4 sm:p-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-black leading-none uppercase tracking-widest text-xs mb-3">Overlays & Modals</h4>
                <div className="flex flex-wrap gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="rounded-none border-2 border-black font-black">
                        Dialog
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] max-w-[calc(100vw-2rem)] rounded-none border-2 border-black">
                      <DialogHeader>
                        <DialogTitle className="font-black text-2xl tracking-tighter">Edit profile</DialogTitle>
                        <DialogDescription className="font-bold text-neutral-400">
                          Make changes to your profile here. Click save when you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="d-name" className="text-right font-black text-xs uppercase tracking-widest">
                            Name
                          </Label>
                          <Input id="d-name" defaultValue="Pedro Duarte" className="col-span-3 rounded-none border-0 border-b-2 border-black focus:ring-0" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="rounded-none border-2 border-black font-black">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="rounded-none border-2 border-black font-black">
                        Alert
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-[calc(100vw-2rem)] rounded-none border-2 border-black">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="font-black text-2xl tracking-tighter">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className="font-black text-neutral-400">
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-none border-2 border-black font-black">Cancel</AlertDialogCancel>
                        <AlertDialogAction className="rounded-none border-2 border-black bg-black text-white font-black">Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="rounded-none border-2 border-black font-black">
                        Popover
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 sm:w-80 rounded-none border-2 border-black shadow-none">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-black leading-none uppercase tracking-widest text-xs">Dimensions</h4>
                          <p className="text-sm text-neutral-400 font-bold">
                            Set the dimensions for the layer.
                          </p>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="rounded-none border-2 border-black font-black">
                        Sheet
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="border-l-2 border-black">
                      <SheetHeader>
                        <SheetTitle className="font-black text-3xl tracking-tighter">Mobile Navigation</SheetTitle>
                        <SheetDescription className="font-black text-neutral-400">
                          Navigate quickly through your application sections.
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 rounded-none border-2 border-black font-black">
                          <Plus className="h-4 w-4" strokeWidth={4} />
                          <span className="sr-only">Add</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="rounded-none border-2 border-black font-black bg-black text-white">
                        <p>Add to library</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4 sm:gap-6 xl:col-span-1 md:col-span-2">
          {/* Data Table */}
          <Card className="shadow-none border-2 border-black rounded-none overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b-2 border-black">
                    <TableHead className="w-[100px] font-black text-black">Invoice</TableHead>
                    <TableHead className="font-black text-black">Status</TableHead>
                    <TableHead className="text-right font-black text-black">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y-[1px] divide-neutral-100">
                  <TableRow className="transition-colors hover:bg-[var(--tekton-color-brand)]/5 border-none">
                    <TableCell className="font-black">INV001</TableCell>
                    <TableCell>
                      <Badge className="rounded-none border-[1px] border-black bg-[var(--tekton-color-brand)] text-black px-2 py-0 text-[10px] font-black">PAID</Badge>
                    </TableCell>
                    <TableCell className="text-right font-black">$250.00</TableCell>
                  </TableRow>
                  <TableRow className="transition-colors hover:bg-[var(--tekton-color-brand)]/5 border-none">
                    <TableCell className="font-black">INV002</TableCell>
                    <TableCell>
                      <Badge className="rounded-none border-[1px] border-black bg-neutral-100 text-black px-2 py-0 text-[10px] font-black">PENDING</Badge>
                    </TableCell>
                    <TableCell className="text-right font-black">$150.00</TableCell>
                  </TableRow>
                  <TableRow className="transition-colors hover:bg-[var(--tekton-color-brand)]/5 border-none">
                    <TableCell className="font-black">INV003</TableCell>
                    <TableCell>
                      <Badge className="rounded-none border-[1px] border-black bg-black text-white px-2 py-0 text-[10px] font-black">UNPAID</Badge>
                    </TableCell>
                    <TableCell className="text-right font-black">$350.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Text Areas and Inputs */}
          <Card className="shadow-none border-2 border-black rounded-none p-4 sm:p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Feedback</Label>
              <Textarea
                id="message"
                placeholder="Type your message here."
                className="resize-none h-24 rounded-none border-2 border-black focus:ring-0"
              />
            </div>

            <div className="space-y-2">
              <Label>Rating</Label>
              <RadioGroup defaultValue="3" className="flex flex-wrap gap-3 sm:gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="star1" />
                  <Label htmlFor="star1">Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="star2" />
                  <Label htmlFor="star2">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="star3" />
                  <Label htmlFor="star3">High</Label>
                </div>
              </RadioGroup>
            </div>
          </Card>

          {/* Account Tabs */}
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-none border-2 border-black h-12 p-0 bg-transparent">
              <TabsTrigger value="account" className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white font-black">Account</TabsTrigger>
              <TabsTrigger value="password" className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white font-black">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card className="shadow-none border-2 border-black border-t-0 rounded-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-black tracking-tighter">Account</CardTitle>
                  <CardDescription className="font-bold text-neutral-400">Make changes to your account here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="username2" className="font-black uppercase tracking-widest text-[10px]">Name</Label>
                    <Input id="username2" defaultValue="John Doe" className="rounded-none border-0 border-b-2 border-black px-0 focus:ring-0" />
                  </div>
                  <Button className="w-full mt-6 rounded-none border-2 border-black bg-black text-white hover:bg-neutral-800 font-black h-12">Save changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card className="shadow-none border-2 border-black border-t-0 rounded-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-black tracking-tighter">Password</CardTitle>
                  <CardDescription className="font-bold text-neutral-400">Change your password here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="current" className="font-black uppercase tracking-widest text-[10px]">Current</Label>
                    <Input id="current" type="password" className="rounded-none border-0 border-b-2 border-black px-0 focus:ring-0" />
                  </div>
                  <Button className="w-full mt-6 rounded-none border-2 border-black bg-black text-white hover:bg-neutral-800 font-black h-12">Save password</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Navigation */}
          <Card className="shadow-none border-2 border-black rounded-none p-6 overflow-x-auto flex flex-col gap-6 items-center">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="font-black text-xs uppercase tracking-widest hover:text-black">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-black" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components" className="font-black text-xs uppercase tracking-widest hover:text-black">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-black" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-black text-xs uppercase tracking-widest text-black">Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Separator className="bg-black h-[2px]" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-none border-2 border-black font-black">
                  <MenuIcon className="mr-2 h-4 w-4" strokeWidth={3} /> Options Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-none border-2 border-black" align="end">
                <DropdownMenuLabel className="font-black text-xs uppercase tracking-widest">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-black h-[1px]" />
                <DropdownMenuItem className="font-black text-sm hover:bg-[var(--tekton-color-brand)]/20 transition-colors rounded-none">
                  <User className="mr-2 h-4 w-4" strokeWidth={3} />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-black text-sm hover:bg-[var(--tekton-color-brand)]/20 transition-colors rounded-none">
                  <CreditCard className="mr-2 h-4 w-4" strokeWidth={3} />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-black text-sm hover:bg-[var(--tekton-color-brand)]/20 transition-colors rounded-none">
                  <Settings className="mr-2 h-4 w-4" strokeWidth={3} />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-black h-[1px]" />
                <DropdownMenuItem className="font-black text-sm hover:bg-neutral-100 transition-colors rounded-none">
                  <LogOut className="mr-2 h-4 w-4" strokeWidth={3} />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
