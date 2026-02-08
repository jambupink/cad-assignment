const API_BASE =
  "https://pbxye9l79b.execute-api.ap-southeast-1.amazonaws.com/prod";

export interface Issue {
  issueId: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: string;
  imageKey: string;
  imageUrl: string;
  reportedAt: string;
  detectedLabels?: DetectedLabel[];
  detectedText?: DetectedText[];
}

export interface DetectedLabel {
  name: string;
  confidence: number;
}

export interface DetectedText {
  text: string;
  confidence: number;
}

export interface AnalysisResult {
  labels: DetectedLabel[];
  detectedText: DetectedText[];
  suggestedCategory: string | null;
}


export async function getUploadUrl(
  fileName: string,
  fileType: string
): Promise<{ uploadUrl: string; key: string }> {
  const res = await fetch(`${API_BASE}/upload-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName, fileType }),
  });
  if (!res.ok) throw new Error("Failed to get upload URL");
  return res.json();
}

export async function uploadFileToS3(
  url: string,
  file: File
): Promise<void> {
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!res.ok) throw new Error("Failed to upload image");
}

export async function createIssue(data: {
  title: string;
  description: string;
  category: string;
  location: string;
  imageKey: string;
  detectedLabels?: DetectedLabel[];
  detectedText?: DetectedText[];
}): Promise<Issue> {
  const res = await fetch(`${API_BASE}/issues`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create issue");
  return res.json();
}

export async function fetchIssues(
  category?: string,
  status?: string
): Promise<Issue[]> {
  const params = new URLSearchParams();
  if (category && category !== "all") params.set("category", category);
  if (status && status !== "all") params.set("status", status);

  const query = params.toString();
  const url = `${API_BASE}/issues${query ? `?${query}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch issues");
  return res.json();
}

export async function analyzeImage(
  imageKey: string
): Promise<AnalysisResult> {
  const res = await fetch(`${API_BASE}/analyze-image`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageKey }),
  });
  if (!res.ok) throw new Error("Failed to analyze image");
  return res.json();
}

export async function subscribeNotifications(
  email: string
): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Failed to subscribe");
  return res.json();
}

export async function updateIssueStatus(
  issueId: string,
  status: string
): Promise<Issue> {
  const res = await fetch(`${API_BASE}/issues/${issueId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ issueId, status }),
  });
  if (!res.ok) throw new Error("Failed to update issue status");
  return res.json();
}