import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Loader2, CheckCircle2, ImagePlus } from "lucide-react";
import { getUploadUrl, uploadFileToS3, createIssue } from "@/lib/api";

const categories = ["Furniture", "Electrical", "Safety", "Cleanliness"];

const locations = [
  "Block A — Lecture Halls",
  "Block B — IT Labs",
  "Block C — Science Labs",
  "Block D — Classrooms",
  "Library",
  "Sports Complex",
  "Canteen & Food Court",
  "Outdoor & Common Areas",
];

function ReportIssuePage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    if (selected) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selected);
    } else {
      setPreview(null);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file || !category || !location) return;

    setSubmitting(true);
    setError(null);

    try {
      // 1. Get presigned upload URL
      const { uploadUrl, key } = await getUploadUrl(
        file.name,
        file.type
      );

      // 2. Upload image directly to S3
      await uploadFileToS3(uploadUrl, file);

      // 3. Save issue record to DynamoDB
      await createIssue({
        title,
        description,
        category,
        location,
        imageKey: key,
      });

      setSuccess(true);
      setTimeout(() => navigate("/issues"), 1500);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <CheckCircle2 className="size-12 text-emerald-500" />
        <h2 className="text-2xl font-bold">Issue Reported!</h2>
        <p className="text-muted-foreground">
          Redirecting you to the issues list…
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Report an Issue
        </h1>
        <p className="mt-2 text-muted-foreground">
          Spotted a damaged asset or facility problem? Fill in the form
          below and upload a photo.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Issue Details</CardTitle>
          <CardDescription>
            All fields are required. Your report will be reviewed by the
            maintenance team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="title"
                className="text-sm font-medium"
              >
                Title
              </label>
              <Input
                id="title"
                placeholder="e.g. Broken chair in LT1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Category & Location */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  Category
                </label>
                <Select
                  value={category}
                  onValueChange={setCategory}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  Location
                </label>
                <Select
                  value={location}
                  onValueChange={setLocation}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {locations.map((l) => (
                        <SelectItem key={l} value={l}>
                          {l}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="description"
                className="text-sm font-medium"
              >
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Describe the issue in detail…"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Image Upload */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                Photo of Issue
              </label>
              <label
                htmlFor="image-upload"
                className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border p-6 text-center transition-colors hover:border-primary/50 hover:bg-muted/50"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-48 rounded-md object-contain"
                  />
                ) : (
                  <>
                    <ImagePlus className="size-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Click to select an image
                    </span>
                  </>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  required
                />
              </label>
              {file && (
                <p className="text-xs text-muted-foreground">
                  {file.name} ({(file.size / 1024).toFixed(0)} KB)
                </p>
              )}
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            {/* Submit */}
            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-1 size-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <Upload className="mr-1 size-4" />
                    Submit Report
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/issues")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReportIssuePage;