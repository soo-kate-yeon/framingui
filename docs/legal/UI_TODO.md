# Legal UI Implementation ToDo

> **Purpose:** UI elements required for legal compliance based on KO/EN legal documents.

---

## 🔴 MUST HAVE (결제 전 필수)

### 1. Checkout/Download Page - 청약철회 동의

**KO Requirement (전자상거래법 제17조):**
```
☑️ 다운로드 시작 시 청약철회권이 제한됨에 동의합니다.
```

**EN Requirement:**
```
☑️ I understand that by initiating the download, my right to cancel this order is waived.
```

- [ ] 결제 버튼 위에 체크박스 UI 구현
- [ ] 체크 전에는 다운로드 버튼 비활성화
- [ ] 동의 로그 저장 (timestamp, user_id)

---

### 2. Subscription Checkout - 자동갱신 고지 (ROSCA)

**EN Requirement:**
```
⚠️ Your subscription will automatically renew annually at $149/year. 
   You may cancel anytime in your account settings.
```

**KO Requirement:**
```
⚠️ 구독은 매년 $149에 자동 갱신됩니다.
   계정 설정에서 언제든 취소할 수 있습니다.
```

- [ ] 결제 버튼 바로 위에 고지문 표시
- [ ] 취소 방법 링크 포함

---

### 3. Account Dashboard - 구독 취소 버튼

- [ ] 계정 설정에 "Cancel Subscription / 구독 취소" 버튼 구현
- [ ] 취소 절차가 구독만큼 쉬워야 함 (ROSCA 요구사항)

---

## 🟡 SHOULD HAVE (권장)

### 4. Footer Links - 법적 문서 링크

- [ ] Terms of Service / 이용약관
- [ ] Privacy Policy / 개인정보처리방침
- [ ] Refund Policy / 환불정책

---

### 5. Account Registration - 약관 동의

```
☑️ I agree to the Terms of Service and Privacy Policy
   이용약관 및 개인정보처리방침에 동의합니다.
```

- [ ] 회원가입 시 약관 동의 체크박스
- [ ] 각 문서로 연결되는 링크

---

### 6. Cookie Banner (GDPR/Analytics)

```
🍪 We use cookies to improve your experience. 
   [Accept] [Manage Preferences]
```

- [ ] 첫 방문 시 쿠키 동의 배너 표시
- [ ] 분석 쿠키 opt-out 옵션

---

## 🟢 NICE TO HAVE (향후)

### 7. CCPA "Do Not Sell" Link (California)

```
[Do Not Sell or Share My Personal Information]
```

- [ ] Footer에 링크 추가 (규모 확대 시)

---

## Implementation Notes

| 항목 | 관련 법률 | 우선순위 |
|------|----------|----------|
| 청약철회 동의 체크박스 | 전자상거래법 §17 | 🔴 필수 |
| 자동갱신 고지 | ROSCA (US) | 🔴 필수 |
| 구독 취소 버튼 | ROSCA (US) | 🔴 필수 |
| Footer 법적 링크 | 전자상거래법 | 🟡 권장 |
| 쿠키 배너 | GDPR/PIPA | 🟡 권장 |
