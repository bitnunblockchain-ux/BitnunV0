import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Cookie Policy</h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-8">Last updated: December 2024</p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">What Are Cookies</h2>
                <p className="text-muted-foreground">
                  Cookies are small text files that are stored on your device when you visit our website. They help us
                  provide you with a better experience by remembering your preferences and improving our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Cookies</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Essential cookies for website functionality</li>
                  <li>Analytics cookies to understand user behavior</li>
                  <li>Preference cookies to remember your settings</li>
                  <li>Security cookies to protect your account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Managing Cookies</h2>
                <p className="text-muted-foreground">
                  You can control and manage cookies through your browser settings. Please note that disabling certain
                  cookies may affect the functionality of our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about our cookie policy, please contact us at{" "}
                  <span className="text-primary font-semibold">privacy@bitnun.org</span>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
