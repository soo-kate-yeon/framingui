'use client';

import {
  User,
  CreditCard,
  ShieldCheck,
  Bell,
  Globe,
  LogOut,
  ChevronRight,
  Smartphone,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

/**
 * Settings Page - Dark Boldness V2
 * Redesigned as a standard sectioned list interface for elite member preferences.
 */
export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/studio/dark-boldness');
  };

  return (
    <div className="min-h-screen bg-black text-white p-12 max-w-4xl mx-auto">
      <header className="mb-16">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">Settings</h1>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
          Manage your Elite Performance profile
        </p>
      </header>

      <div className="space-y-12">
        {/* Account Section */}
        <SettingSection title="Account & Profile">
          <SettingItem
            icon={<User size={18} />}
            label="Member Information"
            value="member@equinox.com"
          />
          <SettingItem
            icon={<CreditCard size={18} />}
            label="Elite Membership"
            value="Active • $250/mo"
          />
          <SettingItem icon={<Smartphone size={18} />} label="Connected Devices" value="3 Active" />
        </SettingSection>

        {/* Preferences Section */}
        <SettingSection title="Preferences">
          <SettingItem icon={<Bell size={18} />} label="Notifications" value="Email & Push" />
          <SettingItem icon={<Globe size={18} />} label="Language" value="English (US)" />
          <SettingItem icon={<ShieldCheck size={18} />} label="Privacy & Security" />
        </SettingSection>

        {/* Footer Actions */}
        <div className="pt-12 border-t border-neutral-900">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 text-neutral-500 hover:text-white transition-colors group"
          >
            <div className="w-10 h-10 border border-neutral-800 flex items-center justify-center transition-colors group-hover:border-white">
              <LogOut size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">
              Sign Out of All Devices
            </span>
          </button>

          <div className="mt-12 text-[8px] font-bold uppercase tracking-[0.4em] text-neutral-700">
            Equinox Elite Platform v2.2.0 • Tekton Engine
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 mb-6">
        {title}
      </h2>
      <div className="border border-neutral-900 bg-neutral-900/10 divide-y divide-neutral-900">
        {children}
      </div>
    </section>
  );
}

function SettingItem({
  icon,
  label,
  value,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-6 hover:bg-neutral-900/50 transition-all group text-left"
    >
      <div className="flex items-center gap-6">
        <div className="text-neutral-500 group-hover:text-white transition-colors">{icon}</div>
        <div>
          <div className="text-xs font-black uppercase tracking-widest text-white">{label}</div>
          {value && (
            <div className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">
              {value}
            </div>
          )}
        </div>
      </div>
      <ChevronRight
        size={16}
        className="text-neutral-700 group-hover:text-white transition-colors"
      />
    </button>
  );
}
