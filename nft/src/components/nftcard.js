import React, { useState } from 'react';
import NFTModal from './NFTModal';

function NFTCard({ nft }) {
  const [showModal, setShowModal] = useState(false);

  function handleCardClick() {
    setShowModal(true);
  }

  function handleModalClose() {
    setShowModal(false);
  }

  function handlePurchaseClick() {
    // Navigate to OpenSea purchase page for NFT
    window.open(nft.permalink, '_blank');
  }

  return (
    <>
      <div className="nft-card" onClick={handleCardClick}>
        <img src={nft.image_url} alt={nft.name} />
        <h2>{nft.name}</h2>
        <p>Owned by {nft.owner.address}</p>
      </div>
      {showModal && (
        <NFTModal nft={nft} onClose={handleModalClose} onPurchase={handlePurchaseClick} />
      )}
    </>
  );
}

export default NFTCard;
