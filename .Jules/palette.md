## 2025-03-16 - Add ARIA label to DepartmentCard button\n**Learning:** Icon-heavy UI cards used as buttons often lack accessible names for screen readers.\n**Action:** Ensure dynamic states (e.g. active/inactive) are reflected in aria-labels, not just visual styles.

## 2025-03-17 - Add ARIA roles and focus states to Custom Modal components
**Learning:** Custom UI overlay modals frequently lack screen reader identification and keyboard focus indicators, making it hard to navigate them effectively.
**Action:** Always add `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` linking to a visible title for custom modals. Ensure all interactive parts, such as icon-only close buttons, have an `aria-label` and visible focus outlines for keyboard users.
