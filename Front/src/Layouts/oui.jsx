import React from 'react';
import { Button, Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from './pein3.jpeg';

const sections = [
  {
    title: 'L\'impact environnemental de nos actions',
    content: 'Découvrez comment nos actions contribuent à la préservation de l\'environnement.',
    image: Logo,
    link: 'L\'impact environnemental de nos actions',
    environmentalDescription: 'Explorez l\'impact positif que nos actions ont sur la planète et comment nous contribuons à la préservation de la biodiversité.',
  },
  {
    title: 'Mythe vs Réalité sur l\'impact environnemental',
    content: 'Démystifions les idées préconçues sur l\'impact environnemental de différentes pratiques.',
    image: 'url_to_section_2_image',
    link: 'Mythe vs Réalité sur l\'impact environnemental',
    environmentalDescription: 'Découvrez la vérité derrière certaines idées reçues sur l\'impact environnemental. Comment nos choix quotidiens peuvent-ils influencer positivement la planète?',
  },
  {
    title: 'Actions concrètes pour un impact positif',
    content: 'Découvrez les actions pratiques que nous entreprenons pour avoir un impact positif sur l\'environnement.',
    image: 'url_to_section_3_image',
    link: 'Actions concrètes pour un impact positif',
    environmentalDescription: 'Explorez les initiatives que nous prenons pour réduire notre empreinte écologique. Ensemble, nous pouvons créer un changement significatif.',
  },
  {
    title: 'L\'importance de la sensibilisation',
    content: 'Explorez comment la sensibilisation peut jouer un rôle crucial dans la protection de l\'environnement.',
    image: 'url_to_section_4_image',
    link: 'L\'importance de la sensibilisation',
    environmentalDescription: 'Découvrez comment sensibiliser les autres peut être un catalyseur pour la protection de l\'environnement. Comment votre implication peut-elle inspirer des actions positives?',
  },
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
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <img src={section.image} alt={`Section ${index + 1}`} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              <CardContent sx={{ flexGrow: 1 }}>
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
        <Box key={index} sx={{ marginTop: 4, borderBottom: '1px solid #ccc' }} id={section.link}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            {section.title}
          </Typography>
          <Typography>
            {section.bottomContent}
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            <Typography>
              {section.environmentalDescription}
            </Typography>
          </Box>
        </Box>
      ))}
    </Container>
  );
}
