import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import {
  Upload,
  Loader2,
  CheckCircle2,
  ImagePlus,
  Sparkles,
  ScanSearch,
  Tag,
  Type,
} from "lucide-react";
import {
  getUploadUrl,
  uploadFileToS3,
  createIssue,
  analyzeImage,
  type AnalysisResult,
} from "@/lib/api";

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

  // AI analysis state
  const [imageKey, setImageKey] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  async function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setAnalysis(null);
    setImageKey(null);

    if (selected) {
      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selected);

      // Upload immediately so Rekognition can access it
      try {
        setUploadingImage(true);
        const { uploadUrl, key } = await getUploadUrl(
          selected.name,
          selected.type
        );
        await uploadFileToS3(uploadUrl, selected);
        setImageKey(key);

        // Auto-trigger AI analysis
        setAnalyzing(true);
        const result = await analyzeImage(key);
        setAnalysis(result);

        // Auto-fill suggested category if user hasn't selected one
        if (result.suggestedCategory && !category) {
          setCategory(result.suggestedCategory);
        }
      } catch (err) {
        console.error("Upload/analysis error:", err);
      } finally {
        setUploadingImage(false);
        setAnalyzing(false);
      }
    } else {
      setPreview(null);
    }
  }

  function applySuggestedCategory(suggested: string) {
    setCategory(suggested);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!imageKey || !category || !location) return;

    setSubmitting(true);
    setError(null);

    try {
      // Image already uploaded during file selection,
      // just create the issue record
      await createIssue({
        title,
        description,
        category,
        location,
        imageKey,
        detectedLabels: analysis?.labels,
        detectedText: analysis?.detectedText,
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
          The maintenance team has been notified. Redirecting…
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
          Spotted a damaged asset or facility problem? Upload a photo and
          our AI will help classify it.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main form */}
        <Card>
          <CardHeader>
            <CardTitle>Issue Details</CardTitle>
            <CardDescription>
              All fields are required. Upload a photo first — our AI will
              suggest a category.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              {/* Image Upload — moved to top */}
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
                {(uploadingImage || analyzing) && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="size-4 animate-spin" />
                    {uploadingImage
                      ? "Uploading image…"
                      : "Analyzing image with AI…"}
                  </div>
                )}
              </div>

              {/* AI Suggestion Banner */}
              {analysis?.suggestedCategory && (
                <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <Sparkles className="size-5 text-primary" />
                  <div className="flex-1 text-sm">
                    <span className="font-medium">AI Suggestion:</span>{" "}
                    This looks like a{" "}
                    <strong>{analysis.suggestedCategory}</strong> issue.
                  </div>
                  {category !== analysis.suggestedCategory && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        applySuggestedCategory(
                          analysis.suggestedCategory!
                        )
                      }
                    >
                      Apply
                    </Button>
                  )}
                  {category === analysis.suggestedCategory && (
                    <Badge variant="secondary">Applied</Badge>
                  )}
                </div>
              )}

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
                    {analysis?.suggestedCategory && (
                      <span className="ml-1 text-xs font-normal text-primary">
                        (AI assisted)
                      </span>
                    )}
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
                            {c === analysis?.suggestedCategory && " ✨"}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Location</label>
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

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              {/* Submit */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={submitting || !imageKey}
                >
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

        {/* AI Analysis Sidebar */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ScanSearch className="size-5 text-primary" />
                <CardTitle className="text-base">
                  AI Image Analysis
                </CardTitle>
              </div>
              <CardDescription>
                {analysis
                  ? "Objects and text detected in your image."
                  : "Upload a photo to see AI analysis results."}
              </CardDescription>
            </CardHeader>
            {analysis && (
              <CardContent className="flex flex-col gap-4">
                {/* Detected Labels */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <Tag className="size-3" />
                    Detected Objects
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.labels.map((label) => (
                      <Badge
                        key={label.name}
                        variant="outline"
                        className="text-xs font-normal"
                      >
                        {label.name}
                        <span className="ml-1 text-muted-foreground">
                          {label.confidence}%
                        </span>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Detected Text */}
                {analysis.detectedText.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Type className="size-3" />
                      Detected Text
                    </div>
                    <div className="flex flex-col gap-1">
                      {analysis.detectedText.map((t, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-md bg-muted px-2 py-1 text-xs"
                        >
                          <span className="font-mono">
                            {t.text}
                          </span>
                          <span className="text-muted-foreground">
                            {t.confidence}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            )}

            {analyzing && (
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  Analyzing…
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ReportIssuePage;