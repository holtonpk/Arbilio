"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { useSpring } from "react-spring";
import useIntersectionObserver from "@/lib/hooks/use-intersection-observer";

export default function GlobeClient() {
  const divRef = useRef<any>();
  const entry = useIntersectionObserver(divRef, {});
  const isVisible = !!entry?.isIntersecting;
  const [showGlobe, setShowGlobe] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowGlobe(true);
    } else {
      setShowGlobe(false);
    }
  }, [isVisible]);

  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = window.document.createElement("canvas");
      const ctx =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      (ctx as any).getSupportedExtensions();
    } catch (e) {
      // WebGL isn't properly supported
      setWebglSupported(false);
      console.log("WebGL not supported, hiding globe animation...");
      return;
    }
  }, []);

  return (
    <div
      ref={divRef}
      className={`${
        webglSupported ? "min-h-[500px] sm:min-h-[1000px]" : "min-h-[50px]"
      } h-full`}
    >
      {webglSupported && showGlobe && <GlobeAnimation />}
    </div>
  );
}

const GlobeAnimation = () => {
  const canvasRef = useRef<any>();
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 60,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    let phi = -0.5;
    let width = 0;
    var style = getComputedStyle(document.body);
    const dark = parseInt(style.getPropertyValue("--globe-style"));
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 1,
      width,
      height: width,
      phi,
      theta: 0.15,
      dark: dark,
      diffuse: 1.2,
      scale: 1,
      mapSamples: 20000,
      mapBrightness: 4,
      baseColor: [1, 1, 1],
      markerColor: [249 / 255, 115 / 255, 22 / 255],
      offset: [0, 0],
      glowColor: [0.8, 0.8, 0.8],
      markers: [
        { location: [40.7128, -74.006], size: 0.075 - (0.075 / 50) * 2 },
        { location: [34.0522, -118.2437], size: 0.075 - (0.075 / 50) * 2 },
        { location: [51.5072, -0.1276], size: 0.075 - (0.075 / 50) * 2 },
        { location: [48.8566, 2.3522], size: 0.075 - (0.075 / 50) * 2 },
        { location: [41.9028, 12.4964], size: 0.075 - (0.075 / 50) * 2 },
        { location: [35.6895, 139.6917], size: 0.075 - (0.075 / 50) * 2 },
        { location: [55.7558, 37.6176], size: 0.075 - (0.075 / 50) * 2 },
        { location: [39.9042, 116.4074], size: 0.075 - (0.075 / 50) * 2 },
        { location: [-33.8688, 151.2093], size: 0.075 - (0.075 / 50) * 2 },
        { location: [28.6139, 77.209], size: 0.075 - (0.075 / 50) * 2 },
        { location: [-23.5505, -46.6333], size: 0.075 - (0.075 / 50) * 2 },
        { location: [19.4326, -99.1332], size: 0.075 - (0.075 / 50) * 2 },
        { location: [37.7749, -122.4194], size: 0.075 - (0.075 / 50) * 2 },
        { location: [43.6532, -79.3832], size: 0.075 - (0.075 / 50) * 2 },
        { location: [-1.286389, 36.817223], size: 0.075 - (0.075 / 50) * 2 },
        { location: [31.5497, 74.3436], size: 0.075 - (0.075 / 50) * 2 },
        { location: [-33.9249, 18.4241], size: 0.075 - (0.075 / 50) * 2 },
        { location: [31.2357, 121.4779], size: 0.075 - (0.075 / 50) * 2 },
        { location: [1.3521, 103.8198], size: 0.075 - (0.075 / 50) * 2 },
        { location: [40.4168, -3.7038], size: 0.075 - (0.075 / 50) * 2 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        phi += 0.002;
        state.phi = phi + r.get();
        state.width = width;
        state.height = width;
      },
    });
    setTimeout(() => (canvasRef.current.style.opacity = "1"));
    return () => globe.destroy();
  });

  const [showModal, setShowModal] = useState(true);

  return (
    <div className="relative flex items-center">
      <div
        style={{
          width: "100%",
          maxWidth: 1000,
          aspectRatio: "1",
          margin: "auto",
          position: "relative",
        }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current =
              e.clientX - pointerInteractionMovement.current;
            canvasRef.current.style.cursor = "grabbing";
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            canvasRef.current.style.cursor = "grab";
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            canvasRef.current.style.cursor = "grab";
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta;
              api.start({
                r: delta / 200,
              });
            }
          }}
          onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
              const delta = e.touches[0].clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta;
              api.start({
                r: delta / 100,
              });
            }
          }}
          style={{
            width: "100%",
            height: "100%",
            contain: "layout paint size",
            opacity: 0,
            transition: "opacity 1s ease",
          }}
        />
      </div>
    </div>
  );
};
