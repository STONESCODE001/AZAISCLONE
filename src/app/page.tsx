export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header Section */}
        <header className="space-y-4">
          <p className="font-mono text-sm text-on-surface-variant uppercase tracking-wider">
            Step 01 // Foundation
          </p>
          <h1 className="font-sans text-4xl md:text-6xl font-bold tracking-tight text-on-background">
            Cinematic AI Dark Mode
          </h1>
          <p className="font-sans text-lg text-on-surface-variant max-w-2xl">
            This is a verification page to test typography, color tokens, and border radii mapping from the design system.
          </p>
        </header>

        {/* Test Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Surface Test Card */}
          <div className="bg-surface rounded-2xl p-8 border border-outline-variant/30 flex flex-col items-start gap-6">
            <div className="space-y-2">
              <h2 className="font-sans text-xl font-semibold text-on-surface">Surface Card</h2>
              <p className="font-sans text-on-surface-variant">
                Uses var(--surface) background and fully rounded components.
              </p>
            </div>
            
            {/* Primary Pill Button */}
            <button className="bg-primary text-primary-foreground font-sans font-medium px-6 py-3 rounded-full hover:opacity-90 transition-opacity">
              Primary Action
            </button>
          </div>

          {/* Surface Container Test Card */}
          <div className="bg-surface-container rounded-2xl p-8 border border-outline-variant/30 flex flex-col items-start gap-6">
            <div className="space-y-2">
              <h2 className="font-sans text-xl font-semibold text-on-surface">Container Card</h2>
              <p className="font-sans text-on-surface-variant">
                A slightly elevated surface container using var(--surface-container).
              </p>
            </div>
            
            {/* Secondary Pill Button */}
            <button className="bg-secondary text-secondary-foreground font-sans font-medium px-6 py-3 rounded-full hover:opacity-90 transition-opacity">
              Secondary Action
            </button>
          </div>

        </div>

      </div>
    </main>
  );
}
