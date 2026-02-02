"use client";

import { useState } from "react";
import { Save } from "lucide-react";

/**
 * [VERIFICATION] Settings Page
 * Screen Template: Settings (Preferences)
 * Theme Recipes: tabs, toggle, input.architectural, button.primary
 */
export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");

    return (
        <div className="p-12 max-w-[1000px] mx-auto">

            <div className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-2">Settings</h1>
                <p className="text-neutral-500">Manage your workspace preferences.</p>
            </div>

            {/* [Recipe] Tabs */}
            <div className="flex gap-8 border-b border-neutral-200 mb-12">
                <TabButton id="general" label="General" active={activeTab === "general"} onClick={setActiveTab} />
                <TabButton id="notifications" label="Notifications" active={activeTab === "notifications"} onClick={setActiveTab} />
                <TabButton id="team" label="Team Members" active={activeTab === "team"} onClick={setActiveTab} />
                <TabButton id="security" label="Security" active={activeTab === "security"} onClick={setActiveTab} />
            </div>

            {/* Content Area */}
            <div className="space-y-16">

                {/* Section: Profile */}
                <section>
                    <div className="mb-8">
                        <h3 className="text-lg font-bold tracking-tight mb-1">Profile Information</h3>
                        <p className="text-sm text-neutral-500">Public information about your account.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                        <InputGroup label="Display Name" placeholder="Sooyeon Kim" />
                        <InputGroup label="Email Address" placeholder="sooyeon@example.com" />
                        <InputGroup label="Job Title" placeholder="Product Designer" />
                        <div className="col-span-2">
                            <label className="text-xs font-medium text-neutral-500 uppercase tracking-wide block mb-2">Bio</label>
                            <textarea
                                className="w-full bg-transparent border-b border-neutral-200 p-0 py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none rounded-none transition-colors min-h-[80px] resize-none"
                                placeholder="Tell us a little bit about yourself..."
                            ></textarea>
                        </div>
                    </div>
                </section>

                {/* Section: Notifications */}
                <section>
                    <div className="mb-8 border-t border-neutral-100 pt-16">
                        <h3 className="text-lg font-bold tracking-tight mb-1">Notifications</h3>
                        <p className="text-sm text-neutral-500">Choose what we email you about.</p>
                    </div>

                    <div className="space-y-6">
                        <ToggleRow
                            label="Email Digest"
                            description="Receive a weekly summary of your analytics."
                            checked={true}
                        />
                        <ToggleRow
                            label="New Comments"
                            description="Get notified when someone comments on your project."
                            checked={true}
                        />
                        <ToggleRow
                            label="Product Updates"
                            description="Receive news about product features and updates."
                            checked={false}
                        />
                    </div>
                </section>

                {/* Actions */}
                <div className="fixed bottom-0 left-[280px] right-0 bg-white/80 backdrop-blur-md border-t border-neutral-200 p-6 flex justify-end gap-4 z-20">
                    <button className="bg-transparent text-neutral-500 px-6 py-3 uppercase tracking-wider text-xs font-bold hover:text-neutral-900">Cancel</button>
                    <button className="bg-neutral-900 text-white rounded-none px-8 py-3 uppercase tracking-wider text-xs font-semibold hover:bg-neutral-800 transition-colors flex items-center gap-2">
                        <Save size={16} /> Save Changes
                    </button>
                </div>

            </div>
        </div>
    );
}

function TabButton({ id, label, active, onClick }: { id: string, label: string, active: boolean, onClick: (id: string) => void }) {
    return (
        <button
            onClick={() => onClick(id)}
            data-state={active ? "active" : "inactive"}
            className="pb-4 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 border-b-2 border-transparent data-[state=active]:border-neutral-900 data-[state=active]:text-neutral-900 transition-colors"
        >
            {label}
        </button>
    )
}

function InputGroup({ label, placeholder }: { label: string, placeholder: string }) {
    return (
        <div>
            <label className="text-xs font-medium text-neutral-500 uppercase tracking-wide block mb-2">{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                className="w-full bg-transparent border-b border-neutral-200 p-0 py-2 text-neutral-900 placeholder:text-neutral-300 focus:border-neutral-900 focus:outline-none rounded-none transition-colors"
            />
        </div>
    )
}

function ToggleRow({ label, description, checked }: { label: string, description: string, checked: boolean }) {
    // Using Checkbox hack for pure CSS Toggle Recipe
    return (
        <div className="flex items-center justify-between group">
            <div>
                <div className="text-sm font-bold text-neutral-900 mb-0.5">{label}</div>
                <div className="text-xs text-neutral-500">{description}</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={checked} />
                {/* [Recipe] Toggle Wrapper */}
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-none peer peer-checked:bg-neutral-900 transition-colors"></div>
                {/* [Recipe] Toggle Thumb (Absolute) */}
                <div className="absolute top-[2px] left-[2px] bg-white border border-gray-300 rounded-none h-5 w-5 transition-transform peer-checked:translate-x-full"></div>
            </label>
        </div>
    )
}
