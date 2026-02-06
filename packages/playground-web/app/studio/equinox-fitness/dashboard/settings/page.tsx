/**
 * Settings Page - Equinox Fitness V2
 * SPEC-MCP-004 Phase 1-4 Integration Test
 *
 * Phase 3: Template Matcher → core.preferences
 * Phase 4: Recipe Resolver → equinox-fitness recipes applied
 */

'use client';

import { Badge, Button, Card, Separator } from '@tekton/ui';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = () => {
    // 실제 로그아웃 로직
    router.push('/studio/equinox-fitness');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto space-y-4">
          <Badge
            variant="default"
            className="inline-flex items-center rounded-none border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-[10px] uppercase font-bold text-neutral-400 tracking-wide"
          >
            SETTINGS
          </Badge>

          <h1 className="text-5xl font-bold uppercase tracking-tighter text-white leading-none">
            ACCOUNT SETTINGS
          </h1>

          <p className="text-sm font-normal text-neutral-400 leading-relaxed">
            Manage your account, subscription, and preferences.
          </p>
        </div>
      </section>

      {/* Account Information Section */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-transparent border border-neutral-800 p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2 block">
              ACCOUNT INFORMATION
            </p>

            <Separator className="my-6 bg-neutral-800" />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  EMAIL
                </span>
                <span className="text-sm font-normal text-neutral-400 leading-relaxed">
                  member@equinox.com
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  MEMBER ID
                </span>
                <span className="text-sm font-normal text-neutral-400 leading-relaxed">
                  EQX-2024-7812
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  MEMBER SINCE
                </span>
                <span className="text-sm font-normal text-neutral-400 leading-relaxed">
                  January 2024
                </span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Subscription Plan Section */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-neutral-900/50 backdrop-blur-md border-b border-white/10 p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2 block">
              SUBSCRIPTION PLAN
            </p>

            <Separator className="my-6 bg-neutral-800" />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  CURRENT PLAN
                </span>
                <Badge
                  variant="default"
                  className="inline-flex items-center rounded-none bg-white text-black px-2 py-0.5 text-[10px] uppercase font-bold tracking-wide"
                >
                  ELITE MEMBERSHIP
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  BILLING CYCLE
                </span>
                <span className="text-sm font-normal text-neutral-400 leading-relaxed">
                  Monthly - $250/mo
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  NEXT BILLING DATE
                </span>
                <span className="text-sm font-normal text-neutral-400 leading-relaxed">
                  March 1, 2026
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  BENEFITS
                </span>
                <span className="text-sm font-normal text-neutral-400 leading-relaxed">
                  Unlimited Classes · Personal Training · Spa Access
                </span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Actions Section */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="bg-transparent border border-white/30 text-white h-12 px-8 uppercase tracking-widest text-xs font-bold hover:bg-white/10 transition-colors rounded-none"
            >
              CHANGE PASSWORD
            </Button>

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="bg-transparent text-neutral-400 h-10 px-4 uppercase tracking-widest text-[10px] font-bold hover:text-white transition-colors rounded-none"
            >
              LOG OUT
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
