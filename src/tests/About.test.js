import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <About.js />', () => {
  test('se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const textTitleAbout = screen.getByRole('heading', { level: 2, name: /about pokédex/i });

    expect(textTitleAbout).toBeInTheDocument();
  });
  test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const firstTextParagraphAbout = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    const secondTextParagraphAbout = screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);

    expect(firstTextParagraphAbout).toBeInTheDocument();
    expect(secondTextParagraphAbout).toBeInTheDocument();
  });
  test('se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imageAbout = screen.getByRole('img', { name: /pokédex/i });

    expect(imageAbout.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(imageAbout).toBeInTheDocument();
  });
});

// Acessar
// Agir
// Aferir
