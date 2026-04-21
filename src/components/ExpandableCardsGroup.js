import { useState } from "react";
import ExpandableCard from "./ExpandableCard";
import { Box, useDisclosure } from "@chakra-ui/react";
import MediaModal from "./MediaModal";
function ExpandableCardsGroup({
  cards,
  expandable = true,
  css,
  textReverse = false,
  showPopup = false,
  ShowTitle = false,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMedia, setSelectedMedia] = useState(null);
  const openMedia = (item) => {
    if (!showPopup) return;
    console.log("item", item);
    setSelectedMedia({
      type: "image",
      url: item?.image,
      title: item?.title,
      description: item?.desc,
    });
    onOpen();
  };
  console.log("cards", cards);
  return (
    <Box
      display={{ base: "grid" }}
      gridTemplateColumns={{
        base: "1fr",
        md: "repeat(4, 1fr)",
        sm: "repeat(2, 1fr)",
      }}
      gap={{ base: 4, md: 6 }}
      flexWrap="wrap" // 🔥 THIS FIXES IT
    >
      {cards.map((card, index) => (
        <ExpandableCard
          key={card.id}
          card={card}
          index={index}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          expandable={expandable}
          css={css}
          textReverse={textReverse}
          onClick={() => openMedia(card)}
        />
      ))}
      <MediaModal
        isOpen={isOpen}
        onClose={onClose}
        media={selectedMedia}
        ShowTitle={ShowTitle}
      />
    </Box>
  );
}

export default ExpandableCardsGroup;
