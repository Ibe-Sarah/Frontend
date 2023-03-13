import React from 'react';

function NFTModal({ nft, onClose, onPurchase }) {
  return (
    <div className="nft-modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <img src={nft.image_url} alt={nft.name} />
        <h2>{nft.name}</h2>
        <p>{nft.description}</p>
        <p>Owned by {nft.owner.address}</p>
        <button className="purchase-btn" onClick={onPurchase}>Purchase on OpenSea</button>
      </div>
    </div>
  );
}

export default NFTModal;
