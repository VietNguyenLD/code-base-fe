type TabOption = {
  label: string;
  value: string;
};

type TabsSwitchProps = {
  options: TabOption[];
  value: string;
  onChange?: (value: string) => void;
};

export function TabsSwitch({ options, value, onChange }: TabsSwitchProps) {
  return (
    <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-1.5 py-1 shadow-[0_2px_10px_rgba(0,29,95,0.08)]">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange?.(opt.value)}
            className={
              active
                ? "flex flex-1 items-center justify-center rounded-full bg-[color:var(--primary-soft)] px-4 py-2 text-[13px] font-semibold text-[color:var(--primary)] shadow-[inset_0_0_0_1px_rgba(53,84,224,0.15)]"
                : "flex flex-1 items-center justify-center rounded-full px-4 py-2 text-[13px] font-semibold text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
            }
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
