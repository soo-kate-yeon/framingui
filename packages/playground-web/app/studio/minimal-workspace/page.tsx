"use client";

import {
    CreditCard,
    DollarSign,
    Users,
    Activity,
    Search,
    ChevronDown,
    Menu
} from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@tekton/ui";
/**
 * Minimal Workspace Landing Page
 * Theme: Modern SaaS Dashboard
 */
export default function MinimalWorkspaceDemo() {
    return (
        <div className="min-h-screen bg-white text-neutral-950 font-sans selection:bg-neutral-100">

            {/* Header */}
            <header className="border-b border-neutral-200 sticky top-0 bg-white/80 backdrop-blur-md z-50">
                <div className="flex h-16 items-center px-4 md:px-6 gap-4">
                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <button className="p-2 -ml-2 text-neutral-500 hover:text-neutral-950 transition-colors">
                                    <Menu size={20} />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                <SheetHeader className="text-left pb-4 mb-4 border-b border-neutral-100">
                                    <SheetTitle className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-neutral-900"></div>
                                        <span>Acme Inc.</span>
                                    </SheetTitle>
                                </SheetHeader>
                                <nav className="flex flex-col gap-4">
                                    <a href="#" className="text-sm font-medium text-neutral-950 px-2 py-1.5 rounded-md bg-neutral-100">Overview</a>
                                    <a href="#" className="text-sm font-medium text-neutral-500 hover:text-neutral-950 px-2 py-1.5 transition-colors">Customers</a>
                                    <a href="#" className="text-sm font-medium text-neutral-500 hover:text-neutral-950 px-2 py-1.5 transition-colors">Products</a>
                                    <a href="#" className="text-sm font-medium text-neutral-500 hover:text-neutral-950 px-2 py-1.5 transition-colors">Settings</a>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Team Switcher Simulation - Hidden on Mobile */}
                    <button className="hidden md:flex w-56 h-9 items-center justify-between border border-neutral-200 rounded-md px-3 hover:bg-neutral-100 transition-colors">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-neutral-900"></div>
                            <span className="text-sm font-medium">Acme Inc.</span>
                        </div>
                        <ChevronDown size={14} className="text-neutral-500" />
                    </button>

                    {/* Nav - Hidden on Mobile */}
                    <nav className="hidden lg:flex items-center gap-6 ml-4">
                        <a href="#" className="text-sm font-medium text-neutral-950">Overview</a>
                        <a href="#" className="text-sm font-medium text-neutral-500 hover:text-neutral-950 transition-colors">Customers</a>
                        <a href="#" className="text-sm font-medium text-neutral-500 hover:text-neutral-950 transition-colors">Products</a>
                        <a href="#" className="text-sm font-medium text-neutral-500 hover:text-neutral-950 transition-colors">Settings</a>
                    </nav>

                    <div className="ml-auto flex items-center gap-2 md:gap-4">
                        {/* Search - Icon only on small mobile, expanded on Tablet/Desktop */}
                        <div className="relative group">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500 group-focus-within:text-neutral-950 transition-colors" />
                            <input
                                className="h-9 w-9 md:w-64 rounded-md border border-neutral-200 bg-white pl-9 md:pr-4 py-2 text-sm outline-none placeholder:text-neutral-500 focus:ring-1 focus:ring-neutral-950 transition-all cursor-pointer md:cursor-text"
                                placeholder="Search..."
                            />
                        </div>
                        <button className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden border border-neutral-200 flex-shrink-0">
                            <img src="https://github.com/shadcn.png" alt="User" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-6 md:space-y-8">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h2>
                    <div className="flex items-center gap-2">
                        <button className="flex-1 sm:flex-none h-9 px-4 py-2 bg-white border border-neutral-200 rounded-md text-sm font-medium hover:bg-neutral-100 transition-colors">
                            Download
                        </button>
                        <button className="flex-1 sm:flex-none h-9 px-4 py-2 bg-neutral-900 text-white rounded-md text-sm font-medium hover:bg-neutral-900/90 transition-colors">
                            New Report
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="space-y-4">
                    <div className="inline-flex h-9 items-center justify-center rounded-lg bg-neutral-100 p-1 text-neutral-500 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none inline-flex items-center justify-center whitespace-nowrap rounded-md bg-white px-3 py-1.5 text-sm font-medium text-neutral-950 shadow-sm ring-offset-white transition-all">Overview</button>
                        <button className="flex-1 sm:flex-none inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium hover:text-neutral-900 transition-all">Analytics</button>
                        <button className="flex-1 sm:flex-none inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium hover:text-neutral-900 transition-all">Reports</button>
                    </div>

                    {/* KPIs */}
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { title: "Total Revenue", value: "$45,231.89", icon: DollarSign, sub: "+20.1% from last month" },
                            { title: "Subscriptions", value: "+2350", icon: Users, sub: "+180.1% from last month" },
                            { title: "Sales", value: "+12,234", icon: CreditCard, sub: "+19% from last month" },
                            { title: "Active Now", value: "+573", icon: Activity, sub: "+201 since last hour" },
                        ].map((stat) => (
                            <div key={stat.title} className="rounded-xl border border-neutral-200 bg-white text-neutral-950 shadow-sm">
                                <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                                    <h3 className="tracking-tight text-sm font-medium">{stat.title}</h3>
                                    <stat.icon className="h-4 w-4 text-neutral-500" />
                                </div>
                                <div className="p-6 pt-0">
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className="text-xs text-neutral-500">{stat.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">

                        {/* Chart Simulation */}
                        <div className="lg:col-span-4 rounded-xl border border-neutral-200 bg-white text-neutral-950 shadow-sm overflow-hidden">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h3 className="font-semibold leading-none tracking-tight">Overview</h3>
                            </div>
                            <div className="p-6 pt-0 pl-2">
                                <div className="h-[350px] w-full flex items-end justify-between px-4 gap-2">
                                    {[40, 30, 60, 80, 50, 90, 70, 45, 60, 55, 85, 40].map((h, i) => (
                                        <div key={i} className="flex flex-col items-center gap-2 group w-full">
                                            <div
                                                className="w-full bg-neutral-900 rounded-t-sm transition-all duration-500 hover:bg-neutral-600"
                                                style={{ height: `${h}%` }}
                                            ></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recent Sales */}
                        <div className="lg:col-span-3 rounded-xl border border-neutral-200 bg-white text-neutral-950 shadow-sm">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h3 className="font-semibold leading-none tracking-tight">Recent Sales</h3>
                                <p className="text-sm text-neutral-500">You made 265 sales this month.</p>
                            </div>
                            <div className="p-6 pt-0">
                                <div className="space-y-8">
                                    {[
                                        { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00" },
                                        { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00" },
                                        { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00" },
                                        { name: "William Kim", email: "will@email.com", amount: "+$99.00" },
                                        { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00" },
                                    ].map((user) => (
                                        <div key={user.email} className="flex items-center">
                                            <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9 bg-neutral-100 items-center justify-center border border-neutral-200">
                                                {user.name[0]}
                                            </span>
                                            <div className="ml-4 space-y-1">
                                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                                <p className="text-sm text-neutral-500">{user.email}</p>
                                            </div>
                                            <div className="ml-auto font-medium">{user.amount}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}
