import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SuperAdminPanel } from "@/components/admin/SuperAdminPanel";
import { adminApi } from "@/components/admin/AdminLogin";

vi.mock("@/components/admin/AdminLogin", () => ({
  adminApi: vi.fn(),
}));

const accounts = [
  { id: "super-id", username: "school", role: "superadmin", status: "active" },
  { id: "admin-id", username: "teacher", role: "admin", status: "active" },
] as const;

describe("SuperAdminPanel", () => {
  beforeEach(() => {
    vi.mocked(adminApi).mockReset();
    vi.mocked(adminApi).mockResolvedValue({ users: [...accounts] });
    vi.spyOn(window, "confirm").mockReturnValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("deletes admin accounts and does not offer deletion for Super Admin", async () => {
    vi.mocked(adminApi)
      .mockResolvedValueOnce({ users: [...accounts] })
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ users: [accounts[0]] });

    render(<SuperAdminPanel />);

    const deleteButton = await screen.findByRole("button", { name: "Delete" });
    expect(screen.getAllByRole("button", { name: "Delete" })).toHaveLength(1);
    expect(screen.getAllByText(/Super Admin · active/)).toHaveLength(1);
    expect(screen.getByText("school")).toBeInTheDocument();

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(adminApi).toHaveBeenNthCalledWith(2, "/admin/users/admin-id", undefined, "DELETE");
    });
    expect(await screen.findByText('Admin account "teacher" deleted.')).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Delete" })).not.toBeInTheDocument();
  });

  it("does not delete an account when confirmation is declined", async () => {
    vi.mocked(window.confirm).mockReturnValue(false);
    render(<SuperAdminPanel />);

    fireEvent.click(await screen.findByRole("button", { name: "Delete" }));

    expect(adminApi).toHaveBeenCalledTimes(1);
  });
});
