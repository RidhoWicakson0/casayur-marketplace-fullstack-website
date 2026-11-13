import type { CSSProperties, ReactNode } from 'react'

type Testimonial = {
  id: string
  quote: string
  authorName: string
  authorTitle: string
  avatarUrl: string
}

type TestimonialRow = {
  id: string
  speed: string
  direction: 'left' | 'right'
  testimonials: Testimonial[]
}

type TestimonialsData = {
  title: string
  subtitle: string
  rows: TestimonialRow[]
}

type ScrollStyle = CSSProperties & { '--scroll-duration': string }

export function TestimonialCard({ quote, authorName, authorTitle, avatarUrl }: Testimonial) {
  return (
    <article className="flex w-[min(82vw,24rem)] shrink-0 flex-col gap-4 rounded-2xl border border-[--line] bg-[--surface] p-6 text-left shadow-sm">
      <p className="text-base leading-relaxed text-[--ink]">“{quote}”</p>
      <div className="mt-auto flex items-center gap-3">
        <img src={avatarUrl} alt="" className="h-11 w-11 rounded-full bg-[--paper] object-cover" />
        <div>
          <h3 className="text-sm font-semibold text-[--ink]">{authorName}</h3>
          <p className="text-xs text-[--muted-ink]">{authorTitle}</p>
        </div>
      </div>
    </article>
  )
}

export function HorizontalScroller({ children, speed = '40s', direction = 'left' }: { children: ReactNode; speed?: string; direction?: 'left' | 'right' }) {
  const animationClass = direction === 'right' ? 'animate-scroll-horizontal-reverse' : 'animate-scroll-horizontal'
  const style: ScrollStyle = { '--scroll-duration': speed }

  return (
    <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className={`flex w-max ${animationClass} motion-reduce:!animate-none`} style={style}>
        <div className="flex items-stretch gap-5 px-2">{children}</div>
        <div className="flex items-stretch gap-5 px-2" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}

export default function TestimonialsSection({ data }: { data: TestimonialsData }) {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-[--ink] sm:text-4xl">{data.title}</h2>
        <p className="mt-3 text-base leading-relaxed text-[--muted-ink]">{data.subtitle}</p>
      </div>
      <div className="flex w-full flex-col gap-5">
        {data.rows.map((row) => (
          <HorizontalScroller key={row.id} speed={row.speed} direction={row.direction}>
            {row.testimonials.map((testimonial) => <TestimonialCard key={testimonial.id} {...testimonial} />)}
          </HorizontalScroller>
        ))}
      </div>
    </div>
  )
}
