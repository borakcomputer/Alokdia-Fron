import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const selector = [
      "main > *",
      "main > * > :not(img):not(svg):not(main)",
      "main article",
      "main figure",
      "main li",
      'main [class*="rounded-2xl"]',
      'main [class*="dashboard-panel"]',
      "footer > div",
      "header",
      "nav",
      ".site-topbar",
      ".site-navigation",
      ".notice-ticker",
      ".link-strip",
      ".admin-login-card",
    ].join(", ");
    const trackedTargets = new WeakSet<HTMLElement>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.04, rootMargin: "0px 0px -4% 0px" },
    );

    const registerTargets = (root: ParentNode) => {
      if (root instanceof HTMLElement && root.matches(selector)) {
        if (!trackedTargets.has(root)) {
          trackedTargets.add(root);
          root.classList.add("scroll-reveal");
          observer.observe(root);
        }
      }

      root.querySelectorAll<HTMLElement>(selector).forEach((target) => {
        if (trackedTargets.has(target)) return;
        trackedTargets.add(target);
        target.classList.add("scroll-reveal");
        observer.observe(target);
      });
    };

    registerTargets(document);
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) registerTargets(node);
        });
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);
}
