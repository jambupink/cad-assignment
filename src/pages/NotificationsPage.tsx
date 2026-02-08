// src/pages/NotificationsPage.tsx
import { useState, type FormEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Mail,
  CheckCircle2,
  Loader2,
  Info,
} from "lucide-react";
import { subscribeNotifications } from "@/lib/api";

function NotificationsPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await subscribeNotifications(email);
      setSuccess(true);
    } catch {
      setError("Failed to subscribe. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Notifications
        </h1>
        <p className="mt-2 text-muted-foreground">
          Subscribe to receive email notifications when new issues are
          reported or when issue statuses change.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Subscribe Card */}
        <Card className="max-w-md">
          <CardHeader>
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Bell className="size-5" />
            </div>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>
              Enter your email to get notified about campus issue
              reports.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <CheckCircle2 className="size-10 text-emerald-500" />
                <div>
                  <p className="font-medium">
                    Subscription request sent!
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Check your email ({email}) and click the
                    confirmation link from AWS to activate
                    notifications.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="mr-1 size-4 animate-spin" />
                      Subscribing…
                    </>
                  ) : (
                    <>
                      <Mail className="mr-1 size-4" />
                      Subscribe
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="max-w-md">
          <CardHeader>
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Info className="size-5" />
            </div>
            <CardTitle>What you'll receive</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
              <span>
                Notifications when new issues are reported on campus
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
              <span>
                Status updates when issues move from New → In Progress
                → Resolved
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
              <span>
                Issue details including category, location, and
                description
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default NotificationsPage;