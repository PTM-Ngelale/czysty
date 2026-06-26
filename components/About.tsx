"use client";

import Image from "next/image";

const stats = [
  { value: "2.9M+", label: "Items Laundered" },
  { value: "4.9★", label: "Average Rating" },
  { value: "24 hrs", label: "Avg Turnaround" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-white overflow-hidden py-16 lg:py-36"
    >
      {/* Ghost section number */}
      <div
        className="absolute top-0 right-0 select-none pointer-events-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-display font-extrabold text-czysty-green/[0.06] leading-none block"
          style={{ fontSize: "clamp(100px, 22vw, 280px)" }}
        >
          01
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left */}
          <div className="reveal-left">
            <div className="section-tag">Who We Are</div>
            <h2
              className="display-heading mb-6"
              style={{
                fontSize: "clamp(1.2rem, 5.5vw, 4rem)",
                color: "#09100A",
              }}
            >
              WE HANDLE THE MESS.
              <br />
              <span className="text-czysty-green">YOU ENJOY THE REST.</span>
            </h2>

            {/* Pull quote */}
            <div className="border-l-2 border-czysty-red pl-5 mb-7">
              <p className="font-body text-czysty-black/70 text-[15px] leading-relaxed italic">
                &ldquo;Laundry piling up? House looking tired? We&apos;ve got
                it covered.&rdquo;
              </p>
            </div>

            <p className="font-body text-czysty-black/55 text-[15px] leading-relaxed mb-3">
              At Czysty, we&apos;re on a mission to give Port Harcourt residents
              something they never seem to have enough of: time. Whether it&apos;s
              laundry, dry cleaning, home cleaning, or office cleaning, our team
              shows up ready to work so you don&apos;t have to spend your evenings
              washing, scrubbing, ironing, or stressing.
            </p>
            <p className="font-body text-czysty-black/55 text-[15px] leading-relaxed mb-3">
              We pick up, clean up, and deliver back freshness with professional
              equipment, reliable staff, and a commitment to getting it right
              every single time.
            </p>
            <p className="font-body text-czysty-black/55 text-[15px] leading-relaxed mb-10">
              Because weekends should be for resting, family, football, movies,
              outings, side hustles, or absolutely nothing at all. You live your
              best. We handle the rest.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-px bg-czysty-green/12">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white px-2 sm:px-4 py-4 sm:py-5 text-center"
                >
                  <p
                    className="font-display font-extrabold text-czysty-green mb-1"
                    style={{ fontSize: "clamp(1.1rem, 3.5vw, 2.2rem)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-body text-[9px] sm:text-[10px] text-czysty-muted uppercase tracking-widest">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image frame */}
          <div className="reveal-right">
            <div className="relative">
              {/* Offset decorative frame */}
              <div className="absolute -top-4 -left-4 right-4 bottom-4 border border-czysty-green/20 pointer-events-none" />

              {/* Image area */}
              {/* <div className="relative aspect-[3/4] overflow-hidden bg-czysty-cream border border-czysty-green/15"> */}
              <div
                className={`group relative aspect-square overflow-hidden bg-czysty-cream border border-czysty-green/10 hover:border-czysty-green/35 transition-all duration-500 cursor-pointer shadow-sm `}
              >
                <Image
                  src="/images/cleaning-crew.png"
                  alt="Czysty Cleaners team"
                  fill
                  className={`object-cover object-top transition-transform duration-700 group-hover:scale-105`}
                  // className="object-cover object-center"
                  // sizes="(max-width: 1024px) 100vw, 50vw"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                {/* </div> */}
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-czysty-green z-10" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-czysty-green z-10" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-czysty-green z-10" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-czysty-green z-10" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-czysty-green px-5 py-4 shadow-[0_8px_30px_rgba(26,92,40,0.25)]">
                <p className="font-display font-extrabold text-czysty-cream text-2xl">
                  2.9M+
                </p>
                <p className="font-body text-czysty-cream/70 text-[11px] uppercase tracking-widest mt-0.5">
                  Items Laundered
                </p>
              </div>

              {/* Red dot accent */}
              <div className="absolute top-5 right-5 w-3 h-3 rounded-full bg-czysty-red" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
