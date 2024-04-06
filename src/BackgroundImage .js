import React from 'react';

const BackgroundImage = ({ imageUrlMobile, imageUrlDesktop, children }) => {
  const backgroundStyle = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: 'auto',
    height: '100vh', // Ajustez la hauteur selon vos besoins
  };



  const imageUrl = window.innerWidth >= 769 ? imageUrlDesktop : imageUrlMobile;

  return (
    <div style={{ ...backgroundStyle, backgroundImage: `url(${imageUrl})`, backgroundColor: '#5f193a' }}>
      {children}
    </div>
  );
};

export default BackgroundImage;
