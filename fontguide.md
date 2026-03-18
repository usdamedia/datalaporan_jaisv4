Here is the distilled font guideline in a clean, copy-pasteable Markdown format. I’ve organized it into a "Quick Reference" section followed by specific rules for mobile and desktop.

---

# 📱 Typography Design Guidelines

## 1. Quick Reference Table
| Element | Mobile Size | Desktop Size |
| :--- | :--- | :--- |
| **Page Titles (H1)** | 28–40px | 35–50px |
| **Body (Text-Heavy)** | 16–20px | 18–24px |
| **Body (Interaction-Heavy)** | 16–18px | 14–20px |
| **Secondary/Captions** | -2px from Default | -2px from Default |

---

## 2. Mobile Guidelines
> **Core Heuristic:** Start with **17px** as your default and adjust based on the typeface’s unique x-height.

### The 16px Rule
* **Mandatory:** Text inputs must be at least **16px**. 
* **Reason:** Anything smaller triggers the iOS "Auto-Zoom" glitch, which crops the UI and forces users to manually zoom out.

### When to Adjust
* **Decrease Size:** If you have < 30 characters per line or need high information density for complex tools.
* **Increase Size:** If the page is long-form reading (blogs/articles). It should feel as effortless as reading a well-printed book.

---

## 3. Desktop Guidelines

### Reading Comfort
* **Text-Heavy:** 18–24px. Larger fonts reduce eye strain during long-form sessions.
* **Interaction-Heavy:** 14–20px. Smaller fonts allow for better data visualization, tables, and dashboards.

### Line Length (The 50-75 Rule)
* Aim for **50–75 characters per line**.
* **Too Short:** Users spend too much energy "tracking" back to the start of lines.
* **Too Long:** Users lose their place when moving from the end of one line to the next.

---

## 4. Hierarchy & System Architecture
To avoid "Font Size Creep," stick to a maximum of **4 sizes**:

1.  **Header:** High impact, bold, 30–50px.
2.  **Default (The Workhorse):** Used for body text, menus, buttons, and form labels.
3.  **Secondary:** ~2px smaller than default. Use for captions and supporting info (suggested: 70% gray contrast).
4.  **Tertiary/Wildcard:** Use sparingly for uppercase labels or tiny metadata.

---

## 5. Implementation Checklist
* [ ] **View on Device:** Never sign off on a font size until you've seen it on a physical phone (using Figma Mirror/Sketch).
* [ ] **Input Check:** Ensure all `<input>` and `<textarea>` elements are $\ge 16\text{px}$.
* [ ] **Contrast:** Ensure secondary text (lighter gray) still passes WCAG accessibility standards.

---

**Would you like me to generate a set of CSS variables or Tailwind utility classes based on these specific ranges?**