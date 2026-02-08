import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Camera,
  ClipboardList,
  MapPin,
  Wrench,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

const stats = [
  {
    label: "Issues Reported",
    value: "1,247",
    icon: AlertTriangle,
    color: "text-amber-500",
  },
  {
    label: "Resolved",
    value: "1,083",
    icon: CheckCircle2,
    color: "text-emerald-500",
  },
  {
    label: "In Progress",
    value: "132",
    icon: Clock,
    color: "text-blue-500",
  },
  {
    label: "Campus Locations",
    value: "24",
    icon: MapPin,
    color: "text-violet-500",
  },
];

const steps = [
  {
    icon: Camera,
    title: "Snap a Photo",
    description:
      "Take a photo of the damaged asset or facility issue you've spotted on campus.",
  },
  {
    icon: ClipboardList,
    title: "Submit a Report",
    description:
      "Fill in a short form with the issue category, location, and a brief description.",
  },
  {
    icon: MapPin,
    title: "We Locate It",
    description:
      "Our system logs the report with location details so the maintenance team knows exactly where to go.",
  },
  {
    icon: Wrench,
    title: "Issue Gets Fixed",
    description:
      "The facilities team reviews, prioritises, and resolves the issue. You can track its status.",
  },
];

function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 pt-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
          <AlertTriangle className="size-3.5" />
          Keeping our campus safe &amp; well-maintained
        </div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Report Campus Issues
          <br />
          <span className="text-muted-foreground">In Seconds</span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          CampusWatch makes it easy for students and staff to report broken
          furniture, faulty lights, damaged equipment, and other facility
          issues — so they get fixed faster.
        </p>
        <div className="flex gap-3">
          <Button asChild size="lg">
            <Link to="/issues">
              Browse Issues
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/locations">View Locations</Link>
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="items-center text-center">
              <stat.icon className={`size-6 ${stat.color}`} />
              <CardTitle className="text-2xl font-bold">
                {stat.value}
              </CardTitle>
              <CardDescription>{stat.label}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      {/* How It Works */}
      <section className="flex flex-col gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            How It Works
          </h2>
          <p className="mt-2 text-muted-foreground">
            Reporting a campus issue takes less than a minute.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Card key={step.title} className="relative">
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <step.icon className="size-5" />
                </div>
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="text-xs font-bold text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step.title}
                </CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl border border-border bg-muted/50 p-8 text-center sm:p-12">
        <h2 className="text-2xl font-bold tracking-tight">
          Spotted something broken?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Don't walk past it — report it! Help us keep our campus in top
          shape for everyone.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link to="/issues">
            View Reported Issues
            <ArrowRight className="ml-1 size-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
}

export default HomePage;