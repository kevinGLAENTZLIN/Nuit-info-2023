import React from 'react';
import { Button, Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const sections = [
  { title: 'Section 1', content: 'Contenu de la section 1 pour réduire l\'impact environnemental.', image: 'url_to_section_1_image', link: 'section1', bottomContent: 'Description unique pour la section 1.' },
  { title: 'Section 2', content: 'Contenu de la section 2 pour réduire l\'impact environnemental.', image: 'url_to_section_2_image', link: 'section2', bottomContent: 'Description unique pour la section 2.' },
  { title: 'Section 3', content: 'Contenu de la section 3 pour réduire l\'impact environnemental.', image: 'url_to_section_3_image', link: 'section3', bottomContent: 'Description unique pour la section 3.' },
  { title: 'Section 4', content: 'Contenu de la section 4 pour réduire l\'impact environnemental.', image: 'url_to_section_4_image', link: 'section4', bottomContent: 'Description unique pour la section 4.' },
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
              {/* Add your image here */}
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
        </Box>
      ))}
    </Container>
  );
}
