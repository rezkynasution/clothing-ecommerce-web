"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const rows = [
  { size: "S", chest: "36–38", waist: "30–32", length: "27" },
  { size: "M", chest: "39–41", waist: "33–35", length: "28" },
  { size: "L", chest: "42–44", waist: "36–38", length: "29" },
  { size: "XL", chest: "45–47", waist: "39–41", length: "30" },
];

export function SizeChartModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 24, scale: 0.96, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-lg rounded-glass p-7 md:p-9"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="eyebrow text-muted">Fit guide</span>
                <h3 className="mt-2 font-display text-2xl font-semibold">
                  Size Chart
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close size chart"
                className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-foreground/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-3 text-sm text-muted">
              All measurements are in inches. For the relaxed silhouettes we
              recommend taking your usual size.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--glass-border)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-foreground/5 text-left">
                    <th className="px-4 py-3 font-medium">Size</th>
                    <th className="px-4 py-3 font-medium">Chest</th>
                    <th className="px-4 py-3 font-medium">Waist</th>
                    <th className="px-4 py-3 font-medium">Length</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr
                      key={r.size}
                      className={i % 2 ? "bg-foreground/[0.03]" : ""}
                    >
                      <td className="px-4 py-3 font-display font-semibold">
                        {r.size}
                      </td>
                      <td className="px-4 py-3 text-muted">{r.chest}</td>
                      <td className="px-4 py-3 text-muted">{r.waist}</td>
                      <td className="px-4 py-3 text-muted">{r.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
