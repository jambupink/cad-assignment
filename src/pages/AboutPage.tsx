// src/pages/AboutPage.tsx
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, Target, Users, ShieldCheck } from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Every reported issue is tracked openly so the campus community can see progress.",
  },
  {
    icon: Target,
    title: "Efficiency",
    description:
      "Issues are categorised and prioritised so the maintenance team can respond quickly.",
  },
  {
    icon: Users,
    title: "Community-Driven",
    description:
      "Anyone on campus — students, staff, or visitors — can contribute by reporting issues.",
  },
  {
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "Safety-related issues are flagged with high priority to protect everyone on campus.",
  },
];

function AboutPage() {
  return (
    <div className="flex flex-col gap-12">
      {/* Header */}
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">
          About CampusWatch
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          CampusWatch is a Campus Asset Monitoring System developed for the
          Facilities Management department at Nanyang Polytechnic. It
          provides a simple, centralised way for students, staff, and
          visitors to report damaged or faulty campus assets.
        </p>
        <p className="mt-3 text-muted-foreground">
          From broken chairs and flickering lights to graffiti and safety
          hazards, CampusWatch ensures that no issue goes unnoticed. Reports
          are stored in a central database, categorised by type and
          location, and tracked through to resolution.
        </p>
      </div>

      {/* Values */}
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold tracking-tight">Our Principles</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <Card key={v.title}>
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <v.icon className="size-5" />
                </div>
                <CardTitle className="text-base">{v.title}</CardTitle>
                <CardDescription>{v.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;