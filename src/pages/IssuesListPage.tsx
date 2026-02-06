// src/pages/IssuesListPage.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Armchair,
  Zap,
  ShieldAlert,
  Sparkles,
  MapPin,
  Calendar,
} from "lucide-react";
import { useState } from "react";

type Status = "New" | "In Progress" | "Resolved";
type Category = "Furniture" | "Electrical" | "Safety" | "Cleanliness";

interface Issue {
  id: string;
  title: string;
  description: string;
  category: Category;
  location: string;
  status: Status;
  date: string;
  image: string;
}

const sampleIssues: Issue[] = [
  {
    id: "ISS-001",
    title: "Broken chair in LT1",
    description:
      "One of the folding seats in row 5 is snapped off its hinge. Potentially unsafe for students.",
    category: "Furniture",
    location: "Block A — Lecture Halls",
    status: "New",
    date: "2026-02-04",
    image:
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=400&h=250&fit=crop",
  },
  {
    id: "ISS-002",
    title: "Flickering lights in Lab B03",
    description:
      "Two fluorescent tubes in the back row flicker constantly, causing eye strain during long lab sessions.",
    category: "Electrical",
    location: "Block B — IT Labs",
    status: "In Progress",
    date: "2026-02-01",
    image:
      "https://images.unsplash.com/photo-1558759340-697881f4aa7b?w=400&h=250&fit=crop",
  },
  {
    id: "ISS-003",
    title: "Graffiti on Level 2 wall",
    description:
      "Spray-painted graffiti found on the stairwell wall between Level 2 and Level 3.",
    category: "Cleanliness",
    location: "Library",
    status: "Resolved",
    date: "2026-01-28",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=250&fit=crop",
  },
  {
    id: "ISS-004",
    title: "Loose railing near Central Plaza",
    description:
      "The metal railing along the steps to Central Plaza is loose and wobbles when touched.",
    category: "Safety",
    location: "Outdoor & Common Areas",
    status: "In Progress",
    date: "2026-02-03",
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=400&h=250&fit=crop",
  },
  {
    id: "ISS-005",
    title: "Damaged desk in Room D205",
    description:
      "A desk has a cracked tabletop with a sharp edge exposed. Needs replacement.",
    category: "Furniture",
    location: "Block D — Classrooms",
    status: "New",
    date: "2026-02-05",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=250&fit=crop",
  },
  {
    id: "ISS-006",
    title: "Power outlet not working in Gym",
    description:
      "The power outlet near the treadmill section is completely dead. Staff unable to use equipment.",
    category: "Electrical",
    location: "Sports Complex",
    status: "New",
    date: "2026-02-06",
    image:
      "https://plus.unsplash.com/premium_photo-1681589433923-33ea0898397f?w=400&h=250&fit=crop",
  },
  {
    id: "ISS-007",
    title: "Spill stain on Food Court floor",
    description:
      "Large sticky stain near Stall 4. Floor is slippery and poses a slip hazard.",
    category: "Cleanliness",
    location: "Canteen & Food Court",
    status: "Resolved",
    date: "2026-01-30",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=250&fit=crop",
  },
  {
    id: "ISS-008",
    title: "Fire extinguisher missing from bracket",
    description:
      "The fire extinguisher in corridor C02 is missing from its wall bracket. Needs urgent replacement.",
    category: "Safety",
    location: "Block C — Science Labs",
    status: "In Progress",
    date: "2026-02-02",
    image:
      "https://images.unsplash.com/photo-1585585825759-979ec75438cc?w=400&h=250&fit=crop",
  },
];

const categoryIcons: Record<Category, typeof Armchair> = {
  Furniture: Armchair,
  Electrical: Zap,
  Safety: ShieldAlert,
  Cleanliness: Sparkles,
};

const statusStyles: Record<Status, string> = {
  New: "bg-amber-500/15 text-amber-700 border-amber-200",
  "In Progress": "bg-blue-500/15 text-blue-700 border-blue-200",
  Resolved: "bg-emerald-500/15 text-emerald-700 border-emerald-200",
};

function IssuesListPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = sampleIssues.filter((issue) => {
    const matchCategory =
      categoryFilter === "all" || issue.category === categoryFilter;
    const matchStatus =
      statusFilter === "all" || issue.status === statusFilter;
    return matchCategory && matchStatus;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Reported Issues
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse all asset issues reported across campus. Use the filters to
          narrow down by category or status.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Furniture">Furniture</SelectItem>
              <SelectItem value="Electrical">Electrical</SelectItem>
              <SelectItem value="Safety">Safety</SelectItem>
              <SelectItem value="Cleanliness">Cleanliness</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex items-center text-sm text-muted-foreground">
          Showing {filtered.length} of {sampleIssues.length} issues
        </div>
      </div>

      {/* Issues Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((issue) => {
          const Icon = categoryIcons[issue.category];
          return (
            <Card
              key={issue.id}
              className="overflow-hidden pt-0 transition-shadow hover:shadow-md"
            >
              <img
                src={issue.image}
                alt={issue.title}
                className="h-40 w-full object-cover"
              />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="gap-1 text-xs">
                    <Icon className="size-3" />
                    {issue.category}
                  </Badge>
                  <Badge
                    className={`border text-xs ${statusStyles[issue.status]}`}
                  >
                    {issue.status}
                  </Badge>
                </div>
                <CardTitle className="text-base">{issue.title}</CardTitle>
                <CardDescription>{issue.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-3" />
                  {issue.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3" />
                  {issue.date}
                </div>
                <div className="font-mono text-[10px] text-muted-foreground/60">
                  {issue.id}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          No issues match your current filters.
        </div>
      )}
    </div>
  );
}

export default IssuesListPage;