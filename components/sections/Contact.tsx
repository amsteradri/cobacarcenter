"use client";
import React from 'react';

export const Contact = () => {
    return (
        <section className="relative w-full py-20 bg-black text-white overflow-hidden border-t border-white/10" id="contact">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
                
                <div className="flex flex-col justify-center space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">
                        ¿Listo para el <br/> <span className="text-coba-yellow">Cambio?</span>
                    </h2>
                    
                    <div className="space-y-6 text-lg font-light text-neutral-300">
                        <div className="flex items-center gap-4 group">
                             <span className="text-2xl group-hover:scale-125 transition-transform duration-300">🚘</span>
                             <p>Limpieza de vehículos y servicios</p>
                        </div>
                        <div className="flex items-center gap-4 group">
                             <span className="text-2xl group-hover:scale-125 transition-transform duration-300">📍</span>
                             <p>Solsona, Carrer Pere Màrtir Colomés, 5</p>
                        </div>
                        <div className="flex items-center gap-4 group">
                             <span className="text-2xl group-hover:scale-125 transition-transform duration-300">🧼</span>
                             <p>Venta de productos especializados</p>
                        </div>
                        <div className="flex items-center gap-4 group">
                             <span className="text-2xl group-hover:scale-125 transition-transform duration-300">📞</span>
                             <div>
                                <p className="text-sm text-neutral-500 uppercase tracking-widest mb-1">Pide cita o presupuesto</p>
                                <a href="tel:+34611501795" className="text-2xl font-bold text-white hover:text-coba-yellow transition-colors">611 501 795</a>
                             </div>
                        </div>
                    </div>

                    <div className="pt-8 flex flex-col items-start gap-4">
                        <a 
                            href="https://www.instagram.com/cobacarcenter/" 
                            target="_blank"
                            className="inline-flex h-12 w-full md:w-auto animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#FFD700,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 uppercase tracking-widest hover:scale-105 duration-300"
                        >
                            Contactar por Instagram
                        </a>
                        <p className="text-sm text-neutral-500">
                             Llámanos o escríbenos para agendar tu cita.
                        </p>
                    </div>
                </div>

                <div className="min-h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2963.766373753733!2d1.5146524765660882!3d41.99026336306564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a5db39d9154743%3A0xe54c15392d525717!2sCarrer%20Pere%20M%C3%A0rtir%20Colom%C3%A9s%2C%205%2C%2025280%20Solsona%2C%20Lleida!5e0!3m2!1ses!2ses!4v1709489241031!5m2!1ses!2ses" 
                        width="100%" 
                        height="100%" 
                        style={{border:0, minHeight: "400px"}} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                    ></iframe>
                </div>

            </div>
        </section>
    );
};