import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  FlaskConical,
  Library,
  Trees,
  Utensils,
  Dumbbell,
  Monitor,
  GraduationCap,
} from "lucide-react";

const locations = [
  {
    name: "Block A — Lecture Halls",
    description:
      "Main lecture theatres and seminar rooms. Seats up to 300 students per hall.",
    icon: GraduationCap,
    issueCount: 12,
    areas: ["LT1", "LT2", "Seminar Rooms A1-A8"],
  },
  {
    name: "Block B — IT Labs",
    description:
      "Computer labs and networking labs with workstations, projectors, and servers.",
    icon: Monitor,
    issueCount: 23,
    areas: ["Lab B01-B06", "Server Room B07"],
  },
  {
    name: "Block C — Science Labs",
    description:
      "Chemistry, physics, and biology laboratories with specialised equipment.",
    icon: FlaskConical,
    issueCount: 8,
    areas: ["Chem Lab C01", "Physics Lab C02", "Bio Lab C03"],
  },
  {
    name: "Block D — Classrooms",
    description:
      "Standard tutorial and classroom spaces across three floors.",
    icon: Building2,
    issueCount: 17,
    areas: ["Rooms D101-D312"],
  },
  {
    name: "Library",
    description:
      "Main campus library with study areas, discussion rooms, and a multimedia zone.",
    icon: Library,
    issueCount: 5,
    areas: [
      "Level 1 — Open Study",
      "Level 2 — Quiet Zone",
      "Level 3 — Discussion Rooms",
    ],
  },
  {
    name: "Sports Complex",
    description:
      "Indoor gymnasium, outdoor courts, swimming pool, and changing rooms.",
    icon: Dumbbell,
    issueCount: 9,
    areas: ["Gym", "Basketball Court", "Pool Area", "Changing Rooms"],
  },
  {
    name: "Canteen & Food Court",
    description:
      "Central dining area with multiple food stalls, seating for 500, and vending machines.",
    icon: Utensils,
    issueCount: 14,
    areas: ["Food Court", "Vending Corridor", "Outdoor Seating"],
  },
  {
    name: "Outdoor & Common Areas",
    description:
      "Walkways, gardens, benches, notice boards, and open-air corridors around campus.",
    icon: Trees,
    issueCount: 19,
    areas: ["Garden Walk", "Central Plaza", "Covered Walkways", "Car Park"],
  },
];

function LocationsPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Campus Locations
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse the different areas across campus. Each location may have
          reported asset issues that the maintenance team is tracking.
        </p>
      </div>

      {/* Location Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {locations.map((loc) => (
          <Card
            key={loc.name}
            className="transition-shadow hover:shadow-md"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <loc.icon className="size-5" />
                </div>
                <Badge variant="secondary">
                  {loc.issueCount} open{" "}
                  {loc.issueCount === 1 ? "issue" : "issues"}
                </Badge>
              </div>
              <CardTitle className="text-lg">{loc.name}</CardTitle>
              <CardDescription>{loc.description}</CardDescription>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {loc.areas.map((area) => (
                  <Badge
                    key={area}
                    variant="outline"
                    className="text-xs font-normal"
                  >
                    {area}
                  </Badge>
                ))}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default LocationsPage;