import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches the contact us page", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/contact-us");

    expect(matches.at(-1)?.routeId).toBe("/contact-us");
  });

  it("matches the admission and about pages", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    expect(router.matchRoutes("/admission").at(-1)?.routeId).toBe("/admission");
    expect(router.matchRoutes("/about-us").at(-1)?.routeId).toBe("/about-us");
  });

  it("matches the separate information pages and detail pages", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const informationPages = [
      "/notices",
      "/news-events",
      "/gallery",
      "/results",
      "/academic-program",
      "/academic-calendar",
      "/rules",
      "/teachers",
      "/clubs",
      "/video-gallery",
      "/class-routine",
      "/facilities",
      "/library",
      "/science-lab",
      "/sports",
    ];

    for (const path of informationPages) {
      expect(router.matchRoutes(path).at(-1)?.routeId).toBe(path);
    }
    expect(router.matchRoutes("/notices/1").at(-1)?.routeId).toBe("/notices/$id");
    expect(router.matchRoutes("/news-events/1").at(-1)?.routeId).toBe("/news-events/$id");
  });
});
