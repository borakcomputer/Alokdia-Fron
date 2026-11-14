import { useCallback, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { adminApi, type AdminUser } from "@/components/admin/AdminLogin";
import { Button } from "@/components/ui/button";

export function SuperAdminPanel() {
  const [accounts, setAccounts] = useState<AdminUser[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      const result = await adminApi<{ users: AdminUser[] }>("/admin/users", undefined, "GET");
      setAccounts(result.users);
      setError("");
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Could not load admin accounts.",
      );
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function approve(userId: string) {
    setBusy(true);
    setError("");
    try {
      await adminApi(`/admin/users/${userId}/approve`);
      setMessage("Admin account approved.");
      await refresh();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not approve account.");
    } finally {
      setBusy(false);
    }
  }

  async function removeAccount(account: AdminUser) {
    if (
      !window.confirm(
        `Delete the admin account "${account.username}"? They will no longer be able to sign in, and their active sessions will be revoked.`,
      )
    ) {
      return;
    }

    setBusy(true);
    setError("");
    setMessage("");
    try {
      await adminApi(`/admin/users/${encodeURIComponent(account.id)}`, undefined, "DELETE");
      setMessage(`Admin account "${account.username}" deleted.`);
      await refresh();
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Could not delete admin account.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Admin Accounts</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Review new registrations. Accounts remain pending and cannot log in until you approve
          them.
        </p>
      </div>
      {(message || error) && (
        <p
          role={error ? "alert" : "status"}
          className={`rounded-lg border px-4 py-2 text-sm ${
            error
              ? "border-destructive/30 bg-destructive/10 text-destructive"
              : "border-primary/30 bg-primary/10 text-primary"
          }`}
        >
          {error || message}
        </p>
      )}
      <div className="space-y-3">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="flex flex-wrap items-center gap-3 rounded-xl border bg-card p-4"
          >
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{account.username}</p>
              <p className="text-xs text-muted-foreground">
                {account.role === "superadmin" ? "Super Admin" : "Admin"} · {account.status}
              </p>
            </div>
            {account.role === "admin" && account.status === "pending" && (
              <Button size="sm" onClick={() => void approve(account.id)} disabled={busy}>
                Approve
              </Button>
            )}
            {account.role === "admin" && (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => void removeAccount(account)}
                disabled={busy}
              >
                <Trash2 />
                Delete
              </Button>
            )}
          </div>
        ))}
        {!accounts.length && !error && (
          <p className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
            No admin accounts or pending registrations found.
          </p>
        )}
      </div>
    </section>
  );
}
