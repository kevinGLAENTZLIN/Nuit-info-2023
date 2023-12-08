import React from 'react';
import { Button, Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo1 from '../Assets/image1.jpg';
import Logo2 from '../Assets/image2.jpg';
import Logo3 from '../Assets/image5.jpg';
import Logo4 from '../Assets/image4.jpg';

const sections = [
  {
    title: 'L\'impact environnemental de nos actions',
    content: 'Découvrez comment nos actions contribuent à la préservation de l\'environnement.',
    image: Logo1,
    link: 'L\'impact environnemental de nos actions',
    environmentalDescription: 'Réalité : Utiliser des sacs réutilisables au lieu de sacs en plastique peut considérablement réduire la quantité de déchets plastiques dans les décharges.'},
  {
    title: 'Mythe vs Réalité sur l\'impact environnemental',
    content: 'Démystifions les idées préconçues sur l\'impact environnemental de différentes pratiques.',
    image: Logo2,
    link: 'Mythe vs Réalité sur l\'impact environnemental',
    environmentalDescription: 'Réalité : Les emballages en plastique peuvent être plus légers et nécessiter moins d\'énergie pour produire, mais la gestion des déchets plastiques est un problème environnemental majeur.',
  },
  {
    title: 'Actions concrètes pour un impact positif',
    content: 'Découvrez les actions pratiques que nous entreprenons pour avoir un impact positif sur l\'environnement.',
    image: Logo4,
    link: 'Actions concrètes pour un impact positif',
    environmentalDescription: 'Réalité : Éteindre l\'eau pendant le brossage des dents peut économiser des litres d\'eau, contribuant ainsi à une utilisation plus durable des ressources hydriques.'},
  {
    title: 'L\'importance de la sensibilisation',
    content: 'Explorez comment la sensibilisation peut jouer un rôle crucial dans la protection de l\'environnement.',
    image: Logo3,
    link: 'L\'importance de la sensibilisation',
    environmentalDescription: 'Réalité : Chaque action individuelle compte. La somme des petites actions, comme le recyclage, la réduction des déchets et la conservation de l\'énergie, peut avoir un impact significatif à l\'échelle collective.'},
];

export default function LandingPage() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4, marginBottom: 4 }}>
      <Box sx={{ textAlign: 'right', marginBottom: 2 }}>
        <Box sx={{ display: 'inline-block' }}>
          <Button color="inherit" onClick={() => navigate('/login')}>
            Connexion
          </Button>
        </Box>
      </Box>
      <Grid container spacing={4}>
        {sections.map((section, index) => (
          <Grid item key={index} xs={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#A9B388' }}>
              <img src={section.image} alt={`Section ${index + 1}`} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              <CardContent sx={{ flexGrow: 1, margin: '5px' }}>
                <Typography variant="h5" component="div">
                  {section.title}
                </Typography>
                <Typography>
                  {section.content}
                </Typography>
              </CardContent>
              <Button color="inherit" onClick={() => scrollToSection(section.link)}>
                Voir plus
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      {sections.map((section, index) => (
        <Box key={index} sx={{ marginTop: 4, borderBottom: '1px solid #ccc', backgroundColor: '#faf8e8', borderRadius: 3 }} id={section.link}>
          <Typography variant="h4" sx={{ marginBottom: 2, margin: '10px' }}>
            {section.title}
          </Typography>
          <Typography sx ={{ margin: '10px'}}>
            {section.bottomContent}
          </Typography>
          <Box component="div" sx={{ marginTop: 1, margin: '10px' }}>
            <Typography>
              {section.environmentalDescription}
            </Typography>
          </Box>
        </Box>
      ))}
    </Container>
  );
}
