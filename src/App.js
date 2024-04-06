import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  Grid,
  IconButton
} from "@mui/material";
import Favorite from '@mui/icons-material/Favorite';
import BackgroundImage from "./BackgroundImage ";
import ImageBackground from "./assets/Jukebox_mobile.svg";
import ImageBackgroundWeb from "./assets/Jukebox_web.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoClose } from "react-icons/io5";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { GiOldMicrophone } from "react-icons/gi";
import DataSong from "./dataSong";

const App = () => {
  const [selectedSongs, setSelectedSongs] = useState(Array(6).fill(null));
  const [open, setOpen] = useState(false);
  const [selectedGrid, setSelectedGrid] = useState(null);
  const [endTime] = useState(new Date().getTime() + 24 * 60 * 60 * 1000); // Heure de fin (1 heure plus tard)
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [fontSize, setFontSize] = useState(10); // Taille de police initiale
  const [isOverflow, setIsOverflow] = useState(false); // État pour indiquer si le texte dépasse
  const boxRef = useRef(null); // Référence pour la boîte
  const textRef = useRef(null); // Référence pour le texte

  useEffect(() => {
    const boxHeight = boxRef.current?.clientHeight; // Hauteur de la boîte
    const textHeight = textRef.current?.clientHeight; // Hauteur du texte

    // Si la hauteur du texte est supérieure à la hauteur de la boîte
    if (textHeight > boxHeight) {
      setIsOverflow(true); // Définir l'état de débordement sur true
      setFontSize((prevSize) => prevSize - 1); // Diminuer la taille de police
    } else {
      setIsOverflow(false); // Définir l'état de débordement sur false
    }
  }, [fontSize]);

  const songs = [
    {
      id: 1,
      title: "Sauve qui aime",
      artist: "Jenifer",
    },
    {
      id: 2,
      title: "T'oublier",
      artist: "Jenifer",
    },
    {
      id: 3,
      title: "Nuit Sur L'Amour",
      artist: "Jenifer",
    },
    {
      id: 4,
      title: "La Pudeur",
      artist: "Jenifer",
    },
    {
      id: 5,
      title: "Les Choses simples",
      artist: "Jenifer",
    }];

  const handleOpen = (gridIndex) => {
    setSelectedGrid(gridIndex); // Mettre à jour l'index de la grille sélectionnée
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSongClick = (song) => {
    const updatedSelectedSongs = [...selectedSongs];
    updatedSelectedSongs[selectedGrid] = song;
    setSelectedSongs(updatedSelectedSongs);
    handleClose();
  };

  const renderSongList = () => {
    return songs.map((song, index) => (
      <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => handleSongClick(song)}>
        <Box>
          <Typography sx={{ fontWeight: 'bold', fontSize: '12px', color: '#fff' }}>
            {song.title}
          </Typography>
          <Typography sx={{ fontSize: '10px', color: '#fff' }} key={index}>
            {song.artist}
          </Typography>
        </Box>
        <IconButton variant="plain" size="sm" sx={{ color: song === selectedSongs[selectedGrid] ? "#fff" : "#fd9ed0" }}>
          <Favorite />
        </IconButton>
      </Box>
    ));
  };

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Diviser DataSong en groupes de 12
  const chunkSize = window.innerWidth >= 769 ? 8 : 10;
  const chunkedData = [];
  for (let i = 0; i < DataSong.length; i += chunkSize) {
    chunkedData.push(DataSong.slice(i, i + chunkSize));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const remaining = endTime - currentTime;
      setTimeRemaining(remaining);
    }, 1000); // Mettre à jour toutes les secondes

    return () => clearInterval(interval); // Nettoyer le setInterval lorsque le composant est démonté
  }, [endTime]); // [endTime] pour réinitialiser l'interval lorsque l'heure de fin change

  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  const formattedTime = `${("0" + hours).slice(-2)} : ${("0" + minutes).slice(-2)} : ${("0" + seconds).slice(-2)}`;

  return (
    <BackgroundImage imageUrlMobile={ImageBackground} imageUrlDesktop={''} >
      <Box
        sx={{
          alignItems: "center",
          // my: 4,
          width: window.innerWidth >= 769 ? '28%' : '80%',
          margin: 'auto',
          paddingTop: 1
        }}
      >
        <Box sx={{ height: 40 }}>
          <Typography style={{ color: '#fdd5db', textAlign: 'center'}}>
            <span className="poppins" style={{ fontWeight: 'bold' }}>THÉÂTRE DE NARBONNE</span><br />
            <span className="poppins" style={{ fontWeight: 'regular' }}>28 MAI 2024</span>
          </Typography>
        </Box>
        <Box>
          <Typography variant="h2" style={{ color: '#fff', textAlign: 'center' }}>
            <span className="budmo">JUKE BOX</span>
          </Typography>
          <Typography variant="h2" style={{ color: '#fff', textAlign: 'center', marginTop: -28, marginBottom: 10 }}>
            <span className="budmo">TOUR{" "}<span className="octothorpe">2024</span></span>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', marginTop: '-1rem' }}>
          <Typography variant="h5" component="h4" sx={{ background: "#fed5dd", padding: 1, borderRadius: 2, color: '#401615', textAlign: 'center', width: window.innerWidth >= 769 ? '40%' : '40%' }}>
            <span className="scuba">{formattedTime}</span>
          </Typography>
        </Box>
        <Typography variant="h7" component="h6" style={{ color: '#fff', textAlign: 'center' }} gutterBottom>
          <span>Ouverture des votes à 19h</span><br />
          <span>et fermeture des votes à 20h</span>
        </Typography>
        <Slider {...settings}>
          {chunkedData.map((chunk, index) => (
            <div key={index}>
              <Box alignItems='center' justifyContent="center"
                sx={{
                  display: 'flex',
                  gap: 1,
                  marginBottom: 1,
                  flexWrap: 'wrap', // Pour permettre deux boxes par ligne
                }}
              >
                {chunk.map(({ ID, Title, Artiste, isEdit, VoteNumber }, innerIndex) => (
                  <Box
                    key={ID}
                    ref={boxRef}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      width: '40%', // Largeur ajustée pour inclure la marge entre les boîtes
                      height: 45,
                      background: selectedSongs[index * chunkSize + innerIndex] ? "#fe56ae" : "#fed5dd",
                      opacity: selectedSongs[index * chunkSize + innerIndex] ? 1 : !isEdit ? 1 : 0.5, // Opacité réduite si aucune chanson n'est sélectionnée
                      padding: 1,
                      borderRadius: 0.5,
                    }}
                  >
                    {isEdit ? (
                      <div onClick={() => handleOpen(index * chunkSize + innerIndex)} style={{ cursor: "pointer" }}>
                        {selectedSongs[index * chunkSize + innerIndex] ? (
                          <>
                            <Typography variant="h7" component="h5" sx={{ fontSize: window.innerWidth >= 769 ? '10px' : `8px`, color: '#451c22', fontFamily: "Caros Soft Medium" }}>{VoteNumber}</Typography>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box sx={{ marginLeft: 2 }}>
                                <Typography variant="h7" component="h5" marginTop={0} sx={{ fontSize: window.innerWidth >= 769 ? '12px' : `${fontSize}px`, fontWeight: 'bold', color: '#451c22', fontFamily: "Caros Soft Medium" }} >{selectedSongs[index * chunkSize + innerIndex].title}</Typography>
                                <Typography variant="h7" component="h6" sx={{ fontSize: window.innerWidth >= 769 ? '10px' : `8px`, color: '#451c22', fontFamily: "Caros Soft Medium" }}>{selectedSongs[index * chunkSize + innerIndex].artist}</Typography>
                              </Box>
                              <IconButton size="sm" sx={{ color: "#fff" }}>
                                <Favorite />
                              </IconButton>
                            </div>
                          </>
                        ) : (
                          <Typography variant="h7" component="h5" sx={{ fontSize: window.innerWidth >= 769 ? '12px' : `${fontSize}px`, marginLeft: 1, color: "#fff !important", fontFamily: "Caros Soft Medium" }}>
                            Choisis ta chanson
                          </Typography>
                        )}
                      </div>
                    ) : (
                      <>
                        <Typography variant="h7" component="h5" sx={{ fontSize: window.innerWidth >= 769 ? '10px' : `8px`, color: '#451c22', fontFamily: "Caros Soft Medium" }}>{VoteNumber}</Typography>
                        <Box sx={{ marginLeft: 2 }}>
                          <Typography variant="h7" component="h5" marginTop={0} sx={{ fontSize: window.innerWidth >= 769 ? '12px' : `${fontSize}px` , fontWeight: 'bold', color: '#451c22', fontFamily: "Caros Soft Medium" }} >{Title}</Typography>
                          <Typography variant="h7" component="h6" sx={{ fontSize: window.innerWidth >= 769 ? '10px' : `8px`, color: '#451c22', fontFamily: "Caros Soft Medium" }}>{Artiste}</Typography>
                        </Box>
                      </>
                    )}
                  </Box>
                ))}
              </Box>
            </div>
          ))}
        </Slider>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fe56ae', padding: '20px', borderRadius: '5px', minWidth: '200px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton>
                <IoClose color="#fff" onClick={handleClose} />
              </IconButton>
            </Box>
            <h2 className="modal-title">A toi de choisir!</h2>
            {renderSongList()}
          </div>
        </Modal>
        <Box sx={{ display: "flex", mt: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Button
            variant="contained"
            size="large"
            style={{
              borderRadius: '50px', // Arrondir les coins
              backgroundColor: '#fed5dd', // Couleur de fond
              color: '#451c22',
              fontWeight: 'bold',
              textTransform: 'none',
              borderBottom: '5px solid #feaac6',
              fontFamily: "Caros Soft Medium"
            }}
          // onClick={() => {
          //   alert(`Votre playlist : ${playlist.join(", ")}`);
          // }}
          >
            Valider ma playlist
          </Button>
        </Box>
      </Box>
      <div style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 100,
        display: window.innerWidth >= 769 ? "none" : "block"
      }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            flex: 1,
            borderRadius: "0px 0px 10px 10px",
            padding: 1
          }}
        >
          <IconButton>
            <GiOldMicrophone color="#c390a0" onClick={handleClose} />
          </IconButton>
          <IconButton>
            <FaCalendarAlt color="#c390a0" onClick={handleClose} />
          </IconButton>
          <IconButton>
            <PiShoppingCartSimpleFill color="#c390a0" onClick={handleClose} />
          </IconButton>
        </Box>
      </div>
    </BackgroundImage>
  );
};

export default App;
