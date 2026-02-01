/**
 * Account Page
 * [SPEC-UI-003][TAG-UI003-038]
 *
 * 라이선스 관리 및 좋아요 목록 페이지
 */

'use client';

import { redirect } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { Key, Heart } from 'lucide-react';

// ============================================================================
// Component
// ============================================================================

export default function AccountPage() {
  const { user, userData } = useAuth();

  // [TAG-UI003-016] 로그인 필수
  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div
      style={{
        padding: 'var(--tekton-spacing-xl, 24px)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <header
        style={{
          marginBottom: 'var(--tekton-spacing-xl, 24px)',
        }}
      >
        <h1
          style={{
            fontSize: 'var(--tekton-font-size-2xl, 24px)',
            fontWeight: '600',
            color: 'var(--tekton-text-foreground, #111827)',
            marginBottom: 'var(--tekton-spacing-xs, 4px)',
          }}
        >
          My Account
        </h1>
        <p
          style={{
            fontSize: 'var(--tekton-font-size-base, 16px)',
            color: 'var(--tekton-text-muted-foreground, #6b7280)',
          }}
        >
          Manage your licenses and saved templates
        </p>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 'var(--tekton-spacing-xl, 24px)',
        }}
      >
        {/* Licenses Section */}
        <section
          style={{
            backgroundColor: 'var(--tekton-bg-background, #ffffff)',
            border: '1px solid var(--tekton-border-default, #e5e7eb)',
            borderRadius: 'var(--tekton-radius-lg, 8px)',
            padding: 'var(--tekton-spacing-lg, 16px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--tekton-spacing-sm, 8px)',
              marginBottom: 'var(--tekton-spacing-md, 12px)',
            }}
          >
            <Key size={20} aria-hidden="true" />
            <h2
              style={{
                fontSize: 'var(--tekton-font-size-lg, 18px)',
                fontWeight: '600',
                color: 'var(--tekton-text-foreground, #111827)',
              }}
            >
              My Licenses
            </h2>
          </div>

          {userData?.licenses && userData.licenses.length > 0 ? (
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--tekton-spacing-sm, 8px)',
              }}
            >
              {userData.licenses.map((license) => (
                <li
                  key={license.id}
                  style={{
                    padding: 'var(--tekton-spacing-md, 12px)',
                    backgroundColor: 'var(--tekton-bg-muted, #f9fafb)',
                    borderRadius: 'var(--tekton-radius-md, 6px)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 'var(--tekton-spacing-xs, 4px)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'var(--tekton-font-size-sm, 14px)',
                        fontWeight: '500',
                        color: 'var(--tekton-text-foreground, #111827)',
                      }}
                    >
                      {license.templateId}
                    </span>
                    <span
                      style={{
                        fontSize: 'var(--tekton-font-size-xs, 12px)',
                        padding: 'var(--tekton-spacing-xs, 4px) var(--tekton-spacing-sm, 8px)',
                        backgroundColor:
                          license.status === 'active'
                            ? 'var(--tekton-bg-success, #10b981)'
                            : 'var(--tekton-bg-destructive, #ef4444)',
                        color: '#ffffff',
                        borderRadius: 'var(--tekton-radius-sm, 4px)',
                        textTransform: 'capitalize',
                      }}
                    >
                      {license.status}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 'var(--tekton-font-size-xs, 12px)',
                      color: 'var(--tekton-text-muted-foreground, #6b7280)',
                    }}
                  >
                    Purchased: {new Date(license.purchasedAt).toLocaleDateString()}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p
              style={{
                fontSize: 'var(--tekton-font-size-sm, 14px)',
                color: 'var(--tekton-text-muted-foreground, #6b7280)',
                textAlign: 'center',
                padding: 'var(--tekton-spacing-lg, 16px)',
              }}
            >
              No licenses yet
            </p>
          )}
        </section>

        {/* Liked Templates Section */}
        <section
          style={{
            backgroundColor: 'var(--tekton-bg-background, #ffffff)',
            border: '1px solid var(--tekton-border-default, #e5e7eb)',
            borderRadius: 'var(--tekton-radius-lg, 8px)',
            padding: 'var(--tekton-spacing-lg, 16px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--tekton-spacing-sm, 8px)',
              marginBottom: 'var(--tekton-spacing-md, 12px)',
            }}
          >
            <Heart size={20} aria-hidden="true" />
            <h2
              style={{
                fontSize: 'var(--tekton-font-size-lg, 18px)',
                fontWeight: '600',
                color: 'var(--tekton-text-foreground, #111827)',
              }}
            >
              Liked Templates
            </h2>
          </div>

          {userData?.likedTemplates && userData.likedTemplates.length > 0 ? (
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--tekton-spacing-sm, 8px)',
              }}
            >
              {userData.likedTemplates.map((templateId) => (
                <li
                  key={templateId}
                  style={{
                    padding: 'var(--tekton-spacing-md, 12px)',
                    backgroundColor: 'var(--tekton-bg-muted, #f9fafb)',
                    borderRadius: 'var(--tekton-radius-md, 6px)',
                    fontSize: 'var(--tekton-font-size-sm, 14px)',
                    color: 'var(--tekton-text-foreground, #111827)',
                  }}
                >
                  {templateId}
                </li>
              ))}
            </ul>
          ) : (
            <p
              style={{
                fontSize: 'var(--tekton-font-size-sm, 14px)',
                color: 'var(--tekton-text-muted-foreground, #6b7280)',
                textAlign: 'center',
                padding: 'var(--tekton-spacing-lg, 16px)',
              }}
            >
              No liked templates yet
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
