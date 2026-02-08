import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Who can report an issue?",
    a: "Anyone on campus — students, staff, and visitors — can submit an issue report through the website.",
  },
  {
    q: "What kind of issues should I report?",
    a: 'Anything that affects campus facilities: broken furniture, faulty lights, damaged equipment, cleanliness problems, graffiti, or safety hazards.',
  },
  {
    q: "How quickly will my issue be resolved?",
    a: "Safety issues are prioritised and addressed within 24 hours. Other issues are typically resolved within 3-5 working days depending on complexity.",
  },
  {
    q: "Can I track the status of my report?",
    a: 'Yes. Each report has a status (New, In Progress, Resolved) visible on the Issues page.',
  },
];

function ContactPage() {
  return (
    <div className="flex flex-col gap-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Contact &amp; Help
        </h1>
        <p className="mt-2 text-muted-foreground">
          Need assistance? Reach out to the Facilities Management team or
          browse the FAQs below.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <Mail className="size-5 text-primary" />
            <CardTitle className="text-base">Email</CardTitle>
            <CardDescription>
              facilities@nyp.edu.sg
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Phone className="size-5 text-primary" />
            <CardTitle className="text-base">Phone</CardTitle>
            <CardDescription>+65 6451 5115</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <MapPin className="size-5 text-primary" />
            <CardTitle className="text-base">Office</CardTitle>
            <CardDescription>
              Block T, Level 1, Room T01-03
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Operating Hours */}
      <Card className="max-w-md">
        <CardHeader>
          <Clock className="size-5 text-primary" />
          <CardTitle className="text-base">Operating Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm text-muted-foreground">
          <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
          <p>Saturday: 8:00 AM - 1:00 PM</p>
          <p>Sunday &amp; Public Holidays: Closed</p>
          <p className="pt-2 text-xs">
            For urgent safety issues outside office hours, call campus
            security at <strong className="text-foreground">+65 6451 5999</strong>.
          </p>
        </CardContent>
      </Card>

      {/* FAQ */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="size-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {faqs.map((faq) => (
            <Card key={faq.q}>
              <CardHeader>
                <CardTitle className="text-base">{faq.q}</CardTitle>
                <CardDescription>{faq.a}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Emergency CTA */}
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
        <h3 className="text-lg font-semibold">
          Spotted an urgent safety hazard?
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          If there is an immediate risk to health or safety, contact campus
          security directly.
        </p>
        <Button variant="destructive" className="mt-4">
          <Phone className="mr-1 size-4" />
          Call Security: +65 6451 5999
        </Button>
      </div>
    </div>
  );
}

export default ContactPage;