import React, { useState, useRef, useEffect } from "react";

type TabItem = {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  initialIndex?: number;
  onChange?: (index: number, tab: TabItem) => void;
  className?: string;
};

// Simple, accessible, keyboard-friendly Tabs component with Tailwind styling
export default function Tabs({
  tabs,
  initialIndex = 0,
  onChange,
  className = "",
}: TabsProps) {
  const [active, setActive] = useState(
    Math.min(Math.max(initialIndex, 0), tabs.length - 1)
  );
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (onChange) onChange(active, tabs[active]);
  }, [active]);

  // Keyboard navigation: ArrowLeft / ArrowRight to move, Home/End to go to ends
  function onKeyDown(e: React.KeyboardEvent) {
    if (tabs.length <= 1) return;
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % tabs.length;
    else if (e.key === "ArrowLeft")
      next = (active - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;

    e.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  }

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={tabListRef}
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="relative flex gap-2 overflow-auto pb-2"
      >
        {tabs.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === i}
            aria-controls={`panel-${t.id}`}
            id={`tab-${t.id}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 transition-all disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400
              ${
                active === i
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white/60 text-gray-700 hover:bg-indigo-50"
              }
            `}
          >
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{t.title}</span>
              {t.subtitle && (
                <span className="text-[11px] text-gray-400">{t.subtitle}</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Animated underline for visual flair */}
      <div className="mt-2">
        <div className="relative">
          <div className="absolute left-0 right-0 h-px bg-gray-200" />
          <div
            aria-hidden
            className="absolute top-0 h-0.5 bg-indigo-600 transition-all"
            style={{
              // Compute position & width from the active tab button, if available
              left: (() => {
                const activeEl = tabsRef.current[active];
                if (!activeEl || !tabListRef.current) return 0;
                const containerRect =
                  tabListRef.current.getBoundingClientRect();
                const rect = activeEl.getBoundingClientRect();
                return (
                  rect.left - containerRect.left + tabListRef.current.scrollLeft
                );
              })(),
              width: (() => {
                const activeEl = tabsRef.current[active];
                if (!activeEl) return 0;
                return activeEl.getBoundingClientRect().width;
              })(),
            }}
          />
        </div>
      </div>

      <div className="mt-4">
        {tabs.map((t, i) => (
          <div
            key={t.id}
            role="tabpanel"
            id={`panel-${t.id}`}
            aria-labelledby={`tab-${t.id}`}
            hidden={active !== i}
            className={`rounded-lg p-4 border border-gray-100 shadow-sm bg-white ${
              active === i ? "block" : "hidden"
            }`}
          >
            {t.content}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------ Example usage ------------------ */

// Example: import Tabs from './TailwindTabs';
// const demoTabs: TabItem[] = [
//   { id: 'summary', title: 'Summary', subtitle: 'Today', content: <div>Summary content</div> },
//   { id: 'sales', title: 'Sales', subtitle: 'Yesterday', content: <div>Sales content</div> },
//   { id: 'remit', title: 'Remitted', subtitle: 'Checked', content: <div>Remitted content</div> },
// ];
//
// <Tabs tabs={demoTabs} initialIndex={1} onChange={(i, t) => console.log('active', i, t.id)} />

// Notes / Improvements:
// - You can wire content to async data loading per tab (show loader inside the panel).
// - If you prefer a left-vertical tablist, change layout to grid with fixed width for the list.
// - For smoother underline animation across resizes, you could measure and store left/width in state
//   and update on window resize with a debounce.
