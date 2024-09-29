import { useEffect, useRef } from "react";

export default function Home() {
  
  // const useMousePosition = () => {
  //   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  
  //   useEffect(() => {
  //     const handleMouseMove = e => {
  //       setMousePosition({ x: e.clientX, y: e.clientY });
  //     };
  //     window.addEventListener('mousemove', handleMouseMove);
  
  //     return () => {
  //       window.removeEventListener('mousemove', handleMouseMove);
  //     };
  //   }, []);
  
  //   return mousePosition;
  // };
  // const mp = useMousePosition();
  // console.log(mp);
  const imageRefs = useRef([]);
  const offsets = [
    { x: 20, y: 20 },
    { x: 22, y: 22 },
    { x: 24, y: 24},
    { x: 26, y: 26 },
    { x: 23, y: 23 },
    { x: 23, y: 23 }
];

  useEffect(() => {
      const handleMouseMove = (event) => {
          const { clientX, clientY } = event;

          imageRefs.current.forEach((imageRef, index) => {
                if (imageRef) {
                    const { x, y, width, height } = imageRef.getBoundingClientRect();
                    const offsetX = (clientX - (x + width / 2)) / offsets[index].x; // Sensitivity
                    const offsetY = (clientY - (y + height / 2)) / offsets[index].y; // Sensitivity

                    imageRef.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                }
            });
      };

      const handleMouseLeave = () => {
          imageRefs.current.forEach((imageRef) => {
              if (imageRef) {
                  imageRef.style.transform = 'translate(0, 0)';
              }
          });
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);

      return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseleave', handleMouseLeave);
      };
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center px-8 sm:p-20">
      <div className="relative w-1/4 h-1/4">
      {/* <img src="Icon-container-light-01.png" className="absolute" /> */}
      {['/Icon-1-light.png', '/Icon-2-light.png', '/Icon-3-light.png', 'Icon-4-light.png', 'Icon-container-light-01.png', 'Icon-crop.png'].map((src, index) => (
                <img
                    key={index}
                    ref={(el) => (imageRefs.current[index] = el)}
                    src={src}
                    alt={`Image ${index + 1}`}
                    className="responsive-image absolute"
                />
            ))}
        {/* <img src="Icon-1-light.png" ref={imageRef} className="absolute" />
        <img src="Icon-2-light.png" ref={imageRef} className="absolute" />
        <img src="Icon-3-light.png" className="absolute" />
        <img src="Icon-4-light.png" className="absolute" /> */}
      </div>
      <style jsx>{`
                .responsive-image {
                    transition: transform 0.1s ease;
                }
            `}</style>
    </div>
  );
}
