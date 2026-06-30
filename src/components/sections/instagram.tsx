"use client";

import { SmartImage } from "@/components/ui/smart-image";
import { motion } from "framer-motion";
import { Camera, Heart } from "lucide-react";
import { instagramPosts } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";

const ratioClass: Record<string, string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
};

export function InstagramGallery() {
  return (
    <section id="instagram" className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="@maison.studio"
            title={
              <>
                Worn in the <span className="text-muted">wild</span>
              </>
            }
          />
          <a
            href="#"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--ring)] px-5 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background md:self-auto"
          >
            <Camera className="h-4 w-4" />
            Follow us
          </a>
        </div>

        <div className="mt-14 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {instagramPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href="#"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 0.7,
                delay: (i % 4) * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative block w-full break-inside-avoid overflow-hidden rounded-glass border border-[var(--glass-border)] ${ratioClass[post.ratio]}`}
            >
              <SmartImage
                src={post.image}
                alt="Instagram post"
                fill
                sizes="(max-width:768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100">
                <span className="flex items-center gap-2 text-white">
                  <Heart className="h-5 w-5 fill-white" />
                  <span className="font-medium">
                    {post.likes.toLocaleString()}
                  </span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
