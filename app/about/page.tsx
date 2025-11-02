import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Shield, Clock, CheckCircle } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | howtodelete.me",
  description: "Learn about howtodelete.me and our mission to help you take control of your online presence.",
}

export default function AboutPage() {
  return (
    <div className="max-w-[1280px] mx-auto">
      <BreadcrumbNav customItems={[{ label: "About" }]} />
      <div className="px-4 pb-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">About howtodelete.me</h1>
            <p className="text-xl text-muted-foreground">
              We believe you should have full control over your online presence and the right to leave any platform
              whenever you choose.
            </p>
          </div>

          <div className="prose prose-sm max-w-none">
            <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              howtodelete.me provides clear, verified instructions for permanently deleting accounts from thousands of
              websites and services. We make it easy to find the information you need without the hassle of searching
              through help pages or dealing with dark patterns designed to keep you on platforms.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Why We Built This</h2>
            <p className="text-muted-foreground">
              Many companies make it deliberately difficult to delete your account. They hide deletion options, require
              multiple steps, or force you to contact support. We cut through the confusion by providing direct links and
              clear instructions for every service.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 mt-8">
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Verified Sources</CardTitle>
                <CardDescription>Every guide links directly to official help pages and deletion forms</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Always Updated</CardTitle>
                <CardDescription>We regularly check and update our guides to ensure accuracy</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-primary mb-2" />
                <CardTitle>No Tracking</CardTitle>
                <CardDescription>We don't collect your data or track your browsing behavior</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>How We Rate Difficulty</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-emerald-700">Easy</h3>
                <p className="text-sm text-muted-foreground">
                  Simple, straightforward process. Usually just a few clicks in account settings.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-amber-700">Medium</h3>
                <p className="text-sm text-muted-foreground">
                  Requires a few extra steps like email verification or waiting periods.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-rose-700">Hard</h3>
                <p className="text-sm text-muted-foreground">
                  Complex process that may require contacting support or multiple verification steps.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-purple-700">Limited</h3>
                <p className="text-sm text-muted-foreground">
                  Account deletion is restricted or only available in certain regions due to legal or policy constraints.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-slate-900">Impossible</h3>
                <p className="text-sm text-muted-foreground">
                  Cannot be easily deleted through normal means. May require legal action or is intentionally blocked.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-sm max-w-none mt-8">
            <h2 className="text-2xl font-bold mb-4">Data Sources</h2>
            <p className="text-muted-foreground">
              Our guides are compiled from official company documentation, help centers, and verified community sources.
              We prioritize accuracy and regularly update our database to reflect changes in deletion processes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
