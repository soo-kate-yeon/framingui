"use client";

import React from "react";
import { Plus, Filter, MoreHorizontal } from "lucide-react";

/**
 * [VERIFICATION] Customers Table View
 * Theme Recipe: recipes.table
 */
export default function CustomersPage() {
    const customers = [
        { id: 1, name: "Acme Corp", email: "contact@acme.com", plan: "Enterprise", status: "Active", lastActive: "2 min ago" },
        { id: 2, name: "Globex Inc", email: "info@globex.com", plan: "Starter", status: "Inactive", lastActive: "2 days ago" },
        { id: 3, name: "Soylent Corp", email: "sales@soylent.com", plan: "Pro", status: "Active", lastActive: "5 hours ago" },
        { id: 4, name: "Initech", email: "help@initech.com", plan: "Enterprise", status: "Active", lastActive: "1 day ago" },
        { id: 5, name: "Umbrella Corp", email: "security@umbrella.com", plan: "Pro", status: "Suspended", lastActive: "1 min ago" },
    ];

    return (
        <div className="p-12 max-w-[1600px] mx-auto">

            {/* Page Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Customers</h1>
                    <p className="text-neutral-500">Manage your user base and permissions.</p>
                </div>
                {/* [Recipe] Button Primary */}
                <button className="bg-neutral-900 text-white rounded-none px-6 py-3 uppercase tracking-wider text-xs font-semibold hover:bg-neutral-800 transition-colors flex items-center gap-2">
                    <Plus size={16} /> Add Customer
                </button>
            </div>

            {/* Card: Minimal (used as table container) */}
            <div className="bg-neutral-50 border-none p-8">

                {/* Toolbar */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-4">
                        {/* [Recipe] Button Ghost */}
                        <button className="bg-transparent text-neutral-900 rounded-none px-0 py-2 uppercase tracking-wide text-xs font-bold border-b-2 border-neutral-900">All Customers</button>
                        <button className="bg-transparent text-neutral-400 rounded-none px-0 py-2 uppercase tracking-wide text-xs font-bold hover:text-neutral-600 border-b-2 border-transparent">Active</button>
                        <button className="bg-transparent text-neutral-400 rounded-none px-0 py-2 uppercase tracking-wide text-xs font-bold hover:text-neutral-600 border-b-2 border-transparent">Inactive</button>
                    </div>
                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-neutral-500 hover:text-neutral-900">
                        <Filter size={14} /> Filter
                    </button>
                </div>

                {/* [Recipe] Table */}
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b border-neutral-900 pb-3 text-[10px] uppercase tracking-widest font-bold text-neutral-500 pl-4">Company</th>
                            <th className="border-b border-neutral-900 pb-3 text-[10px] uppercase tracking-widest font-bold text-neutral-500">Contact</th>
                            <th className="border-b border-neutral-900 pb-3 text-[10px] uppercase tracking-widest font-bold text-neutral-500">Plan</th>
                            <th className="border-b border-neutral-900 pb-3 text-[10px] uppercase tracking-widest font-bold text-neutral-500">Status</th>
                            <th className="border-b border-neutral-900 pb-3 text-[10px] uppercase tracking-widest font-bold text-neutral-500">Last Active</th>
                            <th className="border-b border-neutral-900 pb-3 text-[10px] uppercase tracking-widest font-bold text-neutral-500 text-right pr-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((c) => (
                            <tr key={c.id} className="border-b border-neutral-100 hover:bg-neutral-100 transition-colors group">
                                <td className="py-4 pl-4 text-sm font-bold text-neutral-900 align-middle pointer-events-none">{c.name}</td>
                                <td className="py-4 text-sm text-neutral-600 font-medium align-middle pointer-events-none">{c.email}</td>
                                <td className="py-4 text-sm text-neutral-600 font-medium align-middle pointer-events-none">{c.plan}</td>
                                <td className="py-4 align-middle pointer-events-none">
                                    {/* [Recipe] Badge */}
                                    <span className={`inline-flex items-center rounded-none border px-2 py-0.5 text-[10px] uppercase font-bold tracking-wide ${c.status === 'Active'
                                            ? 'border-green-200 bg-green-50 text-green-700'
                                            : 'border-neutral-200 bg-neutral-100 text-neutral-500'
                                        }`}>
                                        {c.status}
                                    </span>
                                </td>
                                <td className="py-4 text-sm text-neutral-400 font-normal align-middle pointer-events-none">{c.lastActive}</td>
                                <td className="py-4 text-right pr-4 align-middle">
                                    <button className="p-2 hover:bg-neutral-200 transition-colors text-neutral-400 hover:text-neutral-900">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Stub */}
                <div className="flex justify-end mt-6 gap-2">
                    <button className="px-3 py-1 text-xs border border-neutral-200 text-neutral-400 bg-white hover:text-neutral-900 disabled:opacity-50">Prev</button>
                    <button className="px-3 py-1 text-xs border border-neutral-200 text-neutral-900 bg-white hover:bg-neutral-50">Next</button>
                </div>

            </div>
        </div>
    );
}
