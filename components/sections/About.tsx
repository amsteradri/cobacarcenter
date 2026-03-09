"use client";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export function About() {
  const team = [
    {
      name: "Sergi Barragan",
      role: "Co-Founder Coba",
      image: "/sergi.png",
      instagram: "https://www.instagram.com/sergi.barragan/" 
    },
    {
      name: "Oriol Collado",
      role: "Co-Founder Coba",
      image: "/oriol.jpg", 
      instagram: "https://www.instagram.com/oriiiiol/"
    }
  ];

  return (
    <section id="about" className="py-20 w-full bg-neutral-950 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />

      <h2 className="text-center text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-10">
        SOBRE <span className="text-[#FFD700]">NOSOTROS</span>
      </h2>
      
      <div className="flex flex-wrap justify-center gap-10 px-4">
        {team.map((member, idx) => (
          <CardContainer key={idx} className="inter-var">
            <CardBody className="bg-neutral-900 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-[#FFD700]/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {member.name}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-[#FFD700] text-sm max-w-sm mt-2 font-semibold uppercase tracking-widest"
              >
                {member.role}
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                {/* Image Placeholder */}
                <div className="h-96 w-full object-cover rounded-xl group-hover/card:shadow-xl bg-neutral-800 overflow-hidden relative">
                    <img 
                        src={member.image} 
                        alt={member.name}
                        className="h-full w-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-500"
                    />
                </div>
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem
                  translateZ={20}
                  as="a"
                  href={member.instagram}
                  target="__blank"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white hover:text-[#FFD700] transition-colors"
                >
                  Seguir en Instagram →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-[#FFD700] dark:text-black text-white text-xs font-bold hover:scale-105 transition-transform"
                >
                  Contactar
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </section>
  );
}
