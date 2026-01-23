import { useRef, useState } from "react";
import "./GooeyNav.css";

const GooeyNav = ({ items, onClick }) => {
  const containerRef = useRef(null);
  const effectRef = useRef(null);
  const [active, setActive] = useState(0);

  const moveEffect = (el) => {
    const c = containerRef.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();

    Object.assign(effectRef.current.style, {
      left: `${r.left - c.left}px`,
      top: `${r.top - c.top}px`,
      width: `${r.width}px`,
      height: `${r.height}px`,
      opacity: 1,
    });
  };

  const spawnBubbles = () => {
    const dirs = [
      [-40, 0], [40, 0], [0, -40], [0, 40],
    ];

    dirs.forEach(([x, y]) => {
      for (let i = 0; i < 3; i++) {
        const b = document.createElement("span");
        b.className = "bubble";
        b.style.setProperty("--sx", `${x}px`);
        b.style.setProperty("--sy", `${y}px`);
        effectRef.current.appendChild(b);
        setTimeout(() => b.remove(), 700);
      }
    });
  };

  const handleClick = (e, i) => {
    e.preventDefault();
    const el = e.currentTarget;
    setActive(i);
    moveEffect(el);
    spawnBubbles();

    setTimeout(() => {
      onClick(items[i].href);
    }, 750);
  };

  return (
    <div className="gooey-nav" ref={containerRef}>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            <a href={item.href} onClick={(e) => handleClick(e, i)}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* solid rectangle */}
      <div className="effect-box" ref={effectRef}></div>
    </div>
  );
};

export default GooeyNav;
