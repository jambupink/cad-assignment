// src/pages/IssuesListPage.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Plus,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchIssues, type Issue } from "@/lib/api";

type Category = "Furniture" | "Electrical" | "Safety" | "Cleanliness";
type Status = "New" | "In Progress" | "Resolved";

const categoryIcons: Record<Category, typeof Armchair> = {
  Furniture: Armchair,
  Electrical: Zap,
  Safety: ShieldAlert,
  Cleanliness: Sparkles,
};

const statusStyles: Record<Status, string> = {
  New: "bg-amber-500/15 text-amber-700 border-amber-200",
  "In Progress": "bg-blue-500/15 text-blue-700 border-blue-200",
  Resolved:
    "bg-emerald-500/15 text-emerald-700 border-emerald-200",
};

function IssuesListPage() {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchIssues(categoryFilter, statusFilter)
      .then(setIssues)
      .catch(() => setError("Failed to load issues."))
      .finally(() => setLoading(false));
  }, [categoryFilter, statusFilter]);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Reported Issues
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse all asset issues reported across campus.
          </p>
        </div>
        <Button asChild>
          <Link to="/report">
            <Plus className="mr-1 size-4" />
            Report Issue
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select
          value={categoryFilter}
          onValueChange={setCategoryFilter}
        >
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

        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
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
          {!loading && `Showing ${issues.length} issues`}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="py-12 text-center text-destructive">
          {error}
        </div>
      )}

      {/* Issues Grid */}
      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2">
          {issues.map((issue) => {
            const Icon =
              categoryIcons[issue.category as Category] ?? Armchair;
            const styles =
              statusStyles[issue.status as Status] ??
              statusStyles["New"];

            return (
              <Card
                key={issue.issueId}
                className="overflow-hidden pt-0 transition-shadow hover:shadow-md"
              >
                <img
                  src={issue.imageUrl}
                  alt={issue.title}
                  className="h-40 w-full object-cover"
                />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="gap-1 text-xs"
                    >
                      <Icon className="size-3" />
                      {issue.category}
                    </Badge>
                    <Badge
                      className={`border text-xs ${styles}`}
                    >
                      {issue.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">
                    {issue.title}
                  </CardTitle>
                  <CardDescription>
                    {issue.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-3" />
                    {issue.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="size-3" />
                    {new Date(issue.reportedAt).toLocaleDateString()}
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground/60">
                    {issue.issueId}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {!loading && !error && issues.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-12 text-center text-muted-foreground">
          <p>No issues found.</p>
          <Button asChild variant="outline">
            <Link to="/report">Report the first issue</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default IssuesListPage;