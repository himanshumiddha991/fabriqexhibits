import "../styles/ExpandableCards.css";

function ExpandableCard({
  card,
  index,
  activeIndex,
  setActiveIndex,
  expandable,
  css,
  textReverse,
  showPopup = false,
  ShowTitle = false,
  onClick,
}) {
  return (
    <div
      className={` Fab_card
  expandable-card
  ${activeIndex === index ? (expandable ? "active" : "zoom") : ""}
`}
      style={{
        backgroundImage: `url("${card.image}")`,
        ...css,
      }}
      onMouseEnter={() => setActiveIndex(index)}
      onClick={() => {
        setActiveIndex(index);
        if (onClick) onClick();
      }}
    >
      <div className="expandable-footer">
        <div
          className="expandable-desc"
          style={{ order: textReverse ? 2 : "" }}
        >
          {card.desc}
        </div>
        <div className="expandable-title">{card.title}</div>
      </div>
    </div>
  );
}

export default ExpandableCard;
